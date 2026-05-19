# PrimeNG → Angular Material Migration Plan

## Why

After the Angular 21 + nx 22.7.2 upgrade, PrimeNG 17 stays on the tree only via a peer-dep override (`overrides.primeng` in `package.json`). PrimeNG 18+ has breaking API changes (`PrimeTemplate` moved, `ButtonDirective` no longer exported from `primeng/button`, theming reworked, bundled CSS removed). Bumping to PrimeNG 21 would mean rewriting 46 files using PrimeNG's new APIs **and** the project is already directional on Angular Material (per `AGENTS.md`: _"For all new components and updates, use Angular Material (not PrimeNG)"_). So the migration target is **Angular Material, not PrimeNG 21**.

## Surface area

- **46 files** import from `primeng/*` (across apps and libs)
- **41 distinct PrimeNG modules** in use
- **0 files** reference PrimeNG CSS directly (good — themed via `@primeng/themes`)
- PrimeNG providers wired in `apps/enrollment-portal/src/main.ts` (`MessageService`)

## Module-to-Material mapping

Direct 1:1 (mechanical):

| PrimeNG                                                       | Angular Material                                  |
| ------------------------------------------------------------- | ------------------------------------------------- |
| `ButtonModule`, `RippleModule`                                | `MatButtonModule`, `MatRipple`                    |
| `CardModule`, `PanelModule`, `FieldsetModule`                 | `MatCardModule`                                   |
| `CheckboxModule`                                              | `MatCheckboxModule`                               |
| `RadioButtonModule`                                           | `MatRadioModule`                                  |
| `InputTextModule`, `InputTextareaModule`, `InputNumberModule` | `MatInputModule`                                  |
| `DropdownModule`                                              | `MatSelectModule`                                 |
| `MultiSelectModule`                                           | `MatSelectModule` (with `multiple`)               |
| `SelectButtonModule`                                          | `MatButtonToggleModule`                           |
| `ToggleButtonModule`                                          | `MatSlideToggleModule`                            |
| `CalendarModule`                                              | `MatDatepickerModule` + `MatNativeDateModule`     |
| `SliderModule`                                                | `MatSliderModule`                                 |
| `ProgressBarModule`                                           | `MatProgressBarModule`                            |
| `ProgressSpinnerModule`                                       | `MatProgressSpinnerModule`                        |
| `DialogModule`                                                | `MatDialog`                                       |
| `MenuModule`                                                  | `MatMenuModule`                                   |
| `TabViewModule`                                               | `MatTabsModule`                                   |
| `AccordionModule`                                             | `MatExpansionModule`                              |
| `StepsModule`                                                 | `MatStepperModule`                                |
| `ChipModule`, `TagModule`                                     | `MatChipsModule`                                  |
| `ToastModule` + `MessageService`                              | `MatSnackBar` (wrap in `SolToastService`)         |
| `MessagesModule`, `MessageModule`                             | inline alert components (already partially exist) |

Higher-effort:

| PrimeNG                                                      | Replacement                                                | Notes                                                                                                                                    |
| ------------------------------------------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `TableModule`                                                | `MatTableModule` + `MatSort` + `MatPaginator`              | Significantly different API. Each `<p-table>` becomes a `<table mat-table>` with `matColumnDef`s. Filter/sort/pagination wired manually. |
| `TreeTableModule`                                            | CDK tree + `MatTable` composition                          | No 1:1 in Material. Custom recursive tree component.                                                                                     |
| `OverlayPanelModule`                                         | CDK `Overlay` + `cdkOverlayOrigin`                         | More verbose; consider helper directive.                                                                                                 |
| `SkeletonModule`                                             | Custom component using CSS `linear-gradient` shimmer       | Trivial, ~30 LoC.                                                                                                                        |
| `AvatarModule`                                               | Custom component or `MatIcon` with circular bg             | No Material primitive.                                                                                                                   |
| `AutoFocusModule`                                            | `cdkFocusInitial` (CDK A11y)                               | Direct swap on attribute.                                                                                                                |
| `ChartModule`                                                | Keep `chart.js` directly                                   | PrimeNG just wraps Chart.js; drop the wrapper.                                                                                           |
| `MenuItem`, `Message`, `TreeNode` (types from `primeng/api`) | Define local interfaces in `libs/angular/<consumer>/types` | Trivial.                                                                                                                                 |

## Sequencing

Subagents need a partial order — leaf components before consumers — to avoid one agent breaking another's build.

### Phase 0 — Inventory + scaffolding (single agent, ~1h)

- Generate a per-file inventory: which PrimeNG modules each file uses
- Create `libs/angular/toast/` library with `SolToastService` (wraps `MatSnackBar`, matches `MessageService.add()` API to ease per-file migration)
- Create `libs/angular/skeleton/` and `libs/angular/avatar/` libraries with Material-styled replacements
- Define local types replacing `MenuItem`, `Message`, `TreeNode` in a `libs/ts/ui/types` lib
- **Output**: inventory CSV/markdown, new libs scaffolded, no behavior change. PrimeNG still in place.

### Phase 1 — Direct-mapping libraries (parallelize by library)

One agent per library directory. Each agent migrates ALL files in its assigned lib in one pass:

| Group | Lib                                     | File count | Complexity                                 |
| ----- | --------------------------------------- | ---------- | ------------------------------------------ |
| 1A    | `libs/angular/auth/login`               | 3          | Low (Button, OverlayPanel, MessageService) |
| 1B    | `libs/angular/calendar/calendar`        | 1          | Low                                        |
| 1C    | `libs/angular/dialog`                   | 1          | Low (Dialog wrapper)                       |
| 1D    | `libs/angular/braintree-client`         | 1          | Low (Button + Toast)                       |
| 1E    | `libs/angular/account`                  | 4          | Medium (Card, Avatar, Table, Skeleton)     |
| 1F    | `libs/angular/admin/students`           | 3          | Medium (Table, Skeleton)                   |
| 1G    | `libs/angular/admin/class-printouts`    | 4          | Medium                                     |
| 1H    | `libs/angular/admin/enrollments`        | 1          | Medium (Table heavy)                       |
| 1I    | `libs/angular/classes/class-calendar`   | 1          | Low                                        |
| 1J    | `libs/angular/classes/class-enrollment` | 22         | **High** — split further                   |

Group 1J is too big for one agent. Split:

- **1J-a**: enrollment-workflow + immediate children (5 files)
- **1J-b**: `classes/` subdirectory (8 files)
- **1J-c**: leaf components: confirmation, info, medical, releases, account, events, checkout, etc. (9 files)

### Phase 2 — App-level migration (single agent, after Phase 1)

- `apps/enrollment-portal/src/main.ts` (drop `MessageService` provider)
- `apps/enrollment-portal/src/app/app.component.ts`, `donate.component.ts`, `dashboard.component.ts`, `tshirts.component.ts`

### Phase 3 — Removal (single agent, ~30min)

- Remove `primeng`, `@primeng/themes`, `primeicons`, `primeflex` from `package.json`
- Remove the `primeng` block from `package.json` `overrides`
- Remove PrimeNG theme import from `apps/enrollment-portal/src/styles.scss`
- `npm install`; verify no remaining `primeng` import via `grep -rln "primeng" --include='*.ts' --include='*.scss' apps libs`
- Run full build matrix: `npx nx run-many --target=build`

### Phase 4 — Verification (manual + agent)

- Run `npx nx affected:lint --base=main`
- Run `npx nx affected:test --base=main`
- Spin up `enrollment-portal` dev server, smoke-test the enrollment flow end-to-end (the longest PrimeNG-touching path)
- Visual diff: each migrated screen compared to the prior PrimeNG version (Material defaults look different — confirm the design is acceptable or tune theme tokens in `design-tokens.scss`)

## Per-file prompt template for subagents

Each Phase 1 agent should be briefed with:

```
You're migrating <LIB_PATH> from PrimeNG to Angular Material.

Files to update: <list>

For each file:
1. Replace `import ... from 'primeng/<mod>'` with the corresponding `@angular/material/<mod>` (mapping in PRIMENG_MIGRATION_PLAN.md).
2. Replace selectors in the template (`p-button` → `button mat-button`, `p-card` → `mat-card`, etc.).
3. Replace property bindings — PrimeNG uses `[value]` where Material often uses `[ngModel]` or form control; check each component.
4. For `MessageService.add(...)` calls, swap to `SolToastService.show(...)` (from `@sol/toast`).
5. For `<p-toast>`, remove from template — `MatSnackBar` handles its own container.
6. Run `npx nx build <project-name>` after the file. Fix any type errors before moving on.
7. Do NOT touch design tokens or theme files — only component-level swaps.

Hard constraint: each file must build green before moving to the next. Commit per file or per logical group.

When done, report:
- Files changed
- Any template/behavior decisions that weren't 1:1 (e.g., PrimeNG's `globalFilter` doesn't exist on MatTable — note what you did instead)
- Any visual regressions that need design review
```

## Risk register

- **MatTable migration** is the highest-risk piece. PrimeNG's `<p-table>` does sort/filter/pagination/lazy-load declaratively; `MatTable` requires explicit `MatSort` / `MatPaginator` / `MatTableDataSource` wiring. Allocate extra time for table-heavy files (`enrollments.component.ts`, `student-info-table-view.component.ts`, `account-students.component.ts`).
- **Visual regressions**: Material defaults are visually different from PrimeNG (denser, different elevation, no rounded corners by default). Plan a design review pass.
- **PrimeNG theme tokens**: Currently themed via `@primeng/themes` (already deprecated upstream). Removal frees us from a deprecated package.
- **PrimeIcons**: `primeicons` (used as CSS class names like `pi pi-check`) needs to be swapped to `<mat-icon>` instances. Each `pi-*` class is a separate find-and-replace; recommend a grep-based audit before declaring done.

## Done criteria

- `grep -rln "primeng\|primeicons\|primeflex" --include='*.ts' --include='*.html' --include='*.scss' --include='*.css' apps libs` returns no matches
- `package.json` has no `primeng*` / `@primeng/*` / `primeicons` / `primeflex` entries
- All affected nx projects build, lint, and test green
- Manual smoke test of enrollment flow passes
