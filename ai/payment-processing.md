# Payment Processing

This document describes payment processing patterns using Braintree in the Mountain SOL platform.

## Architecture Overview

The payment system has three layers:

1. **Frontend**: Braintree Drop-in UI component
2. **Component Store**: State management for payment flow
3. **Backend**: Cloud Functions for payment processing

**Key Components**:
- `libs/angular/braintree-client/src/lib/components/payment-collector/payment-collector.component.ts`
- `libs/angular/braintree-client/src/lib/components/payment-collector/payment-collector.store.ts`
- `libs/angular/braintree-client/src/lib/services/payment.service.ts`

## Frontend Integration

### Payment Collector Component

The `PaymentCollectorComponent` wraps Braintree's Drop-in UI.

**Component definition**: `libs/angular/braintree-client/src/lib/components/payment-collector/payment-collector.component.ts:32-63`

**Key inputs**:
- `anonymous` (line 39) - Controls vault access
- `paymentMethods` (line 40) - Array of allowed payment types

**Output**: `paymentMethod` observable (lines 42-50) emitting payment data including `type` field

### Usage Patterns

#### For Logged-In Users (with Vault)

Wait for user state before rendering to ensure correct initialization.

**Pattern**: `apps/enrollment-portal/src/app/donate-full.component.ts:440-443, 185-198`

**Key Points**:
- `anonymous="false"` enables Braintree Vault (saved payment methods)
- Only render when user state is known (not `undefined`)
- The `anonymous` input is read only in `ngOnInit()` (payment-collector.component.ts:56-62), so component must initialize with correct value

#### For Anonymous Users

Set `[anonymous]="true"` on the payment collector component.

### Capturing Payment Data

**Handler example**: `apps/enrollment-portal/src/app/donate-full.component.ts:497-499`

The `type` field indicates payment method:
- `'CreditCard'` - Credit/debit card
- `'VenmoAccount'` - Venmo
- `'PayPalAccount'` - PayPal

**Type captured from Braintree**: `libs/angular/braintree-client/src/lib/components/payment-collector/payment-collector.store.ts:67`

## Payment Collector Store

The `PaymentCollectorStore` manages Braintree Drop-in state using NgRx ComponentStore.

**Store file**: `libs/angular/braintree-client/src/lib/components/payment-collector/payment-collector.store.ts`

### Initialization Flow

**Initialize effect**: Lines 105-208

**Key steps**:
1. Load token (lines 126)
2. Wait for token (lines 128-130)
3. Create Braintree client and data collector (lines 132-150)
4. Configure Drop-in options (lines 152-158)
5. Enable vault for logged-in users (lines 160-162)
6. Configure Venmo if requested (lines 164-174)
7. Create Drop-in instance (lines 176-202)

### Token Loading

**loadToken$ effect**: Lines 78-103

**Key logic**:
- Line 90: Store anonymous state
- Line 93: Call payment service to get token
- Payment service filters on user state (lines 13-14 in payment.service.ts)

**Payment Service**: `libs/angular/braintree-client/src/lib/services/payment.service.ts:12-21`

**Important**: When `anonymous=false`, the observable waits for a logged-in user before requesting a token (line 14).

### Capturing Payment Method

**prepare effect**: Lines 54-76

**Key action**: Line 67 captures `paymentMethod.type` from Braintree's `requestPaymentMethod()`

### Output Observable

**selectPaymentMethod**: Lines 223-244

Emits `undefined` until all required data is available (nonce, deviceData, paymentDetails, type).

## Backend Processing

### Payment Token Generation

**Pattern**: See enrollment functions for payment token generation

**Key logic**:
- Anonymous tokens for guest checkout
- Customer-specific tokens with vault access for logged-in users
- Use `request.auth?.uid` for authenticated user ID

### Payment Processing

**Example function**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts`

**Key pattern** (lines 89-125):
- Receive `paymentMethodType` from frontend (line 68)
- Determine payment method via type check (lines 92-94)
- Route to appropriate Braintree method using ternary (lines 110-125)

**Don't derive payment type from nonce inspection** - Get it from the Braintree Drop-in on the frontend.

## Payment Methods

### Credit Card

**Backend processing**: See donate.ts lines 113-125 (card path of ternary)

**Features**:
- Fraud detection via device data
- Customer vault support
- Automatic receipt email

### Venmo

**Backend processing**: See donate.ts lines 110-125 (venmo path of ternary)

**Features**:
- Mobile-optimized flow
- Custom fields for transaction metadata (line 115)
- Venmo-specific validation

### Platform Detection

Some payment methods have platform restrictions.

**iOS detection**: `apps/enrollment-portal/src/app/donate-full.component.ts:585-587`

**Usage in template**: Lines 176-183

Venmo on iOS requires Safari due to browser restrictions.

## Braintree Vault

The vault stores payment methods for reuse by logged-in users.

### Enabling Vault

When generating a customer token, pass user ID to Braintree service.

When creating Drop-in with customer token:

**Vault configuration**: `libs/angular/braintree-client/src/lib/components/payment-collector/payment-collector.store.ts:160-162`

### Vault Flow

1. User logs in
2. Frontend requests token with `anonymous: false`
3. Backend generates customer-linked token
4. Drop-in initializes with `vaultManager: true`
5. User sees saved payment methods
6. User can add new methods or use saved ones

## Error Handling

### Frontend Errors

Display user-friendly messages using computed signals.

**Pattern**: `apps/enrollment-portal/src/app/donate-full.component.ts:458-470`

### Backend Errors

**Error type**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:91`

**Usage**: Check `errors?.deepErrors()` for error messages

**Common Braintree error types**:
- "Insufficient funds"
- "Credit card declined"
- "Invalid payment method nonce"
- "Gateway rejected: fraud"

### Network Errors

The `FirebaseFunctionsService` handles network errors.

**Service implementation**: `libs/firebase/functions-api/src/lib/services/functions.service.ts:16-26`

**Usage with operator**: `apps/enrollment-portal/src/app/donate-full.component.ts:531`

Network errors are filtered out by `ignoreAllStatesButLoaded()` operator.

## Testing Payments

### Braintree Sandbox

Use test credit card numbers in sandbox:

- **Success**: `4111 1111 1111 1111`
- **Declined**: `4000 0000 0000 0002`
- **Fraud**: `4000 0000 0000 0259`

Any future expiration date and any CVV work in sandbox.

### Test Venmo

Braintree sandbox provides test Venmo accounts.

## Security Best Practices

### 1. Never Store Card Data

Only handle payment nonces (one-time tokens), never raw card numbers.

### 2. Use Device Data

Always collect and send device data for fraud detection.

**Collection**: `libs/angular/braintree-client/src/lib/components/payment-collector/payment-collector.store.ts:137-148`

### 3. Validate Server-Side

All payment validation happens in Cloud Functions, not frontend.

**Example**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:71-77`

### 4. Use HTTPS

All payment operations require HTTPS. Firebase Hosting enforces this automatically.

### 5. PCI Compliance

By using Braintree Drop-in:
- Card data never touches your servers
- PCI compliance simplified
- Braintree handles tokenization

## Performance Optimization

### 1. Lazy Load Braintree SDK

The Drop-in UI loads Braintree SDK automatically. Don't include it in main bundle.

### 2. Conditional Rendering

Only render payment collector when needed.

**Pattern**: `apps/enrollment-portal/src/app/donate-full.component.ts:185`

### 3. Token Caching

The PaymentService uses observables with automatic caching - tokens aren't re-requested unnecessarily.

## Common Patterns

### Donation Flow

**Complete flow**: `apps/enrollment-portal/src/app/donate-full.component.ts:501-546`

**Key elements**:
- Set processing state (line 505)
- Call function with payment data (lines 516-530)
- Filter loading state (line 531)
- Update result based on success (lines 534-545)

### Enrollment Payment Flow

Similar pattern but stores payment method for later capture.

**Reference**: See enrollment workflow components for payment storage pattern
