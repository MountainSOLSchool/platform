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

**Example**: `libs/firebase/enrollment-functions/donate-venmo/src/lib/donation.repository.ts`

**Methods**:
- `create()` - Add new document
- `get()` - Retrieve by ID
- `update()` - Update existing document

### Database Objects (DBOs)

Define TypeScript interfaces for Firestore documents.

**Example**: `libs/firebase/enrollment-functions/donate-venmo/src/lib/donate-venmo.ts:9-20`

**Naming**: Use `Dbo` suffix (Database Object) for Firestore document interfaces.

### Timestamp Handling

Always use server timestamps for consistency via `FieldValue.serverTimestamp()`.

**Pattern**: Create records with `Omit<DonationDbo, 'timestamp'>` then add timestamp in repository.

**Example**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:98-107`

## Email Integration

The codebase uses a Firebase extension (Firestore-triggered email) via a `mail` collection.

### Sending Transactional Emails

**Example**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:143-155`

**Required fields**:
- `to` - Recipient email
- `message.subject` - Email subject
- `message.from` - Sender (must be verified in SendGrid/Firebase)
- `message.html` - HTML version
- `message.text` - Plain text version

### Email Content Generation

Always provide both HTML and plain text versions.

**Example**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:157-280` (generateDonationEmailContent function)

**Best Practices**:
- Keep HTML simple (email clients have limited CSS support)
- Use inline styles in `<head>` (not inline on elements)
- Test across email clients

### Email for Receipts

For donation/payment receipts, include:
- Organization name
- Tax ID (EIN) for 501(c)(3) organizations
- Transaction details (amount, date, method)
- "No goods or services were provided" statement (if applicable)
- Contact information

**Reference**: See donation email template structure in donate.ts lines 157-280

## Braintree Payment Integration

### Backend: Payment Token Generation

**Function**: See enrollment functions for payment token generation pattern

**Key logic**:
- Anonymous tokens for guest checkout
- Customer tokens with vault access for logged-in users
- Use `request.auth?.uid` for authenticated user ID

### Payment Processing Patterns

**Determine payment method from frontend** - Don't inspect nonce.

**Example**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:89-125`

**Key pattern** (lines 92-94):
- Braintree returns payment types like 'VenmoAccount', 'CreditCard', 'PayPalAccount'
- Use ternary to route to correct payment method
- Frontend sends `paymentMethodType` from Braintree Drop-in

### Error Handling

Braintree errors have a specific structure.

**Type definition**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:91`

**Usage**: Check `errors?.deepErrors()` for error messages

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
- Extract shared logic to utilities
- Don't combine unrelated operations

### 6. Comment Business Rules

Add comments explaining non-obvious limits and requirements.

**Example**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts:71` ($250 limit explanation)
