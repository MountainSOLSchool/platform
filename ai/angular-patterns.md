# Angular Patterns

This document describes the Angular patterns and conventions used in the Mountain SOL platform codebase.

## Signal-Based State Management

The codebase uses Angular signals for reactive state management instead of RxJS observables where possible.

### Signal Types

#### `signal<T>`
Standard mutable signal for component state.

**Example**: `apps/enrollment-portal/src/app/donate-full.component.ts:445-447`

#### `computed<T>`
Derived state that automatically updates when dependencies change.

**Key Pattern**: Return `undefined` from computed signals when dependent data is still loading. This allows templates to wait for defined state before rendering.

**Examples**:
- `apps/enrollment-portal/src/app/donate-full.component.ts:440-443` (isLoggedIn with undefined handling)
- `apps/enrollment-portal/src/app/donate-full.component.ts:458-470` (messages derived from donationResult)
- `apps/enrollment-portal/src/app/donate-full.component.ts:472-476` (transactionId)

#### `linkedSignal<T>`
A signal that can be both derived from other signals AND mutated directly.

**Example**: `apps/enrollment-portal/src/app/donate-full.component.ts:447` (donorEmail)

Use when you need a default value from reactive state but also allow manual override.

### Converting Observables to Signals

Use `toSignal()` from `@angular/core/rxjs-interop`.

**Example**: `apps/enrollment-portal/src/app/donate-full.component.ts:439`

This subscribes to the observable and converts emissions to signal updates, with automatic cleanup on component destruction.

### Avoiding Subscription Leaks

**Bad Pattern**: Manual subscription in constructor without cleanup

**Good Pattern**: Use `toSignal()` with `computed()`

**Reference**: See the pattern in `apps/enrollment-portal/src/app/donate-full.component.ts:439-443`

## State Machines for Async Operations

Use discriminated unions to represent async operation states declaratively.

**Example**: `apps/enrollment-portal/src/app/donate-full.component.ts:450-455` (donationResult signal)

**Benefits**:
- Single source of truth for operation state
- No timing bugs (messages can't be out of sync with success state)
- Type-safe access to state-specific data (e.g., `transactionId` only exists when `status === 'success'`)

**Usage in processDonation()**: `apps/enrollment-portal/src/app/donate-full.component.ts:501-546`

## Firebase Functions Integration

### MountainSolApiService (Preferred)

The preferred way to call Firebase functions is via `MountainSolApiService`, which provides typed, declarative function calls.

**Service location**: `libs/angular/firebase/api/src/lib/services/mountain-sol-api.service.ts`

**Import**: `import { MountainSolApiService } from '@sol/angular/firebase/api';`

**Usage**:
```typescript
readonly #api = inject(MountainSolApiService);

this.#api.createClass({ semesterId: '...', name: 'Math 101' })
    .subscribe(response => console.log(response.classId));
```

**Key benefits**:
- Types imported from `@sol/ts/firebase/api-types` (no backend dependencies)
- Functions declared once with types in the service
- Automatically applies `RequestedOperatorsUtility.ignoreAllStatesButLoaded()`

**Adding new functions**: See `libs/angular/firebase/api/src/lib/services/mountain-sol-api.service.ts` for pattern.

**declareFunction utility**: `libs/angular/request/src/lib/utilities/declare-function.utility.ts`

### Low-Level: FirebaseFunctionsService

For cases not covered by `MountainSolApiService`, use the lower-level service.

**Service implementation**: `libs/firebase/functions-api/src/lib/services/functions.service.ts:16-26`

**Key points**:
- `.call()` returns `Observable<Requested<T>>` which emits `Loading`, then data or `Error`
- Use `RequestedOperatorsUtility.ignoreAllStatesButLoaded()` to filter out loading/error states

**Operator implementation**: `libs/angular/request/src/lib/utilities/requested-operators.utility.ts:6-8`

## Subscription-Free Patterns: rxResource and rxMethod

This codebase avoids manual `subscribe()` calls by using two key patterns:
- **`rxResource`** - Declarative data loading tied to component lifecycle
- **`rxMethod`** - Reactive side effects triggered by signal changes

Both patterns handle subscription management automatically, eliminating memory leaks and cleanup boilerplate.

### rxResource: Declarative Data Loading

**Import**: `import { rxResource } from '@angular/core/rxjs-interop';`

Use `rxResource` when you need to:
- Load data on component initialization
- Reload data when parameters change
- Access loading/error/success states in templates

#### Basic Usage (No Parameters)

```typescript
readonly semesters = rxResource({
    stream: () =>
        this.#semesterService
            .getAllSemesters()
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
});
```

**Reference**: `libs/angular/admin/class-printouts/src/lib/components/class-printouts-component/class-printouts.component.ts:43-48`

#### Parameterized Loading (Auto-Refetch)

When `params` references a signal, rxResource automatically refetches when that signal changes:

```typescript
readonly selectedSemester = linkedSignal(() => this.semesters.value()?.[0]?.id ?? '');

readonly classRows = rxResource({
    params: () => this.selectedSemester(),
    stream: ({ params: selectedSemester }) =>
        this.#classService
            .getClassesBySemester(selectedSemester)
            .pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                map((data) => this.#transformData(data))
            ),
});
```

**Reference**: `libs/angular/admin/class-printouts/src/lib/components/class-printouts-component/class-printouts.component.ts:50-67`

#### Accessing rxResource Data

In templates - use `.value()` and `.status()`:

```html
@switch (studentsResource.status()) {
    @case ('loading') { <loading-skeleton /> }
    @case ('error') { <error-state (retry)="studentsResource.reload()" /> }
    @default {
        @for (item of studentsResource.value(); track item.id) {
            <item-card [item]="item" />
        }
    }
}
```

In component code - use with `computed()`:

```typescript
readonly sizeCounts = computed(() => {
    const students = this.students.value();
    if (!students) return undefined;
    return sizes.map((size) => ({ size, count: this.getCount(size, students) }));
});
```

**Reference**: `apps/enrollment-portal/src/app/tshirts-component/tshirts.component.ts:64-71`

**Available ResourceRef methods**:
- `.value()` - The loaded data (T | undefined)
- `.status()` - 'idle' | 'loading' | 'error' | 'success'
- `.error()` - Error details if status is 'error'
- `.reload()` - Manually trigger a reload

**Full example**: `libs/angular/account/src/lib/components/students/account-students.component.ts`

---

### rxMethod: Reactive Side Effects

**Import**: `import { rxMethod } from '@ngrx/signals/rxjs-interop';`

Use `rxMethod` when you need to:
- Trigger side effects (dialogs, API calls) in response to signal changes
- Handle user actions that require async operations
- Replace imperative subscribe() calls with declarative pipelines

#### Pattern: Signal-Driven Side Effects

Instead of subscribing to events, set a signal and let rxMethod react:

```typescript
// 1. Signal to trigger the effect
readonly rowOfEmailsBeingCopied = signal<ClassPrintoutRow | undefined>(undefined);

// 2. rxMethod that reacts to signal changes
readonly #copyClassEmailsFor = rxMethod<ClassPrintoutRow | undefined>(
    pipe(
        filter((row): row is ClassPrintoutRow => !!row),
        switchMap((row) =>
            this.#emailService.getClassEmails({ classId: row.id }).pipe(
                tap((emails) => this.#dialog.open(EmailsDialog, { data: { emails } })),
                tap(() => this.rowOfEmailsBeingCopied.set(undefined))
            )
        )
    )
);

// 3. Connect signal to rxMethod in ngOnInit
ngOnInit() {
    this.#copyClassEmailsFor(this.rowOfEmailsBeingCopied);
}

// 4. User action just sets the signal
copyEmailsClick(row: ClassPrintoutRow) {
    this.rowOfEmailsBeingCopied.set(row);
}
```

**Reference**: `libs/angular/admin/class-printouts/src/lib/components/class-printouts-component/class-printouts.component.ts:69-108`

#### Simpler Example: Opening a Dialog

```typescript
readonly studentBeingViewed = signal<StudentTableRow | undefined>(undefined);

readonly #viewStudentInfo = rxMethod<StudentTableRow | undefined>(
    pipe(
        switchMap((student) => {
            if (!student) return [];
            this.#dialog.open(StudentInfoDialog, { data: { studentId: student.id } });
            this.studentBeingViewed.set(undefined);
            return [];
        })
    )
);

ngOnInit() {
    this.#viewStudentInfo(this.studentBeingViewed);
}

viewInfoClick(student: StudentTableRow) {
    this.studentBeingViewed.set(student);
}
```

**Reference**: `libs/angular/admin/students/src/lib/sol-angular-admin-students/student-info-table.component.ts:43-73`

#### Key rxMethod Concepts

1. **Generator function**: Takes `source$: Observable<Input>` and returns `Observable<unknown>`
2. **Input types**: Accepts `Input | Signal<Input> | Observable<Input>`
3. **Auto-cleanup**: Destroys subscription when component is destroyed
4. **Operator pipeline**: Use standard RxJS operators (filter, switchMap, tap, etc.)

---

### Comparison: Before and After

#### Before (Manual Subscribe)

```typescript
// BAD: Manual subscription with cleanup boilerplate
private destroy$ = new Subject<void>();

ngOnInit() {
    this.selectedSemester$.pipe(
        switchMap(semester => this.api.getClasses(semester)),
        takeUntil(this.destroy$)
    ).subscribe(classes => {
        this.classes = classes;
    });
}

ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
}

viewStudent(student: Student) {
    this.studentService.getDetails(student.id).subscribe(details => {
        this.dialog.open(StudentDialog, { data: details });
    }); // Memory leak - no cleanup!
}
```

#### After (rxResource + rxMethod)

```typescript
// GOOD: Declarative, auto-managed subscriptions
readonly selectedSemester = linkedSignal(() => this.semesters.value()?.[0]?.id ?? '');

readonly classes = rxResource({
    params: () => this.selectedSemester(),
    stream: ({ params: semester }) => this.api.getClasses(semester),
});

readonly studentBeingViewed = signal<Student | undefined>(undefined);

readonly #viewStudent = rxMethod<Student | undefined>(
    pipe(
        filter((s): s is Student => !!s),
        switchMap(student => this.studentService.getDetails(student.id).pipe(
            tap(details => this.dialog.open(StudentDialog, { data: details })),
            tap(() => this.studentBeingViewed.set(undefined))
        ))
    )
);

ngOnInit() {
    this.#viewStudent(this.studentBeingViewed);
}

viewStudent(student: Student) {
    this.studentBeingViewed.set(student);
}
// No ngOnDestroy needed - cleanup is automatic
```

---

### When to Use Each Pattern

| Pattern | Use When |
|---------|----------|
| `rxResource` | Loading data for display, especially with reactive parameters |
| `rxMethod` | Side effects: dialogs, navigation, API calls triggered by user actions |
| `toSignal()` | Converting a single observable to a signal (one-time setup) |
| `computed()` | Deriving new values from existing signals |

---

### Common Patterns with RequestedOperatorsUtility

Firebase function calls emit loading states. Use `RequestedOperatorsUtility.ignoreAllStatesButLoaded()` to filter:

```typescript
readonly data = rxResource({
    stream: () =>
        this.#functionsApi
            .call<ResponseType>('functionName', params)
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
});
```

**Operator implementation**: `libs/angular/request/src/lib/utilities/requested-operators.utility.ts:6-8`

## Conditional Rendering with Signals

### Wait for Defined State

When state may be `undefined` during loading, wait before rendering.

**Pattern**: `apps/enrollment-portal/src/app/donate-full.component.ts:440-443` (computed returning undefined)

**Template usage**: `apps/enrollment-portal/src/app/donate-full.component.ts:185-198`

**Rationale**: Components with `@Input()` properties only read them once in `ngOnInit()`. If the input binding changes after initialization, the component won't update. By waiting for defined state, we ensure the component initializes with the correct value.

**Reference**: `libs/angular/braintree-client/src/lib/components/payment-collector/payment-collector.component.ts:56-62`

## Form Patterns

### Input Masking

**Current implementation**: Uses PrimeNG `p-inputMask` (legacy)

**State field (2 uppercase letters)**: `apps/enrollment-portal/src/app/donate-full.component.ts:108-117`

**ZIP field (5 digits)**: `apps/enrollment-portal/src/app/donate-full.component.ts:122-130`

**For new implementations**: Consider using Angular Material `<mat-form-field>` with custom directives or third-party mask libraries compatible with Material (e.g., `ngx-mask`)

**Note**: When migrating masked inputs from PrimeNG, preserve the same UX (uppercase transform, placeholder behavior, validation)

### Validation

Keep validation simple and declarative.

**Example**: `apps/enrollment-portal/src/app/donate-full.component.ts:478-490`

## Component Communication

### Payment Collector Pattern

Components that collect data emit observables.

**Output definition**: `libs/angular/braintree-client/src/lib/components/payment-collector/payment-collector.component.ts:42-50`

**Parent subscription**: `apps/enrollment-portal/src/app/donate-full.component.ts:497-499`

**Template binding**: `apps/enrollment-portal/src/app/donate-full.component.ts:190-195`

### Signal Inputs with Effects for Reloading

When a child component needs to reload data based on parent input changes, use `input()` with `effect()`:

**Reference**: `libs/angular/classes/class-management/src/lib/components/unit-selector/unit-selector.component.ts:355-389`

Pattern:
```typescript
readonly ageGroup = input<string>('');
private previousAgeGroup = '';

constructor() {
    effect(() => {
        const currentAgeGroup = this.ageGroup();
        if (currentAgeGroup !== this.previousAgeGroup) {
            this.previousAgeGroup = currentAgeGroup;
            this.selectedUnitIds.set([]);
            this.selectionChange.emit([]);
            this.loadUnits();
        }
    });
    this.loadUnits();
}
```

This pattern tracks input changes and triggers side effects (like API calls) when they change.

## Confirmation Dialogs

Use Angular Material `MatDialog` for confirmation prompts.

**Reference**: `libs/angular/classes/class-management/src/lib/components/unit-selector/unit-selector.component.ts:483-493`

Pattern:
```typescript
this.dialog
    .open(UnitLimitWarningDialogComponent)
    .afterClosed()
    .subscribe((confirmed) => {
        if (confirmed) {
            // User confirmed action
        }
    });
```

**Dialog component example**: `libs/angular/classes/class-management/src/lib/components/unit-selector/unit-limit-warning-dialog.component.ts`

Dialog components use:
- `mat-dialog-title` for header
- `mat-dialog-content` for body
- `mat-dialog-actions` for buttons
- `[mat-dialog-close]="value"` to close with a result

## Styling Patterns

### UI Component Libraries

**IMPORTANT**: The codebase is transitioning from PrimeNG to Angular Material.

**For NEW components and updates**:
- Use Angular Material components only
- Import from `@angular/material/*`
- Follow Material Design guidelines

**Legacy PrimeNG usage**:
- Existing components still use PrimeNG (p-card, p-button, p-dialog, p-inputNumber, p-inputMask, p-inputText, p-messages)
- Do NOT use PrimeNG for new work
- When updating existing components, prefer migrating to Material if feasible
- Goal: Eventually remove PrimeNG dependency

**Angular Material examples in codebase**:
- Search for existing Material usage to see patterns
- Reference Material documentation: https://material.angular.io/components

**Why Material**: Better long-term support, more comprehensive component set, better accessibility, no breaking styling changes in updates

## Best Practices

### 1. Prefer Declarative Over Imperative

**Bad**: Setting messages imperatively in multiple places

**Good**: Compute messages from state machine

**Reference**: Compare the state machine pattern in `apps/enrollment-portal/src/app/donate-full.component.ts:450-476` with the processing logic in lines 516-546

### 2. Keep Components Focused

- One responsibility per component
- Extract complex logic to services/stores
- Use ComponentStore (NgRx) for complex component state

**Example**: `libs/angular/braintree-client/src/lib/components/payment-collector/payment-collector.store.ts`

### 3. Type Safety

Always type function call responses.

**Example**: `apps/enrollment-portal/src/app/donate-full.component.ts:517-521`

**Error typing example**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:91`

### 4. Avoid Over-Engineering

- Don't add features not explicitly requested
- Don't add error handling for impossible scenarios
- Trust internal code - only validate at system boundaries
- Three similar lines > premature abstraction
