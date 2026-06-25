// Deployed-dev environment: a prod-like optimized build that targets the
// dev Firebase project (via the dev web config swapped in by the `dev` build
// configuration). remoteFunctions = true so callables hit the dev project's
// deployed functions; useEmulators = false (this runs against deployed dev,
// not the local emulator).
export const environment = {
    production: true,
    remoteFunctions: true,
    useEmulators: false,
};
