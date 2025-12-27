# Payment Processing

This document describes payment processing patterns using Braintree in the Mountain SOL platform.

## Architecture Overview

The payment system has four layers:

1. **Domain Types**: Shared TypeScript interfaces (`@sol/payments/domain`)
2. **Frontend**: Braintree Drop-in UI component (`@sol/payments/braintree-client`)
3. **Backend Processing**: Shared handlers, factories, and strategies (`@sol/firebase/payments`)
4. **Cloud Functions**: Thin function wrappers (`@sol/firebase/enrollment-functions/payment`, `donate`)

**Key Libraries**:
- `libs/ts/payments/domain/` - Domain types (PaymentDbo, factories, strategies)
- `libs/angular/braintree-client/` - Frontend payment collection
- `libs/firebase/payments/` - Backend processing (handlers, repositories, email strategies)
- `libs/firebase/enrollment-functions/payment/` - Service payment Cloud Function
- `libs/firebase/enrollment-functions/donate/` - Donation Cloud Function

## Compositional Architecture

The payment system uses **Strategy**, **Factory**, and **Template Method** patterns for flexibility.

### Pattern Overview

```
Cloud Function (thin wrapper)
    └── PaymentHandler<TRequest> (template method)
            ├── getFactory() → PaymentFactory<TRequest>
            │       ├── validate(request)
            │       ├── createPayment(request) → PaymentDbo
            │       └── getEmailStrategy() → PaymentEmailStrategy
            ├── processTransaction() (shared Braintree logic)
            └── sendConfirmationEmail() (uses strategy)
```

### Domain Types (`@sol/payments/domain`)

**Location**: `libs/ts/payments/domain/src/lib/`

**Key interfaces**:
- `PaymentDbo` - Base payment database object (`payment.dbo.ts`)
- `PaymentFactory<TRequest>` - Factory interface (`payment.factory.ts`)
- `PaymentEmailStrategy` - Email generation strategy (`payment-email.strategy.ts`)
- `ServicePaymentRequest`, `DonationRequest` - Request types (`payment-request.ts`)
- `PaymentResult` - Success/failure result type (`payment-result.ts`)

### Backend Handlers (`@sol/firebase/payments`)

**Location**: `libs/firebase/payments/src/lib/`

**Payment Handler** (Template Method): `payment-handler.ts`
- Abstract `handle()` method defines the processing skeleton
- Concrete handlers implement `getFactory()` to provide type-specific behavior

**Factories**:
- `ServicePaymentFactory` - For service payments (`factories/service-payment.factory.ts`)
- `DonationFactory` - For donations (`factories/donation.factory.ts`)

**Email Strategies**:
- `ServicePaymentEmailStrategy` - No tax language (`email-strategies/service-payment.email-strategy.ts`)
- `DonationEmailStrategy` - Includes 501(c)(3) info (`email-strategies/donation.email-strategy.ts`)

**Repository**: `PaymentRepository` - CRUD for `payments` collection (`payment.repository.ts`)

### Adding New Payment Types

To add a new payment type (e.g., event registration):

1. Add request type to `@sol/payments/domain` (`libs/ts/payments/domain/src/lib/payment-request.ts`)
2. Create factory in `@sol/firebase/payments` (`libs/firebase/payments/src/lib/factories/`)
3. Create email strategy if different from existing (`libs/firebase/payments/src/lib/email-strategies/`)
4. Create handler extending `PaymentHandler` (`libs/firebase/payments/src/lib/handlers/`)
5. Create Cloud Function in `libs/firebase/enrollment-functions/[name]/`
6. Export from `apps/functions/src/functions/index.ts`

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

**Pattern**: `apps/enrollment-portal/src/app/payment.component.ts:184-197`

**Key Points**:
- `anonymous="false"` enables Braintree Vault (saved payment methods)
- Only render when user state is known (not `undefined`)
- The `anonymous` input is read only in `ngOnInit()` (payment-collector.component.ts:56-62), so component must initialize with correct value

#### For Anonymous Users

Set `[anonymous]="true"` on the payment collector component.

### Capturing Payment Data

**Handler example**: `apps/enrollment-portal/src/app/payment.component.ts:485-493`

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

Payment processing now uses the shared `PaymentHandler` infrastructure.

**Example Cloud Function**: `libs/firebase/enrollment-functions/payment/src/lib/payment.ts`

The Cloud Function is a thin wrapper:
1. Create Braintree instance with secrets
2. Create handler (e.g., `ServicePaymentHandler`)
3. Call `handler.handle(request)`
4. Return result

**Don't derive payment type from nonce inspection** - Get it from the Braintree Drop-in on the frontend.

## Payment Types

### Service Payments

**Route**: `/make-payment`
**Component**: `apps/enrollment-portal/src/app/payment.component.ts`
**Cloud Function**: `payment`
**Collection**: `payments`

**Required fields**: name, email, address, purpose, amount, payment method
**Optional fields**: invoice number

### Donations

**Route**: `/make-donation`
**Component**: `apps/enrollment-portal/src/app/donate-full.component.ts`
**Cloud Function**: `donate`
**Collection**: `payments` (with `paymentType: 'donation'`)

**Required fields**: name, email, amount, payment method
**Optional fields**: address, referral source

### Platform Detection

Some payment methods have platform restrictions.

**iOS detection**: `apps/enrollment-portal/src/app/payment.component.ts:578-580`

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

**Pattern**: `apps/enrollment-portal/src/app/payment.component.ts:441-444`

### Backend Errors

The `PaymentHandler` returns structured results:
- Success: `{ success: true, paymentId, transactionId, amount }`
- Failure: `{ success: false, errors, message }`

**Common Braintree error types**:
- "Insufficient funds"
- "Credit card declined"
- "Invalid payment method nonce"
- "Gateway rejected: fraud"

### Network Errors

The `FirebaseFunctionsService` handles network errors.

**Usage with operator**: `apps/enrollment-portal/src/app/payment.component.ts:524`

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

All payment validation happens in Cloud Functions via factory `validate()` method.

**Example**: `libs/firebase/payments/src/lib/factories/service-payment.factory.ts`

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

**Pattern**: `apps/enrollment-portal/src/app/payment.component.ts:184`

### 3. Token Caching

The PaymentService uses observables with automatic caching - tokens aren't re-requested unnecessarily.

## Common Patterns

### Service Payment Flow

**Complete flow**: `apps/enrollment-portal/src/app/payment.component.ts:495-556`

**Key elements**:
- Extract payment method data (line 496)
- Guard check (line 497)
- Set processing state (lines 499-500)
- Call function with payment data (lines 508-523)
- Filter loading state (line 524)
- Update result based on success (lines 525-541)

### Donation Flow

Uses same patterns via `DonationHandler` and `DonationFactory`.

**Reference**: `apps/enrollment-portal/src/app/donate-full.component.ts`

### Enrollment Payment Flow

Similar pattern but stores payment method for later capture.

**Reference**: See enrollment workflow components for payment storage pattern
