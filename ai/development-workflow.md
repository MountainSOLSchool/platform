# Development Workflow

This document describes the development workflow, git practices, and deployment process for the Mountain SOL platform.

## Local Development Setup

### Prerequisites

- Node.js (check `.nvmrc` or `package.json` for version)
- npm
- Firebase CLI: `npm install -g firebase-tools`
- Git

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd platform

# Install dependencies
npm install

# Login to Firebase
firebase login
```

### Environment Configuration

The project uses environment-specific configuration:

- `.env.dev` - Development environment
- `.env.prod` - Production environment

These files are gitignored and contain sensitive configuration.

## Development Servers

### Frontend Development

```bash
# Serve Angular app with hot reload
nx serve enrollment-portal

# Opens at http://localhost:4200
```

### Firebase Emulators

```bash
# Start all emulators
firebase emulators:start

# Start specific emulators
firebase emulators:start --only functions,firestore
```

**Emulator UI**: http://localhost:4000

**Available Emulators**:
- Functions: http://localhost:5001
- Firestore: http://localhost:8080
- Authentication: http://localhost:9099
- Storage: http://localhost:9199

### Full Stack Development

Run both simultaneously in separate terminals:

```bash
# Terminal 1
firebase emulators:start

# Terminal 2
nx serve enrollment-portal
```

Configure Angular to use emulators in development.

## Code Quality Tools

### Linting

```bash
# Lint all projects
nx lint

# Lint specific project
nx lint enrollment-portal

# Lint with auto-fix
nx lint enrollment-portal --fix
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

The project uses Prettier with configuration in `.prettierrc`.

### Pre-commit Hooks

Husky and lint-staged automatically run on commit:

```javascript
// lint-staged.config.js
module.exports = {
    '*.{ts,js,json,md}': ['prettier --write'],
    '*.ts': ['eslint --fix'],
};
```

## Testing

### Unit Tests

```bash
# Test all projects
nx test

# Test specific project
nx test firebase-enrollment-functions-donate

# Test with coverage
nx test --coverage

# Test affected projects only
nx affected:test
```

### Running Tests in Watch Mode

```bash
nx test enrollment-portal --watch
```

## Building

### Build Frontend

```bash
# Build for production
nx build enrollment-portal --configuration=production

# Build output: dist/apps/enrollment-portal
```

### Build Functions

```bash
# Build all functions
nx build functions

# Build specific function library
nx build firebase-enrollment-functions-donate
```

### Build Affected Projects

```bash
# Build only changed projects
nx affected:build

# Dry run to see what would be built
nx affected:build --dry-run
```

## Git Workflow

### Branch Strategy

The project uses a simple branch strategy:

- `main` - Production branch
- Feature branches - Named descriptively

### Commit Messages

Write clear, concise commit messages:

```bash
# Good commit messages
git commit -m "Add donation confirmation email functionality"
git commit -m "Fix error message timing bug in donate component"
git commit -m "Refactor payment collector to use signal-based state"

# Bad commit messages
git commit -m "fixes"
git commit -m "wip"
git commit -m "updates"
```

### Commit Workflow

Standard commit with attribution for AI-assisted changes:

```bash
# Stage changes
git add .

# Commit with co-author attribution
git commit -m "Add full-featured donation page with email receipts

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Note**: The repository uses Husky pre-commit hooks that run linting and formatting automatically.

### Pull Requests

When creating pull requests:

1. Create descriptive title
2. Include summary of changes (bullet points)
3. Add test plan (steps to verify)
4. Reference related issues

Example PR description:

```markdown
## Summary
- Add credit card payment support to donation page
- Collect donor information (name, email, address)
- Send automatic email receipts with tax ID
- Enable payment vault for logged-in users

## Test Plan
- [ ] Test anonymous donation with credit card
- [ ] Test anonymous donation with Venmo
- [ ] Test logged-in donation with saved payment method
- [ ] Verify email receipt is sent with correct details
- [ ] Test state/ZIP input validation
```

## Deployment

**Note**: Deployment is automated via GitHub Actions. Push to `main` branch triggers deployments.

### GitHub Actions Workflows

**Functions deployment**: `.github/workflows/firebase-functions-merge.yml`
- Runs on push to `main`
- Uses Nx to detect affected functions (lines 37-98)
- Builds all functions (line 102)
- Deploys affected functions in groups of 5 (lines 61-92, 154-161)
- Parallel build, sequential deploy (line 131)

**Hosting deployment**: `.github/workflows/firebase-hosting-merge.yml`
- Runs on push to `main`
- Builds enrollment-portal (line 16)
- Deploys to Firebase Hosting (lines 17-21)

**Build check**: `.github/workflows/build-check.yml`
- Runs on pull requests
- Validates builds before merge

### Manual Deployment (if needed)

```bash
# Deploy all functions (use with caution)
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:donate

# Deploy frontend
firebase deploy --only hosting

# Deploy Firestore rules/indexes
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### Deployment Process

1. Push changes to `main` branch
2. GitHub Actions automatically:
   - Detects affected projects
   - Builds changed functions
   - Deploys to production
3. Monitor deployment in GitHub Actions UI
4. Check Firebase Console for function status

## Nx Commands

### Dependency Graph

Visualize project dependencies:

```bash
# Open interactive graph
nx graph

# Generate static graph
nx graph --file=graph.html
```

### Affected Projects

See what's affected by changes:

```bash
# Show affected projects
nx affected:apps
nx affected:libs

# Show dependency graph of affected projects
nx affected:graph
```

### Cache Management

```bash
# Clear Nx cache
nx reset

# Run with cache disabled
nx build enrollment-portal --skip-nx-cache
```

## Troubleshooting

### Build Errors

**Issue**: TypeScript compilation errors

```bash
# Clear cache and rebuild
nx reset
rm -rf node_modules
npm install
nx build
```

**Issue**: Path mapping not found

Check `tsconfig.base.json` has correct path mapping:

```json
{
  "compilerOptions": {
    "paths": {
      "@sol/new-library": ["libs/path/to/new-library/src/index.ts"]
    }
  }
}
```

### Emulator Issues

**Issue**: Emulators won't start

```bash
# Kill processes on emulator ports
lsof -ti:5001 | xargs kill
lsof -ti:8080 | xargs kill
lsof -ti:4000 | xargs kill

# Restart emulators
firebase emulators:start
```

**Issue**: Functions not updating in emulator

The emulator doesn't always hot-reload functions. Restart emulators after function changes.

### Angular Issues

**Issue**: Changes not reflecting in browser

```bash
# Hard refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)

# Clear Angular cache
rm -rf .angular/cache

# Restart dev server
nx serve enrollment-portal
```

## Performance Optimization

### Build Performance

```bash
# Enable parallel builds
nx run-many --target=build --all --parallel=3

# Use computation caching
# Nx caches automatically, but you can clear with: nx reset
```

### Development Performance

- Use `--skip-nx-cache` only when debugging cache issues
- Run affected commands instead of all projects
- Use Firebase emulators instead of deploying for testing

## Environment Management

### Switching Environments

```bash
# List available environments
firebase projects:list

# Switch to development
firebase use dev

# Switch to production
firebase use prod

# Use specific project for single command
firebase deploy --only functions --project=prod
```

### Environment Variables

Functions access environment config via:

```typescript
const secrets = await getSecrets();
const strings = await getStrings();
```

These are configured per environment in Firebase.

## Debugging

### Frontend Debugging

Use Chrome DevTools:
- Set breakpoints in TypeScript (source maps enabled)
- Use Angular DevTools extension
- Check Network tab for API calls

### Function Debugging

**Local (Emulator)**:
```bash
# Start functions with inspect flag
firebase emulators:start --inspect-functions
```

Then attach Chrome DevTools to the Node process.

**Production**:
```bash
# View function logs
firebase functions:log

# Tail logs in real-time
firebase functions:log --only donate

# View in Firebase Console
# https://console.firebase.google.com → Functions → Logs
```

### Firestore Debugging

Use Firestore emulator UI:
- View collections and documents
- Manually add/edit/delete data
- Test security rules

## Code Review Checklist

Before submitting code for review:

- [ ] All tests pass (`nx test`)
- [ ] No linting errors (`nx lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] No console.log statements (except intentional logging)
- [ ] TypeScript strict mode passes
- [ ] Follows existing patterns in codebase
- [ ] No unused imports or variables
- [ ] Error handling in place
- [ ] Documentation updated if needed

## Useful Commands Reference

```bash
# Development
nx serve enrollment-portal              # Serve Angular app
firebase emulators:start                 # Start Firebase emulators

# Testing
nx test                                  # Run all tests
nx affected:test                         # Test affected projects

# Building
nx build enrollment-portal               # Build frontend
nx affected:build                        # Build affected projects

# Linting & Formatting
nx lint                                  # Lint all
nx lint --fix                            # Auto-fix lint issues
npm run format                           # Format all files

# Deployment (automated via GitHub Actions)
# Push to main branch triggers deployment
git push origin main

# Nx Utilities
nx graph                                 # View dependency graph
nx affected:apps                         # Show affected apps
nx reset                                 # Clear Nx cache

# Firebase Utilities
firebase functions:log                   # View function logs
firebase projects:list                   # List Firebase projects
firebase use <project>                   # Switch project
```
