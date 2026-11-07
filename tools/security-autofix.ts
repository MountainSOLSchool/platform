#!/usr/bin/env npx tsx
/**
 * Security audit automation, ported from Maple & Spruce (its ADR-039) to npm.
 * Two callers:
 *
 *   1. The PR "Security Audit" job (build-check.yml):
 *        npx tsx tools/security-autofix.ts pr-check --base <sha>
 *      Fails only on high/critical advisories the PR itself ADDS. Advisories
 *      already on the base branch are warnings: a CVE published overnight
 *      should not fail an unrelated PR. The daily job fixes those.
 *
 *   2. The daily fixer (security-autofix.yml):
 *        npx tsx tools/security-autofix.ts audit --out before.json
 *        npx tsx tools/security-autofix.ts gate --base HEAD \
 *          --before before.json --after after.json
 *      `gate` decides whether the fix PR may merge itself. See evaluateGate.
 *
 * `npm audit` exits 1 both for advisories and for a registry error. The JSON
 * tells them apart: a report has `vulnerabilities`, an error has `error`.
 * A registry error is retried, then reported as "unreachable" (exit 3) so it
 * is never mistaken for a clean audit or for a real advisory.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import {
    appendFileSync,
    mkdtempSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export interface Advisory {
    id: string; // GHSA id
    module: string;
    severity: 'high' | 'critical';
    title: string;
    url: string;
    range: string; // vulnerable versions
}

/** Files the fixer may touch. Only the root install is audited and deployed. */
export const MANIFEST_PATTERN = /^(package\.json|package-lock\.json)$/;

const AUDIT_ATTEMPTS = Number(process.env.AUDIT_ATTEMPTS ?? 3);
const AUDIT_BACKOFF_MS = Number(process.env.AUDIT_BACKOFF_SECONDS ?? 10) * 1000;

// ---------------------------------------------------------------- parsing --

interface RawVia {
    source: number;
    name: string;
    title: string;
    url: string;
    severity: string;
    range: string;
}

/**
 * High/critical advisories from `npm audit --json` (report v2), deduped by
 * GHSA id. Advisories live in each vulnerability's `via` list; string entries
 * there only point at another vulnerable package. Returns null when the
 * output is not an audit report (registry error).
 */
export function parseAuditReport(raw: string): Advisory[] | null {
    let report: unknown;
    try {
        report = JSON.parse(raw);
    } catch {
        return null;
    }
    const vulns = (
        report as {
            vulnerabilities?: Record<string, { via: (string | RawVia)[] }>;
        }
    )?.vulnerabilities;
    if (!vulns || typeof vulns !== 'object') return null;

    const byId = new Map<string, Advisory>();
    for (const v of Object.values(vulns)) {
        for (const via of v.via ?? []) {
            if (typeof via !== 'object') continue;
            if (via.severity !== 'high' && via.severity !== 'critical')
                continue;
            const id =
                /GHSA-[\w-]+/.exec(via.url ?? '')?.[0] ?? `npm-${via.source}`;
            if (byId.has(id)) continue;
            byId.set(id, {
                id,
                module: via.name,
                severity: via.severity,
                title: via.title,
                url: via.url,
                range: via.range,
            });
        }
    }
    return [...byId.values()].sort((x, y) => x.id.localeCompare(y.id));
}

export function diffAdvisories(
    base: Advisory[],
    head: Advisory[]
): { added: Advisory[]; fixed: Advisory[]; remaining: Advisory[] } {
    const baseIds = new Set(base.map((a) => a.id));
    const headIds = new Set(head.map((a) => a.id));
    return {
        added: head.filter((a) => !baseIds.has(a.id)),
        fixed: base.filter((a) => !headIds.has(a.id)),
        remaining: head.filter((a) => baseIds.has(a.id)),
    };
}

/**
 * install path -> version, from a v2/v3 package-lock. Keys look like
 * `node_modules/foo` or `node_modules/a/node_modules/@scope/foo`. Linked
 * workspace entries have no version and are skipped.
 */
export function parseLockVersions(lock: string): Map<string, string> {
    const packages =
        (
            JSON.parse(lock) as {
                packages?: Record<string, { version?: string; link?: boolean }>;
            }
        ).packages ?? {};
    const versions = new Map<string, string>();
    for (const [path, entry] of Object.entries(packages)) {
        if (!path || entry.link || !entry.version) continue;
        versions.set(path, entry.version);
    }
    return versions;
}

/**
 * The part of a version that signals breaking change under semver:
 * the major, or major.minor while the major is 0. `^7.29.7` -> "7",
 * `0.4.1` -> "0.4". Returns null for non-registry specs (file:, git).
 */
export function breakingKey(spec: string): string | null {
    if (/^(workspace|link|file|git|github|git\+\w+|https?|npm):/.test(spec))
        return null;
    const m = /(\d+)(?:\.(\d+))?/.exec(spec);
    if (!m) return null;
    return m[1] === '0' ? `0.${m[2] ?? '0'}` : m[1];
}

export interface VersionJump {
    name: string;
    from: string;
    to: string;
}

/** `node_modules/a/node_modules/@s/b` -> `a > @s/b`, for readable reasons. */
const displayPath = (path: string): string =>
    path
        .replace(/^node_modules\//, '')
        .split('/node_modules/')
        .join(' > ');

/** `node_modules/a/node_modules/b` -> `node_modules/a`; top-level -> null. */
const ownerPath = (path: string): string | null => {
    const i = path.lastIndexOf('/node_modules/');
    return i === -1 ? null : path.slice(0, i);
};

/**
 * Installs whose breaking-version key changed at the same lockfile path.
 * npm locks one version per path, so comparing by path is exact: a package
 * that gains a nested copy elsewhere is a new path, not a jump.
 *
 * A nested copy whose owner also moved is skipped: that is the owner's own
 * published dependency (firebase-tools 15.34 -> 15.35 bringing chokidar 4),
 * the same thing a plain in-range update of the owner would install.
 */
export function majorJumps(
    before: Map<string, string>,
    after: Map<string, string>
): VersionJump[] {
    const jumps: VersionJump[] = [];
    for (const [path, to] of after) {
        const from = before.get(path);
        if (from === undefined || from === to) continue;
        const key = breakingKey(to);
        if (key === null || key === breakingKey(from)) continue;
        const owner = ownerPath(path);
        if (owner !== null && before.get(owner) !== after.get(owner)) continue;
        jumps.push({ name: displayPath(path), from, to });
    }
    return jumps;
}

type Manifest = Record<string, Record<string, string> | undefined>;

export function directDependencyJumps(
    beforePkg: string,
    afterPkg: string
): VersionJump[] {
    const deps = (raw: string): Record<string, string> => {
        const pkg = JSON.parse(raw) as Manifest;
        return {
            ...pkg.dependencies,
            ...pkg.devDependencies,
            ...pkg.optionalDependencies,
        };
    };
    const before = deps(beforePkg);
    const after = deps(afterPkg);
    const jumps: VersionJump[] = [];
    for (const [name, to] of Object.entries(after)) {
        const from = before[name];
        if (from === undefined || from === to) continue;
        if (breakingKey(from) !== breakingKey(to))
            jumps.push({ name, from, to });
    }
    return jumps;
}

// ------------------------------------------------------------------- gate --

export interface GateInput {
    changedFiles: string[];
    before: Advisory[];
    after: Advisory[];
    lockJumps: VersionJump[];
    directJumps: VersionJump[];
}

export interface GateVerdict {
    automerge: boolean;
    reasons: string[];
}

/**
 * May the fix PR merge itself once CI is green? Only when the change is the
 * kind a person would wave through without reading:
 *   - it touches the root package.json / package-lock.json and nothing else,
 *   - it fixes at least one advisory and adds none,
 *   - nothing crosses a major version (direct or transitive).
 * Anything else is opened for review instead.
 */
export function evaluateGate(input: GateInput): GateVerdict {
    const reasons: string[] = [];
    const other = input.changedFiles.filter((f) => !MANIFEST_PATTERN.test(f));
    if (input.changedFiles.length === 0) reasons.push('No files changed.');
    if (other.length > 0) {
        reasons.push(
            `Changes files other than the root manifests: ${other.join(', ')}`
        );
    }

    const { added, fixed } = diffAdvisories(input.before, input.after);
    if (fixed.length === 0) reasons.push('Fixes no advisory.');
    if (added.length > 0) {
        reasons.push(
            `Introduces advisories: ${added.map((a) => a.id).join(', ')}`
        );
    }

    for (const j of input.directJumps) {
        reasons.push(
            `Major bump of direct dependency ${j.name}: ${j.from} -> ${j.to}`
        );
    }
    for (const j of input.lockJumps) {
        reasons.push(`Major bump of ${j.name}: ${j.from} -> ${j.to}`);
    }

    return { automerge: reasons.length === 0, reasons };
}

// ---------------------------------------------------------------- running --

function sleep(ms: number): void {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

/** Audit a directory's lockfile. null = the registry never answered. */
export function runAudit(dir: string): Advisory[] | null {
    for (let attempt = 1; attempt <= AUDIT_ATTEMPTS; attempt++) {
        const res = spawnSync(
            'npm',
            ['audit', '--json', '--package-lock-only'],
            {
                cwd: dir,
                encoding: 'utf8',
                maxBuffer: 256 * 1024 * 1024,
            }
        );
        const parsed = parseAuditReport(res.stdout ?? '');
        if (parsed) return parsed;
        if (attempt < AUDIT_ATTEMPTS) {
            console.error(
                `Audit registry error (attempt ${attempt}/${AUDIT_ATTEMPTS}); retrying...`
            );
            sleep(AUDIT_BACKOFF_MS);
        }
    }
    return null;
}

function git(...args: string[]): string {
    return execFileSync('git', args, {
        encoding: 'utf8',
        maxBuffer: 256 * 1024 * 1024,
    });
}

function changedFiles(base: string): string[] {
    return git('diff', '--name-only', base, '--').split('\n').filter(Boolean);
}

/** Write the base ref's root manifests into a temp dir so it can be audited. */
function auditRef(ref: string): Advisory[] | null {
    const dir = mkdtempSync(join(tmpdir(), 'audit-base-'));
    try {
        for (const f of ['package.json', 'package-lock.json']) {
            writeFileSync(join(dir, f), git('show', `${ref}:${f}`));
        }
        return runAudit(dir);
    } finally {
        rmSync(dir, { recursive: true, force: true });
    }
}

function summary(markdown: string): void {
    const file = process.env['GITHUB_STEP_SUMMARY'];
    if (file) appendFileSync(file, `${markdown}\n`);
}

function output(name: string, value: string): void {
    const file = process.env['GITHUB_OUTPUT'];
    if (file) appendFileSync(file, `${name}<<__EOF__\n${value}\n__EOF__\n`);
}

const line = (a: Advisory): string =>
    `- **${a.severity}** \`${a.module}\` [${a.id}](${a.url}): ${a.title} (vulnerable: ${a.range})`;

function unreachable(): never {
    const msg =
        'npm audit could not reach the npm advisories endpoint, so no audit ran. ' +
        'Not failing on a registry outage; re-run once it recovers.';
    console.log(
        `::warning title=Security audit skipped (registry unreachable)::${msg}`
    );
    summary(`### :warning: Security audit skipped\n\n${msg}`);
    process.exit(3);
}

function arg(name: string): string | undefined {
    const i = process.argv.indexOf(`--${name}`);
    return i === -1 ? undefined : process.argv[i + 1];
}

function prCheck(base: string): void {
    const touched = changedFiles(base).some((f) => MANIFEST_PATTERN.test(f));
    const head = runAudit('.');
    if (!head) unreachable();

    let added: Advisory[] = [];
    if (touched) {
        const before = auditRef(base);
        if (!before) unreachable();
        added = diffAdvisories(before, head).added;
    }
    const existing = head.filter((a) => !added.some((b) => b.id === a.id));

    for (const a of existing) {
        console.log(
            `::warning title=Existing advisory ${a.id} (${a.module})::Already on the base branch; the daily security-autofix workflow handles it. ${a.url}`
        );
    }
    if (added.length === 0) {
        console.log(
            `No high/critical advisories added by this PR (${existing.length} already on base).`
        );
        return;
    }
    for (const a of added) {
        console.log(
            `::error title=New advisory ${a.id} (${a.module})::${a.title} ${a.url}`
        );
    }
    summary(
        `### Advisories this PR introduces\n\n${added.map(line).join('\n')}`
    );
    process.exit(1);
}

function gate(base: string, beforeFile: string, afterFile: string): void {
    const before = JSON.parse(readFileSync(beforeFile, 'utf8')) as Advisory[];
    const after = JSON.parse(readFileSync(afterFile, 'utf8')) as Advisory[];
    const files = changedFiles(base);

    const lockJumps = files.includes('package-lock.json')
        ? majorJumps(
              parseLockVersions(git('show', `${base}:package-lock.json`)),
              parseLockVersions(readFileSync('package-lock.json', 'utf8'))
          )
        : [];
    const directJumps = files.includes('package.json')
        ? directDependencyJumps(
              git('show', `${base}:package.json`),
              readFileSync('package.json', 'utf8')
          )
        : [];

    const verdict = evaluateGate({
        changedFiles: files,
        before,
        after,
        lockJumps,
        directJumps,
    });
    const { fixed, remaining } = diffAdvisories(before, after);

    const body = [
        'Opened by the daily **security-autofix** workflow.',
        '',
        `### Fixed (${fixed.length})`,
        fixed.map(line).join('\n') || '_none_',
        '',
        `### Still open (${remaining.length})`,
        remaining.map(line).join('\n') || '_none_',
        '',
        '### Auto-merge',
        verdict.automerge
            ? 'Eligible: root manifests only, no major version jumps, no new advisories. Merges itself once every check passes; prod still waits for the `firebase-prod` approval.'
            : `**Needs review**, because:\n${verdict.reasons.map((r) => `- ${r}`).join('\n')}`,
    ].join('\n');

    console.log(body);
    output('automerge', String(verdict.automerge));
    output('fixed_count', String(fixed.length));
    output('body', body);
}

function main(): void {
    const [cmd] = process.argv.slice(2);
    if (cmd === 'audit') {
        const advisories = runAudit(arg('dir') ?? '.');
        if (!advisories) unreachable();
        const json = JSON.stringify(advisories, null, 2);
        const out = arg('out');
        if (out) writeFileSync(out, `${json}\n`);
        console.log(json);
        output('count', String(advisories.length));
        return;
    }
    if (cmd === 'pr-check') return prCheck(arg('base') ?? 'origin/main');
    if (cmd === 'gate') {
        const before = arg('before');
        const after = arg('after');
        if (!before || !after)
            throw new Error('gate needs --before and --after');
        return gate(arg('base') ?? 'origin/main', before, after);
    }
    console.error('Usage: security-autofix.ts audit|pr-check|gate [options]');
    process.exit(2);
}

if (require.main === module) {
    main();
}
