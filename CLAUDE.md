# AI Assistant Documentation

This directory contains documentation about the Mountain SOL platform codebase patterns, conventions, and workflows. These documents are designed to help AI assistants (and developers) understand the project structure and coding standards.

## GitHub Codespaces / Mobile Development

This repository is configured for GitHub Codespaces, enabling development from any device including mobile.

**Setup**: `.devcontainer/devcontainer.json`

**What's pre-configured**:
- Node 22 with npm
- Firebase CLI, GitHub CLI, and ngrok installed globally
- SSH server for terminal access from mobile apps (Termius)
- Port forwarding for all dev servers and emulators
- VS Code extensions for Angular, React, Firebase, and NX

**Quick Start in Codespaces**:
```bash
# Dependencies are auto-installed via postCreateCommand
# Start the Angular enrollment portal
npx nx run enrollment-portal:serve:development

# Or start the Next.js student portal
npx nx run student-portal:serve:development

# Or start Firebase emulators
firebase emulators:start
```

**Forwarded Ports**:
- 4200: Angular enrollment-portal
- 4201: Next.js student-portal
- 4000: Firebase Emulator UI
- 5001: Firebase Functions
- 8080: Firestore
- 9099: Auth

### Codespaces Secrets (Recommended)

For automatic setup, add these secrets to your repo:
**Repo → Settings → Secrets and variables → Codespaces**

| Secret | Description | How to Get |
|--------|-------------|------------|
| `GOOGLE_APPLICATION_CREDENTIALS_JSON` | Firebase service account (base64) | See below |
| `NGROK_AUTHTOKEN` | ngrok tunnel auth | https://dashboard.ngrok.com |
| `SSH_PASSWORD` | Termius login password | Choose any password |

**Firebase service account setup:**
1. Firebase Console → Project Settings → Service accounts → Generate new private key
2. Base64 encode: `base64 -i ~/Downloads/your-key.json | pbcopy`
3. Paste as secret value

With secrets configured, the init script runs automatically on container start.

### Mobile SSH Access (Termius)

To connect from Termius or other SSH clients on mobile:

**Start SSH tunnel**:
```bash
ngrok tcp 2222
```

This displays connection details (host, port) to enter in Termius. Username is `node`.

## Documents

### [Angular Patterns](./ai/angular-patterns.md)
Patterns and best practices for Angular development in this codebase:
- Signal-based state management (signal, computed, linkedSignal)
- Converting observables to signals
- State machines for async operations
- Firebase Functions integration
- Form patterns and validation
- Component communication
- Declarative vs imperative code

**Reference implementation**: `apps/enrollment-portal/src/app/donate-full.component.ts`

### [Firebase Patterns](./ai/firebase-patterns.md)
Firebase integration patterns including Cloud Functions, Firestore, and email:
- Cloud Functions v2 structure
- Firestore repository pattern
- Database objects (DBOs)
- Email integration via mail collection
- Braintree payment integration
- Configuration management
- Security rules

**Reference implementation**: `libs/firebase/enrollment-functions/donate/src/lib/donate.ts`

### [Codebase Structure](./ai/codebase-structure.md)
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

### [Payment Processing](./ai/payment-processing.md)
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

### [Development Workflow](./ai/development-workflow.md)
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
  enrollment-portal/          # Angular app (localhost:4200)
  student-portal/             # Next.js app (localhost:4201)
  functions/                  # Firebase Functions entry

libs/
  angular/                    # Angular-specific libraries
    classes/                  # Class enrollment
    braintree-client/         # Payment UI
    auth/                     # Authentication
    request/                  # HTTP utilities
  react/                      # React-specific libraries
    auth/                     # React auth hooks
    request/                  # React request utilities
  firebase/
    enrollment-functions/     # Cloud Functions
    functions-api/            # Functions client
    config/                   # Configuration
  ts/                         # Framework-agnostic TypeScript
    payments/domain/          # Shared payment types
    student/domain/           # Shared student types
```

### Key Commands

```bash
# Development - Frontend Apps
npx nx run enrollment-portal:serve:development  # Angular → localhost:4200
npx nx run student-portal:serve:development     # Next.js → localhost:4201

# Development - Firebase
npx nx run functions:serve:development          # Functions only
firebase emulators:start                        # All emulators

# Testing
npx nx affected:test

# Building
npx nx affected:build

# Linting
npx nx affected:lint
npx nx lint --fix

# Dependency Graph
npx nx graph

# Deployment (automated via GitHub Actions)
git push origin main  # Triggers deployment
```

### Firebase Emulator Ports

| Service   | Port | URL                    |
|-----------|------|------------------------|
| Functions | 5001 | http://localhost:5001  |
| Firestore | 8080 | http://localhost:8080  |
| Auth      | 9099 | http://localhost:9099  |
| UI        | 4000 | http://localhost:4000  |

## Coding Principles

1. **Declarative over imperative** - Use computed signals, not manual state updates
2. **Keep it simple** - Don't over-engineer or add unnecessary features
3. **Type safety** - Always type function responses and avoid `any`
4. **Match existing patterns** - Follow the patterns in similar features
5. **No premature abstraction** - Three similar lines > unnecessary abstraction
6. **Reference file paths** - Point to actual code rather than duplicating examples
7. **Use Angular Material** - For all new components and updates, use Angular Material (not PrimeNG)
8. **Minimal comments** - Code should be self-documenting through clear names and structure. Comment "why", not "what". Don't annotate obvious operations.

## For AI Assistants

### Working with This Codebase

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
10. **Use Angular Material only** - Do NOT use PrimeNG for new components or updates

### Maintaining This Documentation

**IMPORTANT**: When making changes to the codebase, you must update these AI documentation files to keep them accurate.

#### When to Update Documentation

Update the relevant `/ai/*.md` files when you:

1. **Establish new patterns** that should be followed in future work
   - New state management patterns
   - New component communication patterns
   - New API integration patterns

2. **Add new architectural components**
   - New libraries or major features
   - New services or utilities
   - New deployment workflows

3. **Change existing patterns** that are documented
   - Refactor a pattern that's referenced in the docs
   - Update a utility or service that's documented
   - Change file locations of referenced files

4. **Discover undocumented patterns** while reading the codebase
   - Find a pattern used consistently but not documented
   - Identify a best practice that should be captured

#### How to Update Documentation

1. **Update file path references** if files move or line numbers change significantly
   - Use ranges for logical blocks (e.g., `:50-75`)
   - Use single lines for specific examples (e.g., `:42`)

2. **Add new sections** for new patterns
   - Keep descriptions concise
   - Reference actual implementation files
   - Explain the "why" not just the "what"

3. **Remove outdated information** if patterns are deprecated
   - Don't leave old patterns that are no longer used
   - Update or remove file references that no longer exist

4. **Maintain consistency** across all docs
   - Use the same referencing style (file paths with line numbers)
   - Keep the same structure (overview → details → examples → best practices)
   - Cross-reference related docs when appropriate

#### Which File to Update

- **`angular-patterns.md`** - Angular-specific patterns (signals, components, forms, RxJS)
- **`firebase-patterns.md`** - Firebase integration (functions, Firestore, email, Braintree backend)
- **`codebase-structure.md`** - Repository structure, organization, file locations, imports
- **`payment-processing.md`** - Payment flows, Braintree integration, vault, security
- **`development-workflow.md`** - Dev setup, testing, building, deployment, git workflow
- **`README.md`** - Overview and quick reference (this file)

#### Example Update Workflow

```
User asks: "Add caching to the payment token service"

Your workflow:
1. Implement the caching feature
2. After implementation, check: Is this a new pattern worth documenting?
3. If yes, update `payment-processing.md`:
   - Add section on token caching
   - Reference the implementation file and line numbers
   - Explain when/why to use caching
4. Update `README.md` quick reference if it's a common pattern
5. Mention in your response: "Updated /ai/payment-processing.md to document the new token caching pattern"
```

#### Verification Checklist

Before finishing a task that involves pattern changes:

- [ ] Did I introduce a new pattern that others should follow?
- [ ] Did I change a file that's referenced in the docs?
- [ ] Did I move or rename files mentioned in the docs?
- [ ] Are the line number references still accurate?
- [ ] Should this pattern be added to the quick reference?

**Remember**: These docs are the primary way future AI assistants (and developers) will understand the codebase. Keep them accurate and up-to-date!

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
