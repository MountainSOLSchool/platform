# Firebase Patterns

This document describes Firebase integration patterns used in the Mountain SOL platform.

## Cloud Functions (v2)

### Function Structure

Cloud Functions are located in `/libs/firebase/enrollment-functions/*/src/lib/`.

**Example function**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts`

**Function Declaration Utility**: The codebase uses a custom `Functions.endpoint` builder instead of raw `onCall`.

**Utility location**: `libs/firebase/functions/src/lib/utilities/functions.utility.ts`

**Key patterns**:
- Use `Functions.endpoint` builder for function declaration
- Chain `.usingSecrets()` and `.usingStrings()` for configuration (lines 66-89)
- Add role restrictions with `.restrictedToRoles()` (lines 91-93)
- Complete with `.handle()` method (lines 95-138)
- Automatic CORS handling (lines 10-51, applied in handle method)
- Secrets and strings passed as parameters to handler (lines 102-103)
- Return consistent response shapes with `success` boolean

### Registering Functions

**Library export**: `libs/firebase/enrollment-functions/index.ts`

**App entry point**: `apps/functions/src/index.ts`

### Path Mapping

Add to `tsconfig.base.json` paths section.

**Example**: See existing entries like `"@sol/firebase/enrollment-functions/donate"`

## Firestore Patterns

### Repository Pattern

The codebase uses repository classes for Firestore access.

**Shared repository example**: `libs/firebase/payments/src/lib/payment.repository.ts`

**Methods**:
- `create()` - Add new document
- `get()` - Retrieve by ID
- `update()` - Update existing document

### Database Objects (DBOs)

Define TypeScript interfaces for Firestore documents.

**Shared DBO example**: `libs/ts/payments/domain/src/lib/payment.dbo.ts`

**Naming**: Use `Dbo` suffix (Database Object) for Firestore document interfaces.

**Location pattern**:
- Shared DBOs go in `libs/ts/*/domain/` (framework-agnostic)
- Function-specific DBOs can be in the function library

### Key Collections

**Classes**: Stored at `semesters/{semesterId}/classes/{classId}`
- Uses `ClassDbo` structure with snake_case fields
- Instructors stored as `DocumentReference` array to `teachers` collection

**Teachers**: Top-level `teachers` collection
- Fields: `first_name`, `last_name`, `archived` (optional)
- Referenced from classes via `DocumentReference` (not string IDs)

**Semesters**: Top-level `semesters` collection
- Fields: `displayName`
- Config at `config/activeSemester` specifies current semester

**Students**: Top-level `students` collection
- Referenced from classes via `DocumentReference` array

### Timestamp Handling

Always use server timestamps for consistency via `FieldValue.serverTimestamp()`.

**Pattern**: Create records with `Omit<DonationDbo, 'timestamp'>` then add timestamp in repository.

**Example**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:98-107`

## Email Integration

The codebase uses a Firebase extension (Firestore-triggered email) via a `mail` collection.

### Sending Transactional Emails

Emails are sent by writing to the `mail` collection. The `PaymentHandler` does this automatically.

**Handler email sending**: `libs/firebase/payments/src/lib/payment-handler.ts` (sendConfirmationEmail method)

**Required fields**:
- `to` - Recipient email
- `message.subject` - Email subject
- `message.from` - Sender (must be verified in SendGrid/Firebase)
- `message.html` - HTML version
- `message.text` - Plain text version

### Email Strategy Pattern

Email content is generated using the **Strategy Pattern** for flexibility.

**Strategy interface**: `libs/ts/payments/domain/src/lib/payment-email.strategy.ts`

**Implementations**:
- `ServicePaymentEmailStrategy` - No tax language (`libs/firebase/payments/src/lib/email-strategies/service-payment.email-strategy.ts`)
- `DonationEmailStrategy` - Includes 501(c)(3) info (`libs/firebase/payments/src/lib/email-strategies/donation.email-strategy.ts`)

**Best Practices**:
- Keep HTML simple (email clients have limited CSS support)
- Use inline styles in `<head>` (not inline on elements)
- Test across email clients
- Share common styles via `base-email.styles.ts`

### Email for Receipts

For donation/payment receipts, include:
- Organization name
- Tax ID (EIN) for 501(c)(3) organizations (donations only)
- Transaction details (amount, date, method)
- Purpose/invoice number (service payments)
- Contact information

**Reference**: See email strategy implementations in `libs/firebase/payments/src/lib/email-strategies/`

## Braintree Payment Integration

### Backend: Payment Token Generation

**Function**: See enrollment functions for payment token generation pattern

**Key logic**:
- Anonymous tokens for guest checkout
- Customer tokens with vault access for logged-in users
- Use `request.auth?.uid` for authenticated user ID

### Payment Processing Architecture

Payment processing uses a **Template Method** pattern with **Strategy** and **Factory** patterns.

**Template Method**: `libs/firebase/payments/src/lib/payment-handler.ts`
- Defines the processing skeleton: validate → create record → process → update → send email
- Concrete handlers implement `getFactory()` to provide type-specific behavior

**Factory Pattern**: Each payment type has a factory that provides:
- `validate(request)` - Type-specific validation
- `createPayment(request)` - Creates the PaymentDbo
- `getEmailStrategy()` - Returns the appropriate email strategy

**Factories**:
- `ServicePaymentFactory` (`libs/firebase/payments/src/lib/factories/service-payment.factory.ts`)
- `DonationFactory` (`libs/firebase/payments/src/lib/factories/donation.factory.ts`)

**Strategy Pattern**: Email generation varies by payment type
- `ServicePaymentEmailStrategy` - No tax language
- `DonationEmailStrategy` - Includes 501(c)(3) info

### Cloud Functions (Thin Wrappers)

Cloud Functions are thin wrappers that wire up handlers:

**Example**: `libs/firebase/enrollment-functions/payment/src/lib/payment.ts`

Pattern:
1. Create Braintree instance with secrets
2. Create appropriate handler
3. Call `handler.handle(request.body.data)`
4. Return result

### Error Handling

The `PaymentHandler` returns structured results:
- Success: `{ success: true, paymentId, transactionId, amount }`
- Failure: `{ success: false, errors, message }`

Braintree errors are extracted via `errors?.deepErrors()`

## Configuration Management

### Secrets

Secrets are stored in Firebase Secret Manager and accessed via `getSecrets()`.

**Usage**: Import from `@sol/firebase/config/server`

### Environment-Specific Strings

Non-sensitive configuration via `getStrings()`.

**Usage**: Import from `@sol/firebase/config/server`

## Function Deployment

### Environment Configuration

Functions use environment-specific configuration loaded at runtime.

**Pattern**: Call `getSecrets()` and `getStrings()` inside function handlers, not at module level

### CORS and Security

Cloud Functions v2 automatically handles CORS for callable functions (using `onCall`).

For HTTP functions (using `onRequest`), configure CORS manually.

## Database Security Rules

Located in `firestore.rules` at repository root.

**Pattern**:
- Define collections and their access rules
- Use `request.auth` to check authentication
- Use `request.auth.uid` to verify ownership

## Best Practices

### 1. Validate Input Early

**Example**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:71-77`

Return early with 400 status for invalid input.

### 2. Use Transactions for Related Writes

When updating multiple documents that must stay consistent, use Firestore transactions.

**Reference**: Look for existing transaction usage in enrollment functions

### 3. Error Logging

Always log errors for debugging with `console.error()`.

**Example**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:131-134`

### 4. Return Consistent Response Shapes

**Success**: `{ success: true, transactionId: string, message: string }`

**Failure**: `{ success: false, message: string }`

**Example**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:136-141, 161-163`

### 5. Keep Functions Focused

- One function = one responsibility
- Extract shared logic to utilities (`@sol/firebase/payments` for payment processing)
- Don't combine unrelated operations

### 6. Use Compositional Patterns

For related functionality with variations:
- **Factory Pattern** - Different validation/creation per type
- **Strategy Pattern** - Different behaviors (email content)
- **Template Method** - Shared processing flow with extension points

**Reference**: `libs/firebase/payments/` for payment processing patterns
