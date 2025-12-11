# Codebase Structure

This document describes the architecture and organization of the Mountain SOL platform monorepo.

## Monorepo Overview

The codebase uses **Nx** for monorepo management with the following structure:

```
platform/
├── apps/                      # Application projects
│   ├── enrollment-portal/     # Main Angular app
│   └── functions/             # Firebase Functions entry point
├── libs/                      # Shared libraries
│   ├── angular/               # Angular-specific libraries
│   ├── firebase/              # Firebase utilities and functions
│   └── react/                 # React components (if any)
├── public/                    # Static assets
├── ai/                        # AI assistant documentation
└── [config files]
```

## Applications (`/apps`)

### enrollment-portal

The main Angular application for student enrollment and donation management.

**Key directories**:
```
apps/enrollment-portal/
├── src/
│   ├── app/
│   │   ├── donate-full.component.ts    # Donation page
│   │   ├── dashboard-component/         # User dashboard
│   │   └── tshirts-component/           # T-shirt orders
│   ├── assets/
│   └── environments/
└── project.json
```

### functions

Entry point for Firebase Cloud Functions. Imports and exports functions from libraries.

```typescript
// apps/functions/src/index.ts
import * as enrollmentFunctions from '@sol/firebase/enrollment-functions';

export const donate = enrollmentFunctions.donate;
export const paymentToken = enrollmentFunctions.paymentToken;
```

## Libraries (`/libs`)

### Angular Libraries (`/libs/angular`)

Organized by feature/domain:

#### `/libs/angular/classes/`
Class enrollment workflow components:
- `class-enrollment/` - Enrollment flow
- `class-list/` - Class browsing
- `class-calendar/` - Calendar views

#### `/libs/angular/braintree-client/`
Braintree payment integration:
- `components/payment-collector/` - Drop-in UI wrapper
- `services/payment.service.ts` - Token management

#### `/libs/angular/auth/`
Authentication services:
- `user/` - User service and authentication state

#### `/libs/angular/admin/`
Admin-only features:
- `students/` - Student management
- `enrollments/` - Enrollment management
- `class-printouts/` - Printable class forms

#### `/libs/angular/request/`
HTTP request utilities:
- `requested.type.ts` - Requested<T> type for async states
- `requested-operators.utility.ts` - RxJS operators for Requested<T>
- `requested.utility.ts` - Type guards and helpers

### Firebase Libraries (`/libs/firebase`)

#### `/libs/firebase/enrollment-functions/`
Cloud Functions organized by feature:

```
enrollment-functions/
├── donate/
│   └── src/lib/donate.ts
├── payment-token/
│   └── src/lib/payment-token.ts
├── enroll/
└── index.ts                  # Exports all functions
```

Each function is a separate library with its own `project.json`.

#### `/libs/firebase/config/`
Configuration management:
- `server/` - Server-side config (secrets, environment)
- `client/` - Client-side config

#### `/libs/firebase/functions-api/`
Angular service for calling Cloud Functions:
- `services/functions.service.ts` - FirebaseFunctionsService

### Shared Utilities (`/libs/`)

#### `/libs/form/validity/`
Form validation components and utilities.

## Import Paths

The monorepo uses path mapping in `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@sol/angular/request": ["libs/angular/request/src/index.ts"],
      "@sol/firebase/functions-api": ["libs/firebase/functions-api/src/index.ts"],
      "@sol/payments/braintree-client": ["libs/angular/braintree-client/src/index.ts"],
      "@sol/firebase/enrollment-functions": ["libs/firebase/enrollment-functions/src/index.ts"],
      "@sol/firebase/enrollment-functions/donate": [
        "libs/firebase/enrollment-functions/donate/src/index.ts"
      ]
    }
  }
}
```

**Pattern**: All library imports use `@sol/` prefix.

## Nx Project Configuration

Each library has a `project.json` defining:
- Build targets
- Test configuration
- Dependencies

Example:

```json
{
  "name": "firebase-enrollment-functions-donate",
  "sourceRoot": "libs/firebase/enrollment-functions/donate/src",
  "projectType": "library",
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/libs/firebase/enrollment-functions/donate",
        "tsConfig": "libs/firebase/enrollment-functions/donate/tsconfig.lib.json",
        "packageJson": "libs/firebase/enrollment-functions/donate/package.json",
        "main": "libs/firebase/enrollment-functions/donate/src/index.ts"
      }
    }
  },
  "tags": ["type:firebase-function"]
}
```

## Dependency Graph

```
enrollment-portal (app)
  ↓
├─→ @sol/angular/classes/class-enrollment
│     ↓
│   └─→ @sol/payments/braintree-client
│         ↓
│       └─→ @sol/firebase/functions-api
│
├─→ @sol/angular/auth/user
│     ↓
│   └─→ @sol/firebase/functions-api
│
└─→ @sol/angular/request


functions (app)
  ↓
└─→ @sol/firebase/enrollment-functions
      ↓
    ├─→ @sol/firebase/config/server
    └─→ @sol/firebase/functions (utilities)
```

## Build Process

### Development

```bash
# Serve enrollment portal
nx serve enrollment-portal

# Run Firebase emulators
firebase emulators:start
```

### Production

```bash
# Build all affected projects
nx affected:build

# Deploy functions
firebase deploy --only functions

# Deploy hosting
firebase deploy --only hosting
```

## File Naming Conventions

### Components

```
feature-name.component.ts
feature-name.component.html
feature-name.component.scss
feature-name.component.spec.ts
```

### Services

```
service-name.service.ts
service-name.service.spec.ts
```

### Stores (NgRx ComponentStore)

```
feature-name.store.ts
```

### Database Objects

```
entity-name.dbo.ts
```

### Repositories

```
entity-name.repository.ts
```

## Module Organization

### Standalone Components

The codebase uses Angular standalone components (no NgModules):

```typescript
@Component({
    selector: 'sol-donate-full',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        PaymentCollectorComponent,
        ButtonModule,
        // ... other imports
    ],
    templateUrl: './donate-full.component.html',
})
export class DonateFullComponent { }
```

### Routing

Routes defined in `app-routes.ts`:

```typescript
export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('./dashboard-component/dashboard.component').then(
                (m) => m.DashboardComponent
            ),
    },
    {
        path: 'donate',
        loadComponent: () =>
            import('./donate-full.component').then(
                (m) => m.DonateFullComponent
            ),
    },
];
```

**Pattern**: Use lazy loading with `loadComponent` for all routes.

## Testing Structure

### Unit Tests

Located alongside source files with `.spec.ts` suffix:

```
donate-full.component.ts
donate-full.component.spec.ts
```

### Test Configuration

- `jest.config.ts` - Root Jest configuration
- `jest.preset.js` - Shared test presets
- Each library has its own `jest.config.ts`

### Running Tests

```bash
# Test all
nx test

# Test specific project
nx test firebase-enrollment-functions-donate

# Test affected
nx affected:test
```

## Asset Management

### Public Assets

Located in `/public/`:
- Images
- Fonts
- Static files

Reference in templates:
```html
<img src="/assets/logo.png" alt="Logo">
```

### Component Assets

Component-specific assets in `src/assets/`:
```
apps/enrollment-portal/src/assets/
├── images/
├── icons/
└── styles/
```

## Configuration Files

### TypeScript

- `tsconfig.base.json` - Base TS config with path mappings
- `tsconfig.json` - Root TS config
- Each project has its own `tsconfig.lib.json` or `tsconfig.app.json`

### Linting

- `.eslintrc.json` - ESLint configuration
- `lint-staged.config.js` - Pre-commit linting

### Formatting

- `.prettierrc` - Prettier configuration
- `.prettierignore` - Files to skip formatting

### Firebase

- `firebase.json` - Firebase project configuration
- `firestore.rules` - Firestore security rules
- `firestore.indexes.json` - Firestore indexes
- `storage.rules` - Storage security rules
- `.firebaserc` - Firebase project aliases

## Best Practices

### 1. Library Boundaries

- Keep libraries focused on single domain/feature
- Don't create circular dependencies
- Use `tags` in `project.json` to enforce boundaries

### 2. Shared Code

- Extract common utilities to shared libraries
- Don't duplicate code across apps/libs
- Use dependency injection for cross-cutting concerns

### 3. Path Mappings

- Always use `@sol/*` imports, never relative paths across library boundaries
- Update `tsconfig.base.json` when adding new libraries

### 4. Build Optimization

- Use `nx affected` commands to build only changed code
- Enable caching in `nx.json` for faster builds
- Use lazy loading for all routes

### 5. Monorepo Hygiene

- Run `nx graph` to visualize dependencies
- Use `nx lint` to catch issues early
- Keep `package.json` dependencies centralized
