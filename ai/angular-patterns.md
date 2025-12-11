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

### Pattern: Using RequestedOperatorsUtility

Firebase function calls emit a loading state followed by either data or error.

**Service implementation**: `libs/firebase/functions-api/src/lib/services/functions.service.ts:16-26`

**Key points**:
- `.call()` returns `Observable<Requested<T>>` which emits `Loading` (line 24), then data or `Error` (line 23)
- Use `RequestedOperatorsUtility.ignoreAllStatesButLoaded()` to filter out loading/error states
- Don't use separate `next` and `error` handlers - errors are converted to `RequestState.Error` by the service

**Operator implementation**: `libs/angular/request/src/lib/utilities/requested-operators.utility.ts:6-8`

**Usage example**: `apps/enrollment-portal/src/app/donate-full.component.ts:516-546`

### Alternative: callFn for Simple Cases

**Service implementation**: `libs/firebase/functions-api/src/lib/services/functions.service.ts:28-32`

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
