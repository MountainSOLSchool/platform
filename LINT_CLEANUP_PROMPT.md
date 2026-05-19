# Lint Cleanup Task — Prompt for Independent Session

Copy everything between the `---` markers below and paste it into a fresh Claude Code session in this repo.

---

You are cleaning up a backlog of ~250 lint errors that surfaced after a recent security upgrade PR (`chore/security-upgrade-nextjs-angular-21`). These errors are **pre-existing on `main`** — they predate the upgrade. They went unnoticed because the husky pre-commit hook was silently broken: `.husky/_/husky.sh` was missing, the `pre-commit` script's `.` (source) line errored, and `lint-staged` never actually gated commits. The husky setup has since been re-initialized, so any new commit now exercises the hook and surfaces the backlog.

Verify the situation yourself before fixing anything:

```bash
git status                 # confirm clean working tree on main (or your branch)
ls .husky/_                # if missing, run: npx husky install
npx nx run-many --target=lint --projects=enrollment-portal,classes-class-enrollment --skip-nx-cache
```

You should see roughly 48 errors for `enrollment-portal` and 99 for `classes-class-enrollment`. That's expected pre-existing state.

## Error categories and recommended order

Tackle in this order — smallest blast radius first, biggest last.

### 1. Jest config `/* eslint-disable */` directives (6 errors, ~5 min)

Affected files:
- `libs/angular/firebase/adapter/jest.config.ts`
- `libs/ts/firebase/firebase-config/jest.config.ts`

Each top-level `/* eslint-disable */` triggers three rules: `eslint-comments/no-use`, `eslint-comments/no-unlimited-disable`, `eslint-comments/disable-enable-pair`. Either:
- Remove the directive entirely if no rule actually needs disabling
- Replace with a scoped form: `/* eslint-disable @typescript-eslint/no-var-requires */` (or whichever specific rule is being suppressed) and add a matching `/* eslint-enable */` at end of file

Run `npx nx run firebase-angular-adapter:lint` and `npx nx run firebase-config:lint` after each edit to confirm.

### 2. Storybook `.ts` parser errors (2 errors, ~10 min)

Affected files:
- `apps/enrollment-portal/.storybook/main.ts`
- `apps/enrollment-portal/.storybook/preview.ts`

Error: `Parsing error: ESLint was configured to run on ... using parserOptions.project: <tsconfigRootDir>/tsconfig.base.json` — the storybook files aren't in any tsconfig's `include`.

Fix: in `apps/enrollment-portal/.storybook/tsconfig.json` (create if missing) include `["./*.ts"]` and extend the app tsconfig; then point eslint at the storybook tsconfig for files in `.storybook/`. Alternatively, add `apps/enrollment-portal/.storybook/**/*.ts` to the existing app tsconfig's `include`.

### 3. `@nx/enforce-module-boundaries` relative-path imports (6 errors, ~15 min)

Locations (search for the exact errors):
```bash
npx nx run-many --target=lint --all 2>&1 | grep -B 3 "Projects cannot be imported by a relative"
```

Each occurrence is a `from '../../some/lib/path'` that should be `from '@sol/some/lib/path'`. The path mapping lives in `tsconfig.base.json`. Find the matching `@sol/*` alias and swap.

### 4. `@nx/dependency-checks` (2 errors, ~5 min)

Files:
- `libs/ts/firebase/adapter/package.json` — flagged: `@angular/fire`, `@angular/core` are listed but not used by `firebase-sdk-adapter`

Remove the unused dependencies from each `package.json`. If they're actually used at runtime but the dependency-checker can't see it (rare — usually means a dynamic import), add the rule disable inline with a comment explaining why.

### 5. `@typescript-eslint/no-empty-function` and `@angular-eslint/no-empty-lifecycle-method` (4 errors, ~10 min)

Find with:
```bash
npx nx run-many --target=lint --all 2>&1 | grep -B 3 "no-empty"
```

For empty lifecycle methods: delete the method. Angular doesn't require empty `ngOnInit()` etc.
For empty methods (e.g. `close(): void {}`): if the empty body is intentional (stub or no-op), add `// no-op` comment AND `eslint-disable-next-line @typescript-eslint/no-empty-function`. Or, if the method is truly unused, delete it.

### 6. `unused-imports/no-unused-imports` and `no-unused-vars` (3 errors, ~5 min)

Auto-fixable:
```bash
npx nx run-many --target=lint --fix --all
```

This should clear them. Verify with a follow-up lint run.

### 7. Circular dependencies (`@nx/enforce-module-boundaries`, ~200 errors — the big one)

**This is the architectural cleanup.** Pattern:
```
enrollment-portal -> firebase-angular-api -> firebase-functions-api -> enrollment-portal
enrollment-portal -> auth-user -> firebase-functions-api -> enrollment-portal
enrollment-portal -> class-list -> firebase-functions-api -> enrollment-portal
...
```

`firebase-functions-api` declares request/response types that are also referenced from `enrollment-portal`, and those types pull in things from `enrollment-portal` via re-exports — creating the cycle.

The right fix: extract the shared types into a leaf library that neither imports back into the consumers. Likely candidates:
- A new `libs/ts/firebase/api-shared-types` library that contains only types/interfaces, no logic
- Move `Request` / `Response` type definitions from `firebase-functions-api` into the new lib
- Update `firebase-functions-api`, `enrollment-portal`, and the affected consumer libs (`auth-user`, `class-list`, `auth-login`, `header`, `account`, `angular-admin-*`, `classes-class-*`, `payments-braintree-client`, `calendar`, `semester-list`, `angular-medic-*`) to import from the new shared-types lib

To enumerate the unique cycles you need to break:
```bash
npx nx run-many --target=lint --all 2>&1 \
  | grep -oE "Circular dependency between [^.]*detected: [^.]*" \
  | sort -u
```

**Suggested phased approach for circular deps:**
- Phase 7a: pick the single most-referenced cycle (probably `enrollment-portal -> firebase-functions-api -> enrollment-portal`) and break it by extracting types. Verify with `npx nx graph` that the cycle is gone.
- Phase 7b: repeat for the next most-referenced cycle.
- Each phase should be a separate commit so they can be reviewed independently.
- If a cycle truly cannot be broken without a refactor that's bigger than appropriate, add a per-line `// eslint-disable-next-line @nx/enforce-module-boundaries` with a TODO comment referencing a tracking issue — but only as a last resort.

## Out of scope

- Do NOT modify the security upgrade PR's content (next, nx, Angular, ngrx bumps, jest config changes in `jest.preset.js`, `jest.fetch-polyfill.js`, `PRIMENG_MIGRATION_PLAN.md`). That PR is being reviewed locally; this cleanup must not collide with it.
- Do NOT rewrite the eslint config to downgrade these to warnings. The hook is correctly catching them.
- Do NOT touch `.husky/pre-commit` or `package.json`'s `install:husky` script unless explicitly addressing the broken husky setup (which is a separate, valid cleanup item but should be its own PR).

## Done criteria

- `npx nx run-many --target=lint --all` returns 0 errors
- `git commit` (with the husky hook intact) succeeds without `--no-verify`
- All work is on a new branch (suggested: `chore/lint-backlog-cleanup`)
- Each phase 7 cycle-break is a separate commit with a clear message describing which cycle was broken and how

## Verification commands

```bash
# Full project lint
npx nx run-many --target=lint --all

# Just affected lint (use during development)
npx nx affected:lint --base=main

# Auto-fix everything that can be auto-fixed
npx nx run-many --target=lint --fix --all

# Visual confirmation of dep graph (look for cycles)
npx nx graph
```

---

End of prompt. Save above as the initial message to the new session.
