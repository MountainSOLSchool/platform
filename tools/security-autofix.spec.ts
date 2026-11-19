// Run: npx tsx --test tools/security-autofix.spec.ts
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    ACCEPTED_ADVISORIES,
    AcceptedAdvisory,
    Advisory,
    advisoryNodes,
    breakingKey,
    diffAdvisories,
    directDependencyJumps,
    evaluateGate,
    gateBlockers,
    majorJumps,
    parseAuditReport,
    parseGithubAdvisory,
    parseLockVersions,
    recheckAccepted,
    recheckExitCode,
} from './security-autofix';

const adv = (id: string, module = 'pkg'): Advisory => ({
    id,
    module,
    severity: 'high',
    title: `${module} is vulnerable`,
    url: `https://github.com/advisories/${id}`,
    range: '<2.0.0',
});

const via = (ghsa: string, name: string, severity: string) => ({
    source: 1,
    name,
    title: 't',
    url: `https://github.com/advisories/${ghsa}`,
    severity,
    range: '<1',
});

describe('parseAuditReport', () => {
    it('keeps high and critical advisories from `via`, deduped by GHSA id', () => {
        const raw = JSON.stringify({
            auditReportVersion: 2,
            vulnerabilities: {
                a: {
                    via: [
                        via('GHSA-a', 'a', 'high'),
                        via('GHSA-m', 'a', 'moderate'),
                    ],
                },
                // A parent that is only vulnerable through `a` lists it as a string.
                parent: { via: ['a', via('GHSA-a', 'a', 'high')] },
                b: { via: [via('GHSA-b', 'b', 'critical')] },
            },
        });

        assert.deepEqual(
            parseAuditReport(raw)?.map((a) => a.id),
            ['GHSA-a', 'GHSA-b']
        );
    });

    it('leaves out an accepted advisory only when every install path is in scope', () => {
        const accepted = [
            {
                id: 'GHSA-z',
                paths: /^node_modules\/docs\/node_modules\/z$/,
                reason: 'r',
                knownPatches: [],
            },
        ];
        const report = (nodes: string[]) =>
            JSON.stringify({
                auditReportVersion: 2,
                vulnerabilities: {
                    z: { nodes, via: [via('GHSA-z', 'z', 'high')] },
                    docs: { nodes: ['node_modules/docs'], via: ['z'] },
                },
            });

        assert.deepEqual(
            parseAuditReport(
                report(['node_modules/docs/node_modules/z']),
                accepted
            ),
            []
        );
        assert.deepEqual(
            parseAuditReport(
                report(['node_modules/docs/node_modules/z', 'node_modules/z']),
                accepted
            )?.map((a) => a.id),
            ['GHSA-z']
        );
        assert.deepEqual(
            parseAuditReport(report([]), accepted)?.map((a) => a.id),
            ['GHSA-z']
        );
    });

    it('returns an empty list for a clean report', () => {
        assert.deepEqual(
            parseAuditReport('{"auditReportVersion":2,"vulnerabilities":{}}'),
            []
        );
    });

    it('returns null when the registry failed, so an outage never reads as clean', () => {
        assert.equal(parseAuditReport('npm error code ETIMEDOUT'), null);
        assert.equal(
            parseAuditReport('{"error":{"code":"ETIMEDOUT","summary":"x"}}'),
            null
        );
    });
});

describe('diffAdvisories', () => {
    it('splits into added, fixed and remaining', () => {
        const d = diffAdvisories([adv('A'), adv('B')], [adv('B'), adv('C')]);

        assert.deepEqual(
            d.added.map((a) => a.id),
            ['C']
        );
        assert.deepEqual(
            d.fixed.map((a) => a.id),
            ['A']
        );
        assert.deepEqual(
            d.remaining.map((a) => a.id),
            ['B']
        );
    });
});

describe('parseLockVersions', () => {
    it('reads installed paths and skips the root and workspace links', () => {
        const lock = JSON.stringify({
            lockfileVersion: 3,
            packages: {
                '': { name: 'root', version: '0.0.0' },
                'node_modules/foo': { version: '1.2.3' },
                'node_modules/foo/node_modules/@s/bar': { version: '0.4.1' },
                'node_modules/local': { resolved: 'libs/local', link: true },
            },
        });

        assert.deepEqual(
            [...parseLockVersions(lock)],
            [
                ['node_modules/foo', '1.2.3'],
                ['node_modules/foo/node_modules/@s/bar', '0.4.1'],
            ]
        );
    });
});

describe('breakingKey', () => {
    it('is the major, or major.minor below 1.0', () => {
        assert.equal(breakingKey('^7.29.7'), '7');
        assert.equal(breakingKey('0.4.1'), '0.4');
        assert.equal(breakingKey('~0.0.3'), '0.0');
        assert.equal(breakingKey('file:libs/x'), null);
        assert.equal(breakingKey('git+https://github.com/a/b.git#v1'), null);
    });
});

describe('majorJumps', () => {
    const lock = (entries: Record<string, string>) =>
        new Map(Object.entries(entries));

    it('ignores patch and minor moves', () => {
        assert.deepEqual(
            majorJumps(
                lock({ 'node_modules/a': '1.0.0' }),
                lock({ 'node_modules/a': '1.9.2' })
            ),
            []
        );
    });

    it('flags a nested major jump with a readable path', () => {
        assert.deepEqual(
            majorJumps(
                lock({ 'node_modules/x/node_modules/chokidar': '3.6.0' }),
                lock({ 'node_modules/x/node_modules/chokidar': '4.0.3' })
            ),
            [{ name: 'x > chokidar', from: '3.6.0', to: '4.0.3' }]
        );
    });

    it("skips a nested major jump that comes with its owner's own update", () => {
        assert.deepEqual(
            majorJumps(
                lock({
                    'node_modules/x': '15.34.1',
                    'node_modules/x/node_modules/chokidar': '3.6.0',
                }),
                lock({
                    'node_modules/x': '15.35.0',
                    'node_modules/x/node_modules/chokidar': '4.0.3',
                })
            ),
            []
        );
    });

    it('still flags a top-level major jump', () => {
        assert.equal(
            majorJumps(
                lock({ 'node_modules/chokidar': '3.6.0' }),
                lock({ 'node_modules/chokidar': '4.0.3' })
            ).length,
            1
        );
    });

    it('flags a 0.x minor move as breaking', () => {
        assert.equal(
            majorJumps(
                lock({ 'node_modules/a': '0.4.1' }),
                lock({ 'node_modules/a': '0.5.0' })
            ).length,
            1
        );
    });

    it('ignores newly added paths', () => {
        assert.deepEqual(
            majorJumps(
                lock({ 'node_modules/a': '1.0.0' }),
                lock({
                    'node_modules/a': '1.0.0',
                    'node_modules/b/node_modules/a': '2.0.0',
                })
            ),
            []
        );
    });
});

describe('directDependencyJumps', () => {
    it('flags only major moves of existing direct deps', () => {
        const before = JSON.stringify({
            dependencies: { a: '^1.0.0', b: '^2.0.0' },
            devDependencies: { c: '0.3.0' },
        });
        const after = JSON.stringify({
            dependencies: { a: '^1.4.0', b: '^3.0.0', d: '^9.0.0' },
            devDependencies: { c: '0.4.0' },
        });

        assert.deepEqual(
            directDependencyJumps(before, after).map((j) => j.name),
            ['b', 'c']
        );
    });

    it('ignores overrides, which are not direct dependencies', () => {
        const before = JSON.stringify({ dependencies: { a: '^1.0.0' } });
        const after = JSON.stringify({
            dependencies: { a: '^1.0.0' },
            overrides: { z: '^5.0.0' },
        });

        assert.deepEqual(directDependencyJumps(before, after), []);
    });
});

describe('evaluateGate', () => {
    const base = {
        changedFiles: ['package-lock.json'],
        before: [adv('A'), adv('B')],
        after: [adv('B')],
        lockJumps: [],
        directJumps: [],
    };

    it('auto-merges a lockfile-only fix with no major jumps', () => {
        assert.deepEqual(evaluateGate(base), { automerge: true, reasons: [] });
    });

    it('allows the root package.json (overrides)', () => {
        assert.equal(
            evaluateGate({
                ...base,
                changedFiles: ['package.json', 'package-lock.json'],
            }).automerge,
            true
        );
    });

    it('refuses when anything but a root manifest changed', () => {
        for (const f of ['tools/x.ts', 'apps/docs/package.json']) {
            const v = evaluateGate({
                ...base,
                changedFiles: ['package-lock.json', f],
            });
            assert.equal(v.automerge, false);
            assert.match(v.reasons[0], new RegExp(f.replace('.', '\\.')));
        }
    });

    it('refuses when it fixes nothing', () => {
        assert.equal(
            evaluateGate({ ...base, after: base.before }).automerge,
            false
        );
    });

    it('refuses when it introduces an advisory', () => {
        const v = evaluateGate({ ...base, after: [adv('B'), adv('C')] });
        assert.equal(v.automerge, false);
        assert.match(v.reasons.join(), /Introduces advisories: C/);
    });

    it('refuses a major jump, direct or transitive', () => {
        const jump = { name: 'x', from: '1.0.0', to: '2.0.0' };
        assert.equal(
            evaluateGate({ ...base, lockJumps: [jump] }).automerge,
            false
        );
        assert.equal(
            evaluateGate({ ...base, directJumps: [jump] }).automerge,
            false
        );
    });
});

describe('gateBlockers', () => {
    it('passes a change that fixes one advisory and adds none', () => {
        assert.deepEqual(gateBlockers([adv('A'), adv('B')], [adv('B')]), []);
    });

    it('blocks lockfile churn that fixes nothing (run 44181712900)', () => {
        assert.deepEqual(gateBlockers([adv('P')], [adv('P')]), [
            'Fixes no advisory.',
        ]);
    });

    it('blocks a change that adds an advisory, even if it fixes another', () => {
        assert.deepEqual(gateBlockers([adv('P')], [adv('T1'), adv('T2')]), [
            'Introduces advisories: T1, T2',
        ]);
    });
});

describe('ACCEPTED_ADVISORIES', () => {
    it('gives every entry a GHSA id, anchored paths, a reason and knownPatches', () => {
        for (const a of ACCEPTED_ADVISORIES) {
            assert.match(a.id, /^GHSA-[\w-]+$/);
            assert.match(a.paths.source, /^\^.*\$$/, a.id);
            assert.ok(a.reason.length > 0, a.id);
            assert.ok(Array.isArray(a.knownPatches), a.id);
        }
    });
});

describe('advisoryNodes', () => {
    it('collects every install path per GHSA id, at any severity', () => {
        const raw = JSON.stringify({
            auditReportVersion: 2,
            vulnerabilities: {
                a: {
                    nodes: ['node_modules/a'],
                    via: [via('GHSA-a', 'a', 'moderate')],
                },
                b: {
                    nodes: ['node_modules/x/node_modules/a'],
                    via: [via('GHSA-a', 'a', 'moderate'), 'c'],
                },
            },
        });
        assert.deepEqual(advisoryNodes(raw)?.get('GHSA-a'), [
            'node_modules/a',
            'node_modules/x/node_modules/a',
        ]);
    });

    it('returns null for a registry error', () => {
        assert.equal(advisoryNodes('{"error":{"code":"ETIMEDOUT"}}'), null);
    });
});

describe('parseGithubAdvisory', () => {
    it('reads npm patched versions in either API shape, and withdrawal', () => {
        const raw = JSON.stringify({
            ghsa_id: 'GHSA-x',
            withdrawn_at: null,
            vulnerabilities: [
                {
                    package: { ecosystem: 'npm' },
                    first_patched_version: '4.0.8',
                },
                {
                    package: { ecosystem: 'npm' },
                    first_patched_version: { identifier: '2.3.3' },
                },
                { package: { ecosystem: 'npm' }, first_patched_version: null },
                {
                    package: { ecosystem: 'pip' },
                    first_patched_version: '9.9.9',
                },
            ],
        });
        assert.deepEqual(parseGithubAdvisory(raw), {
            withdrawn: false,
            patches: ['4.0.8', '2.3.3'],
        });
        assert.equal(
            parseGithubAdvisory(
                JSON.stringify({
                    ghsa_id: 'GHSA-x',
                    withdrawn_at: '2026-01-01',
                })
            )?.withdrawn,
            true
        );
    });

    it('returns null for an error body', () => {
        assert.equal(
            parseGithubAdvisory('{"message":"Bad credentials"}'),
            null
        );
        assert.equal(parseGithubAdvisory('<html>'), null);
    });
});

describe('recheckAccepted', () => {
    const entry: AcceptedAdvisory = {
        id: 'GHSA-p',
        paths: /^node_modules\/tool\/node_modules\/p$/,
        reason: 'r',
        knownPatches: ['1.5.0'],
    };
    const found = (patches: string[], withdrawn = false) =>
        ({ kind: 'found', advisory: { withdrawn, patches } }) as const;
    const installed = new Map([
        ['GHSA-p', ['node_modules/tool/node_modules/p']],
    ]);

    it('is ok while there is no new patch and it is still installed in scope', () => {
        assert.equal(
            recheckAccepted(entry, found(['1.5.0']), installed).status,
            'ok'
        );
    });

    it('flags a patch released since the entry was accepted', () => {
        const r = recheckAccepted(entry, found(['1.5.0', '2.0.1']), installed);
        assert.equal(r.status, 'patched');
        assert.match(r.message, /2\.0\.1/);
    });

    it('flags an entry whose advisory is no longer reported at its paths', () => {
        assert.equal(
            recheckAccepted(entry, found(['1.5.0']), new Map()).status,
            'stale'
        );
        assert.equal(
            recheckAccepted(
                entry,
                found(['1.5.0']),
                new Map([['GHSA-p', ['node_modules/p']]])
            ).status,
            'stale'
        );
    });

    it('flags a withdrawn or missing advisory', () => {
        assert.equal(
            recheckAccepted(entry, found([], true), installed).status,
            'stale'
        );
        assert.equal(
            recheckAccepted(entry, { kind: 'missing' }, installed).status,
            'stale'
        );
    });

    it('is unknown, never ok, when either source is down', () => {
        assert.equal(
            recheckAccepted(entry, { kind: 'unreachable' }, installed).status,
            'unknown'
        );
        assert.equal(
            recheckAccepted(entry, found(['1.5.0']), null).status,
            'unknown'
        );
    });

    it('still reports what it can prove while one source is down', () => {
        assert.equal(
            recheckAccepted(entry, found(['2.0.1']), null).status,
            'patched'
        );
        assert.equal(
            recheckAccepted(entry, { kind: 'unreachable' }, new Map()).status,
            'stale'
        );
    });
});

describe('recheckExitCode', () => {
    const r = (status: 'ok' | 'stale' | 'patched' | 'unknown') => ({
        id: 'x',
        status,
        message: '',
    });

    it('fails on stale or patched, before unknown', () => {
        assert.equal(recheckExitCode([r('ok')]), 0);
        assert.equal(recheckExitCode([r('ok'), r('unknown')]), 3);
        assert.equal(recheckExitCode([r('unknown'), r('patched')]), 1);
        assert.equal(recheckExitCode([r('stale')]), 1);
    });
});
