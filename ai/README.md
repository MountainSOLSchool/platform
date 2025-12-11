# AI Assistant Documentation

This directory contains documentation about the Mountain SOL platform codebase patterns, conventions, and workflows. These documents are designed to help AI assistants (and developers) understand the project structure and coding standards.

## Documents

### [Angular Patterns](./angular-patterns.md)
Patterns and best practices for Angular development in this codebase:
- Signal-based state management (signal, computed, linkedSignal)
- Converting observables to signals
- State machines for async operations
- Firebase Functions integration
- Form patterns and validation
- Component communication
- Declarative vs imperative code

**Reference implementation**: `apps/enrollment-portal/src/app/donate-full.component.ts`

### [Firebase Patterns](./firebase-patterns.md)
Firebase integration patterns including Cloud Functions, Firestore, and email:
- Cloud Functions v2 structure
- Firestore repository pattern
- Database objects (DBOs)
- Email integration via mail collection
- Braintree payment integration
- Configuration management
- Security rules

**Reference implementation**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts`

### [Codebase Structure](./codebase-structure.md)
Overview of the monorepo architecture and organization:
- Nx monorepo structure
- Application and library organization
- Import paths and path mappings
- Dependency graph
- File naming conventions
- Build process

**Key files**:
- `tsconfig.base.json` - Path mappings
- `nx.json` - Nx configuration
- `project.json` files - Project configuration

### [Payment Processing](./payment-processing.md)
Comprehensive guide to Braintree payment integration:
- Payment architecture (3-layer system)
- Payment Collector component usage
- Frontend state management
- Backend processing
- Payment vault for saved methods
- Error handling
- Security best practices

**Key files**:
- `libs/angular/braintree-client/src/lib/components/payment-collector/`
- `libs/angular/braintree-client/src/lib/services/payment.service.ts`

### [Development Workflow](./development-workflow.md)
Day-to-day development practices and tooling:
- Local development setup
- Running dev servers and emulators
- Code quality tools (linting, formatting)
- Testing and building
- Git workflow and commit messages
- Deployment process
- Troubleshooting common issues

## Quick Reference

### Common Patterns

**Signal-based state**:
- Mutable: `signal<T>(initialValue)`
- Derived: `computed(() => expression)`
- Linked: `linkedSignal(() => defaultValue)`

**Reference**: `apps/enrollment-portal/src/app/donate-full.component.ts:439-447`

**State machine for async operations**:
- Use discriminated union types
- Derive UI state from single source

**Reference**: `apps/enrollment-portal/src/app/donate-full.component.ts:450-476`

**Firebase function calls**:
- Use `RequestedOperatorsUtility.ignoreAllStatesButLoaded()`
- Handle only loaded state in subscription

**Reference**: `apps/enrollment-portal/src/app/donate-full.component.ts:516-546`

**Conditional rendering with signals**:
- Return `undefined` when loading
- Wait for defined state before rendering components with inputs

**Reference**: `apps/enrollment-portal/src/app/donate-full.component.ts:440-443, 185-198`

### Import Paths

All library imports use `@sol/` prefix:

```typescript
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { UserService } from '@sol/auth/user';
import { PaymentCollectorComponent } from '@sol/payments/braintree-client';
```

**Defined in**: `tsconfig.base.json`

### File Locations

```
apps/
  enrollment-portal/          # Main Angular app
  functions/                  # Firebase Functions entry

libs/
  angular/
    classes/                  # Class enrollment
    braintree-client/         # Payment UI
    auth/                     # Authentication
    request/                  # HTTP utilities
  firebase/
    enrollment-functions/     # Cloud Functions
    functions-api/            # Functions client
    config/                   # Configuration
```

### Key Commands

```bash
# Development
nx serve enrollment-portal
firebase emulators:start

# Testing
nx affected:test

# Building
nx affected:build

# Deployment (automated via GitHub Actions)
git push origin main  # Triggers deployment
```

## Coding Principles

1. **Declarative over imperative** - Use computed signals, not manual state updates
2. **Keep it simple** - Don't over-engineer or add unnecessary features
3. **Type safety** - Always type function responses and avoid `any`
4. **Match existing patterns** - Follow the patterns in similar features
5. **No premature abstraction** - Three similar lines > unnecessary abstraction
6. **Reference file paths** - Point to actual code rather than duplicating examples

## For AI Assistants

When working on this codebase:

1. **Read relevant docs first** - Check these documents before making changes
2. **Reference actual files** - Use file paths with line numbers instead of code snippets
3. **Match existing patterns** - Look at referenced implementations
4. **Use signals declaratively** - Prefer computed/linkedSignal over manual updates
5. **Wait for defined state** - Don't render components until state is ready
6. **Use provided utilities** - RequestedOperatorsUtility, toSignal, etc.
7. **Keep components focused** - One responsibility per component
8. **Validate server-side** - All business logic in Cloud Functions
9. **Type everything** - No `any` types, proper error typing

## Documentation Style

These documents use **file path references with line numbers** instead of code examples to:
- Prevent documentation from becoming outdated
- Ensure accuracy by referencing actual implementation
- Keep documentation concise
- Point to single source of truth

**Format**: `path/to/file.ts:line-numbers` or `path/to/file.ts:line-number` (description)

## Updates

These documents should be updated when:
- New patterns are established
- Architecture changes
- New libraries are added
- Deployment process changes

To update, modify the relevant markdown file in this directory.

## Questions?

If these docs don't answer your question:
- Look at referenced file paths for actual implementation
- Check similar features in the codebase
- Review git history for context on decisions
