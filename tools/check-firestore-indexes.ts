/**
 * Static analyzer for Firestore composite-index requirements.
 *
 * Walks every TS file that builds Firestore queries (repositories, Cloud
 * Functions, admin tools) and derives which composite indexes are needed.
 * Diffs against `firestore.indexes.json` and emits paste-ready JSON for
 * anything missing.
 *
 * Why this exists: Firebase auto-creates single-field indexes, but composite
 * indexes (multi-`.where()`, `array-contains`+anything, `.where()`+different-
 * field `.orderBy()`) must be declared. The Firestore emulator does NOT
 * enforce composite-index requirements, so a passing test suite is no proof
 * that production will work. We caught a 20-day production outage because of
 * this — see PR description / `docs/sessions/`.
 *
 * Usage:
 *   npx tsx tools/check-firestore-indexes.ts            # checks, exits 1 on missing
 *   npx tsx tools/check-firestore-indexes.ts --verbose  # shows queries it found
 *
 * Per-query opt-out: add a comment on the line immediately preceding the
 * query chain:
 *   // firestore-index-analyzer-ignore: <reason>
 *
 * Scope (intentional): scans queries built in
 *   - libs/firebase/**\/*.ts (repositories + every Cloud Function library)
 *   - apps/functions/src/**\/*.ts
 *   - tools/**\/*.ts (this file is excluded by name)
 *
 * NOT scanned: the Angular app. The client reads Firestore only through
 * callables, so its queries live in the libraries above.
 *
 * Beyond the plain `.collection().where()` chains, this also understands this
 * repository's own query helper, which hides its filters in variadic tuples
 * and would otherwise be invisible to a chain walker:
 *
 *   DatabaseUtility.fetchMatchingDocuments(col, ['a','==',x], ['b','>=',y])
 *   DatabaseUtility.fetchFirstMatchingDocument(col, ...)
 *
 * Ported from maple-and-spruce, where it was written after a composite-index
 * gap caused a 20-day production outage. Adapted here after the same class of
 * bug shipped the `recentYears` contact audience broken (#314).
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as ts from 'typescript';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ROOT = path.resolve(__dirname, '..');
const INDEX_FILE = path.join(ROOT, 'firestore.indexes.json');
const VERBOSE = process.argv.includes('--verbose');
const SELF_PATH = path.relative(ROOT, __filename);

const SCAN_DIRS = ['libs/firebase', 'apps/functions/src', 'tools'];

/** Marker for a helper call whose collection argument couldn't be read. */
const UNRESOLVED_COLLECTION = '__unresolved__';

const SKIP_PATTERNS = [
    /\.spec\.ts$/,
    /\.test\.ts$/,
    /\/dist\//,
    /\/node_modules\//,
    /\.next\//,
];

// Equality-style operators don't have ranges; array-contains is its own beast.
const EQUALITY_OPS = new Set(['==', '!=', 'in', 'not-in']);
const RANGE_OPS = new Set(['<', '<=', '>', '>=']);
const ARRAY_OPS = new Set(['array-contains', 'array-contains-any']);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type IndexField =
    | { fieldPath: string; order: 'ASCENDING' | 'DESCENDING' }
    | { fieldPath: string; arrayConfig: 'CONTAINS' };

interface IndexSpec {
    collectionGroup: string;
    queryScope: 'COLLECTION' | 'COLLECTION_GROUP';
    fields: IndexField[];
}

interface QueryChain {
    collection: string;
    filters: Array<{ field: string; op: string }>;
    orderBys: Array<{ field: string; dir: 'asc' | 'desc' }>;
    file: string;
    line: number;
    ignore: boolean;
    ignoreReason?: string;
}

// ---------------------------------------------------------------------------
// Discovery: walk source files
// ---------------------------------------------------------------------------

function* walk(dir: string): Generator<string> {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (SKIP_PATTERNS.some((p) => p.test(full))) continue;
        if (entry.isDirectory()) yield* walk(full);
        else if (entry.isFile() && full.endsWith('.ts')) yield full;
    }
}

function listSourceFiles(): string[] {
    const out: string[] = [];
    for (const d of SCAN_DIRS) {
        for (const f of walk(path.join(ROOT, d))) {
            if (path.relative(ROOT, f) === SELF_PATH) continue;
            out.push(f);
        }
    }
    return out;
}

// ---------------------------------------------------------------------------
// AST: pull all .collection(...).where(...).orderBy(...) chains
// ---------------------------------------------------------------------------

function getStringLit(node: ts.Node | undefined): string | undefined {
    if (!node) return undefined;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        return node.text;
    }
    if (ts.isIdentifier(node) && node.text === 'COLLECTION')
        return '__COLLECTION_CONST__';
    return undefined;
}

function resolveCollectionConst(sf: ts.SourceFile): string | undefined {
    let value: string | undefined;
    function visit(n: ts.Node) {
        if (
            ts.isVariableDeclaration(n) &&
            ts.isIdentifier(n.name) &&
            n.name.text === 'COLLECTION' &&
            n.initializer
        ) {
            if (
                ts.isStringLiteral(n.initializer) ||
                ts.isNoSubstitutionTemplateLiteral(n.initializer)
            ) {
                value = n.initializer.text;
            }
        }
        ts.forEachChild(n, visit);
    }
    visit(sf);
    return value;
}

interface PartialChain {
    collection?: string;
    filters: Array<{ field: string; op: string }>;
    orderBys: Array<{ field: string; dir: 'asc' | 'desc' }>;
    startNode: ts.Node;
    /**
     * If this chain came from a repository's `findAll` (or similar) with
     * conditional `query = query.where(...)` blocks, this records the optional
     * filters keyed by the property name that gates them. Combined with helper-
     * call extraction, it lets the analyzer derive per-helper index shapes
     * (the only way to satisfy Firestore's strict prefix-matching when
     * conditional fields sit between others in the chain).
     */
    conditionalFilters?: Map<string, { field: string; op: string }>;
    /**
     * Static orderBy fields applied to every code path through the chain
     * (e.g., a trailing `query = query.orderBy('name', 'asc')`).
     */
    staticOrderBys?: Array<{ field: string; dir: 'asc' | 'desc' }>;
}

function extractChains(sf: ts.SourceFile): PartialChain[] {
    const collectionConst = resolveCollectionConst(sf);
    const chains: PartialChain[] = [];

    function unwindCallChain(call: ts.CallExpression): PartialChain {
        const chain: PartialChain = {
            filters: [],
            orderBys: [],
            startNode: call,
        };
        let node: ts.Node = call;
        while (ts.isCallExpression(node)) {
            const expr = node.expression;
            if (!ts.isPropertyAccessExpression(expr)) break;
            const method = expr.name.text;
            const args = node.arguments;
            if (method === 'where' && args.length >= 2) {
                const field = getStringLit(args[0]);
                const op =
                    ts.isStringLiteral(args[1]) ||
                    ts.isNoSubstitutionTemplateLiteral(args[1])
                        ? args[1].text
                        : '?';
                if (field) chain.filters.unshift({ field, op });
            } else if (method === 'orderBy' && args.length >= 1) {
                const field = getStringLit(args[0]);
                let dir: 'asc' | 'desc' = 'asc';
                if (
                    args[1] &&
                    (ts.isStringLiteral(args[1]) ||
                        ts.isNoSubstitutionTemplateLiteral(args[1]))
                ) {
                    dir = args[1].text === 'desc' ? 'desc' : 'asc';
                }
                if (field) chain.orderBys.unshift({ field, dir });
            } else if (method === 'collection' && args.length >= 1) {
                const lit = getStringLit(args[0]);
                if (lit === '__COLLECTION_CONST__')
                    chain.collection = collectionConst;
                else if (lit) chain.collection = lit;
                break;
            }
            node = expr.expression;
        }
        return chain;
    }

    function visit(n: ts.Node) {
        // Pick up only the OUTERMOST call expression in each chain
        if (ts.isCallExpression(n)) {
            const parent = n.parent;
            const isInnerCallInChain =
                parent &&
                ts.isPropertyAccessExpression(parent) &&
                parent.expression === n &&
                parent.parent &&
                ts.isCallExpression(parent.parent);
            if (!isInnerCallInChain) {
                const chain = unwindCallChain(n);
                if (
                    chain.collection &&
                    (chain.filters.length > 0 || chain.orderBys.length > 0)
                ) {
                    chains.push(chain);
                }
            }
        }
        ts.forEachChild(n, visit);
    }
    visit(sf);

    // This repository's own helper hides its filters in variadic tuples, so a
    // chain walker never sees them.
    chains.push(...extractHelperChains(sf, collectionConst));

    // Also pick up chains where filters span across `query = query.where(...)` reassignments
    // by detecting a `let query = db.collection(X)` pattern and aggregating .where() / .orderBy()
    // assignments in the same function scope.
    chains.push(...extractReassignmentChains(sf, collectionConst));

    return chains;
}

// ---------------------------------------------------------------------------
// This repo's query helper:
//
//   DatabaseUtility.fetchMatchingDocuments(col, ['a','==',x], ['b','>=',y])
//   DatabaseUtility.fetchFirstMatchingDocument(col, ['a','==',x])
//
// The filters are variadic array-literal arguments rather than a `.where()`
// chain, so the walker above cannot see them — and these calls sit on some of
// the oldest queries in the codebase.
// ---------------------------------------------------------------------------

const HELPER_NAMES = new Set([
    'fetchMatchingDocuments',
    'fetchFirstMatchingDocument',
]);

/**
 * Best-effort collection name for a helper's first argument.
 *
 * Handles a string literal, a template literal (a subcollection path's last
 * segment is its collection group), and an identifier pointing at a local
 * `db.collection(...)` / `getCollectionRef(...)`. Anything else returns
 * undefined and the caller reports it rather than silently skipping — an
 * unreadable query is exactly where an index gap hides.
 */
function resolveHelperCollection(
    arg: ts.Expression | undefined,
    sf: ts.SourceFile
): string | undefined {
    if (!arg) return undefined;

    // `await <expr>` — unwrap.
    if (ts.isAwaitExpression(arg))
        return resolveHelperCollection(arg.expression, sf);

    // `db.collection('x')` / `DatabaseUtility.getCollectionRef(path)`
    if (
        ts.isCallExpression(arg) &&
        ts.isPropertyAccessExpression(arg.expression)
    ) {
        const method = arg.expression.name.text;
        if (method === 'collection' || method === 'getCollectionRef') {
            // A literal path first; otherwise recurse, since the path is often
            // `await this.getClassesPath()` rather than a literal.
            return (
                collectionNameFromPath(arg.arguments[0]) ??
                resolveHelperCollection(arg.arguments[0], sf)
            );
        }
    }

    // `this.getClassesPath()` — a method returning the path. Resolve it from the
    // same file so subcollection queries aren't silently unreadable.
    if (
        ts.isCallExpression(arg) &&
        ts.isPropertyAccessExpression(arg.expression) &&
        arg.expression.expression.kind === ts.SyntaxKind.ThisKeyword
    ) {
        const methodName = arg.expression.name.text;
        let resolved: string | undefined;
        const findMethod = (n: ts.Node): void => {
            if (
                !resolved &&
                ts.isMethodDeclaration(n) &&
                ts.isIdentifier(n.name) &&
                n.name.text === methodName &&
                n.body
            ) {
                const findReturn = (b: ts.Node): void => {
                    if (!resolved && ts.isReturnStatement(b) && b.expression) {
                        resolved = collectionNameFromPath(b.expression);
                    }
                    ts.forEachChild(b, findReturn);
                };
                findReturn(n.body);
            }
            ts.forEachChild(n, findMethod);
        };
        findMethod(sf);
        if (resolved) return resolved;
    }

    // An identifier — find its initializer anywhere in the file.
    if (ts.isIdentifier(arg)) {
        const name = arg.text;
        let found: string | undefined;
        const visit = (n: ts.Node): void => {
            if (
                !found &&
                ts.isVariableDeclaration(n) &&
                ts.isIdentifier(n.name) &&
                n.name.text === name &&
                n.initializer
            ) {
                found = resolveHelperCollection(n.initializer, sf);
            }
            ts.forEachChild(n, visit);
        };
        visit(sf);
        return found;
    }

    return undefined;
}

/** The collection group of a path: its last segment. */
function collectionNameFromPath(node: ts.Node | undefined): string | undefined {
    if (!node) return undefined;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        const segments = node.text.split('/').filter(Boolean);
        return segments[segments.length - 1];
    }
    // `` `${await this.getClassesPath()}/classes` `` — the literal tail is what
    // names the collection group.
    if (ts.isTemplateExpression(node)) {
        const tail =
            node.templateSpans[node.templateSpans.length - 1]?.literal.text ??
            '';
        const segments = tail.split('/').filter(Boolean);
        if (segments.length) return segments[segments.length - 1];
    }
    return undefined;
}

function extractHelperChains(
    sf: ts.SourceFile,
    _collectionConst: string | undefined
): PartialChain[] {
    const chains: PartialChain[] = [];

    function visit(n: ts.Node) {
        if (
            ts.isCallExpression(n) &&
            ts.isPropertyAccessExpression(n.expression) &&
            HELPER_NAMES.has(n.expression.name.text)
        ) {
            const filters: Array<{ field: string; op: string }> = [];
            for (const arg of n.arguments.slice(1)) {
                if (!ts.isArrayLiteralExpression(arg)) continue;
                const field = getStringLit(arg.elements[0]);
                const op = getStringLit(arg.elements[1]);
                if (field && op) filters.push({ field, op });
            }
            if (filters.length) {
                chains.push({
                    collection:
                        resolveHelperCollection(n.arguments[0], sf) ??
                        UNRESOLVED_COLLECTION,
                    filters,
                    orderBys: [],
                    startNode: n,
                });
            }
        }
        ts.forEachChild(n, visit);
    }
    visit(sf);
    return chains;
}

// ---------------------------------------------------------------------------
// Handle the `let query = db.collection(X); if (filters?.foo) query = query.where(...)`
// pattern (used in every Repository.findAll). We over-approximate by treating
// every `query = query.where(...)` in the same function as "potentially active".
// ---------------------------------------------------------------------------

function extractReassignmentChains(
    sf: ts.SourceFile,
    collectionConst: string | undefined
): PartialChain[] {
    const chains: PartialChain[] = [];

    function walkFn(fnNode: ts.Node) {
        let collectionName: string | undefined;
        let startNode: ts.Node | undefined;
        const filters: Array<{ field: string; op: string }> = [];
        const orderBys: Array<{ field: string; dir: 'asc' | 'desc' }> = [];
        const conditionalFilters = new Map<
            string,
            { field: string; op: string }
        >();
        const staticOrderBys: Array<{ field: string; dir: 'asc' | 'desc' }> =
            [];

        function visit(
            n: ts.Node,
            insideIf: ts.IfStatement | undefined = undefined
        ) {
            if (
                ts.isVariableDeclaration(n) &&
                ts.isIdentifier(n.name) &&
                n.initializer
            ) {
                const init = n.initializer;
                if (
                    ts.isCallExpression(init) &&
                    ts.isPropertyAccessExpression(init.expression)
                ) {
                    const method = init.expression.name.text;
                    if (method === 'collection' && init.arguments[0]) {
                        const lit = getStringLit(init.arguments[0]);
                        if (lit === '__COLLECTION_CONST__')
                            collectionName = collectionConst;
                        else if (lit) collectionName = lit;
                        startNode = n;
                    }
                }
            }

            // `query = query.where(...)` or `query = query.orderBy(...)` reassignment
            if (
                ts.isBinaryExpression(n) &&
                n.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
                ts.isCallExpression(n.right) &&
                ts.isPropertyAccessExpression(n.right.expression)
            ) {
                const method = n.right.expression.name.text;
                const args = n.right.arguments;
                if (method === 'where' && args.length >= 2) {
                    const field = getStringLit(args[0]);
                    const op =
                        ts.isStringLiteral(args[1]) ||
                        ts.isNoSubstitutionTemplateLiteral(args[1])
                            ? args[1].text
                            : '?';
                    if (field) {
                        filters.push({ field, op });
                        if (insideIf) {
                            const key = extractFilterKey(insideIf.expression);
                            if (key) conditionalFilters.set(key, { field, op });
                        }
                    }
                } else if (method === 'orderBy' && args.length >= 1) {
                    const field = getStringLit(args[0]);
                    let dir: 'asc' | 'desc' = 'asc';
                    if (
                        args[1] &&
                        (ts.isStringLiteral(args[1]) ||
                            ts.isNoSubstitutionTemplateLiteral(args[1]))
                    ) {
                        dir = args[1].text === 'desc' ? 'desc' : 'asc';
                    }
                    if (field) {
                        orderBys.push({ field, dir });
                        if (!insideIf) staticOrderBys.push({ field, dir });
                    }
                }
            }

            if (ts.isIfStatement(n)) {
                ts.forEachChild(n.thenStatement, (c) => visit(c, n));
                if (n.elseStatement)
                    ts.forEachChild(n.elseStatement, (c) => visit(c, insideIf));
                return;
            }

            ts.forEachChild(n, (c) => visit(c, insideIf));
        }
        visit(fnNode);

        if (collectionName && (filters.length > 0 || orderBys.length > 0)) {
            chains.push({
                collection: collectionName,
                filters,
                orderBys,
                startNode: startNode || fnNode,
                conditionalFilters:
                    conditionalFilters.size > 0
                        ? conditionalFilters
                        : undefined,
                staticOrderBys:
                    staticOrderBys.length > 0 ? staticOrderBys : undefined,
            });
        }
    }

    /**
     * Pull the property key out of an `if (filters?.foo)` / `if (filters?.foo !== undefined)` condition.
     * Returns 'foo' or undefined.
     */
    function extractFilterKey(cond: ts.Expression): string | undefined {
        let expr: ts.Expression = cond;
        if (ts.isBinaryExpression(expr)) {
            // `filters?.foo !== undefined` etc — pull the left side
            expr = expr.left;
        }
        if (ts.isPropertyAccessExpression(expr)) return expr.name.text;
        if (ts.isPropertyAccessChain(expr)) return expr.name.text;
        return undefined;
    }

    function findFunctions(n: ts.Node) {
        if (
            ts.isFunctionDeclaration(n) ||
            ts.isFunctionExpression(n) ||
            ts.isArrowFunction(n) ||
            ts.isMethodDeclaration(n) ||
            // Object literal methods: `{ async findAll() {...} }` and `{ findAll: async () => {...} }`
            (ts.isPropertyAssignment(n) &&
                (ts.isFunctionExpression(n.initializer) ||
                    ts.isArrowFunction(n.initializer))) ||
            ts.isShorthandPropertyAssignment(n)
        ) {
            walkFn(n);
        }
        ts.forEachChild(n, findFunctions);
    }
    findFunctions(sf);

    return chains;
}

// ---------------------------------------------------------------------------
// Detect ignore comment immediately preceding a chain
// ---------------------------------------------------------------------------

function getIgnoreComment(sf: ts.SourceFile, pos: number): string | undefined {
    const text = sf.getFullText();
    // Find the last `// firestore-index-analyzer-ignore: ...` before `pos` on a preceding line
    const before = text.slice(0, pos);
    const lastNL = before.lastIndexOf('\n');
    const startOfLine = lastNL + 1;
    // The "line" containing `pos` starts at startOfLine. We want comments on preceding lines.
    // Look up to 5 lines back for the ignore marker.
    const window = text.slice(Math.max(0, startOfLine - 1000), pos);
    const m = window.match(
        /\/\/\s*firestore-index-analyzer-ignore(?::\s*([^\n]*))?\s*\n[^\n]*$/
    );
    return m ? m[1] || '(no reason given)' : undefined;
}

// ---------------------------------------------------------------------------
// Decide whether a chain needs a composite index, and what shape
// ---------------------------------------------------------------------------

/**
 * Firestore composite-index rules in plain terms:
 *  - A single `.where()` with no `.orderBy()` on a different field: no composite needed.
 *  - 2+ `.where()` calls: composite needed. This over-approximates on purpose:
 *    Firestore can serve multiple *equality* filters by merging single-field
 *    indexes, so those queries do run without a declared composite index. But
 *    declaring one is harmless (and faster), while missing a genuinely required
 *    one takes production down — an asymmetry this repo has already paid for
 *    once (#314). Over-declare; don't guess.
 *  - `.where()` + `.orderBy()` on a different field: composite needed.
 *  - Any `array-contains` / `array-contains-any` + any other filter/orderBy: composite needed.
 *  - Range/inequality on a different field than `.orderBy()`: usually composite needed (we conservatively flag).
 */
function needsCompositeIndex(chain: PartialChain): boolean {
    const filterCount = chain.filters.length;
    const orderByCount = chain.orderBys.length;
    const hasArray = chain.filters.some((f) => ARRAY_OPS.has(f.op));

    if (filterCount === 0 && orderByCount <= 1) return false;
    if (filterCount >= 2) return true;
    if (hasArray && filterCount + orderByCount >= 2) return true;
    if (filterCount === 1 && orderByCount >= 1) {
        const filterField = chain.filters[0].field;
        return chain.orderBys.some((o) => o.field !== filterField);
    }
    if (filterCount === 0 && orderByCount >= 2) return true;
    return false;
}

/**
 * Build the index shape Firestore wants. Field order is not cosmetic — an
 * index whose fields are in the wrong order does not serve the query at all:
 *
 *   1. array-contains / array-contains-any field, if any
 *   2. equality fields (==, in, !=, not-in), in source order
 *   3. the range/inequality field (<, <=, >, >=)
 *   4. orderBy fields, in source order
 *
 * array-contains leading is not a guess: maple-and-spruce's deployed
 * agreementTemplates indexes, which serve live array-contains queries, are all
 * shaped that way. Only the range field was ever in the wrong place.
 *
 * Emitting filters in *source* order — as this did when it was ported — is
 * wrong whenever a query is written range-first, e.g.
 * `['registration_end_date', '>=', now], ['live', '==', true]`. That produced
 * `(registration_end_date, live)`, which Firestore will happily create and
 * never use, while the index the query actually needs stays undeclared and the
 * check reports green. A silent false pass in the one tool whose job is to stop
 * exactly that.
 */
function deriveIndexFields(chain: PartialChain): IndexField[] {
    const fields: IndexField[] = [];
    const seen = new Set<string>();

    // 1. array-contains leads.
    for (const f of chain.filters) {
        if (ARRAY_OPS.has(f.op) && !seen.has(f.field)) {
            fields.push({ fieldPath: f.field, arrayConfig: 'CONTAINS' });
            seen.add(f.field);
        }
    }
    // 2. Then equality filters.
    for (const f of chain.filters) {
        if (
            !ARRAY_OPS.has(f.op) &&
            !RANGE_OPS.has(f.op) &&
            !seen.has(f.field)
        ) {
            fields.push({ fieldPath: f.field, order: 'ASCENDING' });
            seen.add(f.field);
        }
    }
    // 3. Then the range/inequality field.
    for (const f of chain.filters) {
        if (RANGE_OPS.has(f.op) && !seen.has(f.field)) {
            fields.push({ fieldPath: f.field, order: 'ASCENDING' });
            seen.add(f.field);
        }
    }
    for (const o of chain.orderBys) {
        if (seen.has(o.field)) continue;
        fields.push({
            fieldPath: o.field,
            order: o.dir === 'desc' ? 'DESCENDING' : 'ASCENDING',
        });
        seen.add(o.field);
    }
    return fields;
}

// ---------------------------------------------------------------------------
// Load declared indexes
// ---------------------------------------------------------------------------

function loadDeclared(): IndexSpec[] {
    const raw = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
    return (raw.indexes || []) as IndexSpec[];
}

function normalize(spec: {
    collectionGroup: string;
    fields: IndexField[];
}): string {
    const parts = spec.fields.map((f) => {
        if ('arrayConfig' in f) return `${f.fieldPath}:CONTAINS`;
        return `${f.fieldPath}:${f.order}`;
    });
    return `${spec.collectionGroup}|${parts.join(',')}`;
}

/**
 * Returns true if `declared` covers `required`. A declared index covers a
 * required index when the declared field sequence STARTS WITH the required
 * sequence (Firestore prefix-matches).
 */
function coversRequired(declared: IndexSpec, required: IndexSpec): boolean {
    if (declared.collectionGroup !== required.collectionGroup) return false;
    if (required.fields.length > declared.fields.length) return false;
    for (let i = 0; i < required.fields.length; i++) {
        const a = required.fields[i];
        const b = declared.fields[i];
        if (a.fieldPath !== b.fieldPath) return false;
        if ('arrayConfig' in a && !('arrayConfig' in b)) return false;
        if ('order' in a && 'order' in b && a.order !== b.order) return false;
        if (
            'arrayConfig' in a &&
            'arrayConfig' in b &&
            a.arrayConfig !== b.arrayConfig
        )
            return false;
    }
    return true;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

/**
 * Find every call expression in the file that passes an object literal as
 * the first arg. Used to discover the actual filter combinations a helper
 * (or external caller) passes to `findAll`-style methods.
 *
 * Returns: list of { methodName, keys, location }
 */
function findLiteralArgCalls(sf: ts.SourceFile): Array<{
    methodName: string;
    keys: string[];
    line: number;
    caller: string;
}> {
    const out: Array<{
        methodName: string;
        keys: string[];
        line: number;
        caller: string;
    }> = [];

    function visit(n: ts.Node) {
        if (
            ts.isCallExpression(n) &&
            ts.isPropertyAccessExpression(n.expression) &&
            n.arguments.length >= 1 &&
            ts.isObjectLiteralExpression(n.arguments[0])
        ) {
            const methodName = n.expression.name.text;
            const obj = n.arguments[0];
            const keys: string[] = [];
            for (const prop of obj.properties) {
                if (
                    (ts.isPropertyAssignment(prop) ||
                        ts.isShorthandPropertyAssignment(prop)) &&
                    ts.isIdentifier(prop.name)
                ) {
                    keys.push(prop.name.text);
                }
            }
            if (keys.length > 0) {
                const { line } = sf.getLineAndCharacterOfPosition(
                    n.getStart(sf)
                );
                // Caller chain text for the diagnostic ("ThisRepo.findAll", "this.findAll", etc)
                const left = n.expression.expression.getText(sf);
                out.push({
                    methodName,
                    keys,
                    line: line + 1,
                    caller: `${left}.${methodName}`,
                });
            }
        }
        ts.forEachChild(n, visit);
    }
    visit(sf);
    return out;
}

/**
 * Find the `<Name>Repository = { ... }` export in a file and return its name.
 */
function findRepositoryExport(sf: ts.SourceFile): string | undefined {
    let name: string | undefined;
    function visit(n: ts.Node) {
        if (
            ts.isVariableDeclaration(n) &&
            ts.isIdentifier(n.name) &&
            n.name.text.endsWith('Repository') &&
            n.initializer &&
            ts.isObjectLiteralExpression(n.initializer)
        ) {
            name = n.name.text;
        }
        ts.forEachChild(n, visit);
    }
    visit(sf);
    return name;
}

function main(): void {
    const files = listSourceFiles();
    const allChains: QueryChain[] = [];
    /** Conditional chains with metadata used to bind callers to them. */
    type ConditionalChain = PartialChain & {
        sourceFile: string;
        sourceLine: number;
        /** `AgreementTemplateRepository` if this chain lives in a Repository export. */
        repositoryName?: string;
    };
    /** Maps `<Name>Repository` → list of conditional chains in its file. */
    const chainsByRepository = new Map<string, ConditionalChain[]>();
    /** Maps source file path → list of conditional chains in it. */
    const chainsByFile = new Map<string, ConditionalChain[]>();

    for (const file of files) {
        const text = fs.readFileSync(file, 'utf8');
        const sf = ts.createSourceFile(
            file,
            text,
            ts.ScriptTarget.ES2022,
            true
        );
        const repositoryName = findRepositoryExport(sf);
        const chains = extractChains(sf);
        for (const c of chains) {
            const { line } = sf.getLineAndCharacterOfPosition(
                c.startNode.getStart(sf)
            );
            const ignoreReason = getIgnoreComment(sf, c.startNode.getStart(sf));
            allChains.push({
                collection: c.collection!,
                filters: c.filters,
                orderBys: c.orderBys,
                file: path.relative(ROOT, file),
                line: line + 1,
                ignore: ignoreReason !== undefined,
                ignoreReason,
            });
            if (c.conditionalFilters && !ignoreReason) {
                const cc: ConditionalChain = {
                    ...c,
                    sourceFile: path.relative(ROOT, file),
                    sourceLine: line + 1,
                    repositoryName,
                };
                if (repositoryName) {
                    const list = chainsByRepository.get(repositoryName) || [];
                    list.push(cc);
                    chainsByRepository.set(repositoryName, list);
                }
                const flist = chainsByFile.get(cc.sourceFile) || [];
                flist.push(cc);
                chainsByFile.set(cc.sourceFile, flist);
            }
        }
    }

    // Pass 2: scan literal-argument calls site-by-site and emit a precise index
    // for each invocation that hits a chain with conditional filters. We bind
    // calls to chains by repository name:
    //   `AgreementTemplateRepository.findAll({...})` → chain in agreement-template.repository.ts
    //   `this.findAll({...})`                        → chain in the SAME file
    const perCallSiteRequirements: Array<{
        spec: IndexSpec;
        chain: QueryChain;
    }> = [];
    for (const file of files) {
        const relFile = path.relative(ROOT, file);
        const text = fs.readFileSync(file, 'utf8');
        const sf = ts.createSourceFile(
            file,
            text,
            ts.ScriptTarget.ES2022,
            true
        );
        const calls = findLiteralArgCalls(sf);
        for (const call of calls) {
            // Identify the target repository / file based on the call receiver.
            const receiver = call.caller.split('.')[0]; // e.g., "AgreementTemplateRepository" or "this"
            let candidates: ConditionalChain[] = [];
            if (receiver === 'this') {
                candidates = chainsByFile.get(relFile) || [];
            } else if (receiver.endsWith('Repository')) {
                candidates = chainsByRepository.get(receiver) || [];
            } else {
                continue; // not a recognized repository call
            }
            for (const cc of candidates) {
                if (!cc.conditionalFilters) continue;
                const matchedKeys = call.keys.filter((k) =>
                    cc.conditionalFilters!.has(k)
                );
                if (matchedKeys.length === 0) continue;
                // Keys not present in conditionalFilters are not a where() — they may
                // be static config (e.g., `limit`, `upcoming` that's filtered in-memory).
                // We tolerate foreign keys; only matched keys contribute to the index.
                const activeFilters = matchedKeys.map(
                    (k) => cc.conditionalFilters!.get(k)!
                );
                const synthChain: PartialChain = {
                    collection: cc.collection,
                    filters: activeFilters,
                    orderBys: cc.staticOrderBys || [],
                    startNode: cc.startNode,
                };
                if (!needsCompositeIndex(synthChain)) continue;
                const fields = deriveIndexFields(synthChain);
                perCallSiteRequirements.push({
                    spec: {
                        collectionGroup: cc.collection!,
                        queryScope: 'COLLECTION',
                        fields,
                    },
                    chain: {
                        collection: cc.collection!,
                        filters: activeFilters,
                        orderBys: synthChain.orderBys,
                        file: relFile,
                        line: call.line,
                        ignore: false,
                        ignoreReason: `${call.caller}({ ${call.keys.join(', ')} }) → ${cc.sourceFile}:${cc.sourceLine}`,
                    },
                });
            }
        }
    }

    const declared = loadDeclared();
    const required: Array<{ spec: IndexSpec; chain: QueryChain }> = [];

    for (const chain of allChains) {
        if (chain.ignore) continue;
        if (!needsCompositeIndex(chain as unknown as PartialChain)) continue;
        const fields = deriveIndexFields(chain as unknown as PartialChain);
        required.push({
            spec: {
                collectionGroup: chain.collection,
                queryScope: 'COLLECTION',
                fields,
            },
            chain,
        });
    }

    // Merge in the per-call-site requirements (often a subset / different
    // ordering than the worst-case chain index).
    for (const r of perCallSiteRequirements) required.push(r);

    // Pass 3: for every conditional-filter chain with an orderBy, emit a
    // single-filter + orderBy index for each conditional filter individually.
    //
    // Why this is needed: request-forwarding Cloud Functions (e.g., getInvoices,
    // getLessons) pass `findAll({ a: data.a, b: data.b, ... })` with values that
    // may independently be `undefined` at runtime. The per-call-site pass above
    // sees both keys present and emits a 2+orderBy index, missing the case
    // where only one filter actually activates. This pass fills that gap by
    // declaring an index for each individual filter.
    //
    // We intentionally do NOT enumerate every intermediate subset (would be 2^N
    // indexes per chain — too many). Single-filter and all-filters are by far
    // the most common runtime shapes; the analyzer will catch any genuine middle
    // subset in CI when a new caller is added.
    for (const ccList of chainsByFile.values()) {
        for (const cc of ccList) {
            if (!cc.conditionalFilters) continue;
            if (!cc.staticOrderBys || cc.staticOrderBys.length === 0) continue;
            for (const filter of cc.conditionalFilters.values()) {
                const synthChain: PartialChain = {
                    collection: cc.collection,
                    filters: [filter],
                    orderBys: cc.staticOrderBys,
                    startNode: cc.startNode,
                };
                if (!needsCompositeIndex(synthChain)) continue;
                const fields = deriveIndexFields(synthChain);
                required.push({
                    spec: {
                        collectionGroup: cc.collection!,
                        queryScope: 'COLLECTION',
                        fields,
                    },
                    chain: {
                        collection: cc.collection!,
                        filters: [filter],
                        orderBys: cc.staticOrderBys,
                        file: cc.sourceFile,
                        line: cc.sourceLine,
                        ignore: false,
                        ignoreReason: `single-filter (runtime subset of ${cc.sourceFile})`,
                    },
                });
            }
        }
    }

    // Step 1: drop any required index already covered by a declared one.
    const stillNeeded = required.filter(
        (r) => !declared.some((d) => coversRequired(d, r.spec))
    );

    // Step 2: among the remaining, consolidate prefix-coverable entries — if
    // index B is a prefix of index A, A covers B and B is redundant. Keep the
    // longest distinct shapes.
    const byKey = new Map<string, (typeof required)[number]>();
    for (const r of stillNeeded) {
        const key = normalize(r.spec);
        if (!byKey.has(key)) byKey.set(key, r);
    }
    const distinct = [...byKey.values()];
    const missing: typeof required = [];
    for (const r of distinct) {
        const coveredByOther = distinct.some(
            (other) => other !== r && coversRequired(other.spec, r.spec)
        );
        if (!coveredByOther) missing.push(r);
    }

    if (VERBOSE) {
        console.log(
            `Scanned ${files.length} files, found ${allChains.length} query chains.\n`
        );
        console.log(`Composite-index-requiring chains: ${required.length}\n`);
        for (const r of required) {
            console.log(
                `  ${r.chain.file}:${r.chain.line}  ${r.chain.collection}`
            );
            console.log(
                `    filters: ${r.chain.filters.map((f) => `${f.field} ${f.op}`).join(', ') || '(none)'}`
            );
            console.log(
                `    orderBy: ${r.chain.orderBys.map((o) => `${o.field} ${o.dir}`).join(', ') || '(none)'}`
            );
        }
        console.log();
    }

    if (missing.length === 0) {
        console.log(
            `✓ All ${required.length} composite-index-requiring queries are covered by firestore.indexes.json.`
        );
        return;
    }

    console.error(
        `✗ ${missing.length} Firestore composite index(es) are missing from firestore.indexes.json.\n`
    );
    console.error(
        'Add the following entries to the "indexes" array in firestore.indexes.json:\n'
    );

    for (const m of missing) {
        console.error(`  // Required by ${m.chain.file}:${m.chain.line}`);
        const entry = JSON.stringify(m.spec, null, 2)
            .split('\n')
            .map((l) => '  ' + l)
            .join('\n');
        console.error(entry + ',');
        console.error('');
    }

    console.error(
        '\nIf a flagged query is intentionally bypassing the analyzer (dynamic shape we'
    );
    console.error(
        "accept won't hit prod, etc.), add this comment above the query:"
    );
    console.error('  // firestore-index-analyzer-ignore: <reason>\n');

    process.exit(1);
}

main();
