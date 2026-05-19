const nxPreset = require('@nx/jest/preset').default;
const path = require('path');

module.exports = {
    ...nxPreset,
    globals: {
        ...nxPreset.globals,
        fetch: globalThis.fetch,
        Request: globalThis.Request,
        Response: globalThis.Response,
        Headers: globalThis.Headers,
        FormData: globalThis.FormData,
    },
    setupFiles: [
        ...(nxPreset.setupFiles ?? []),
        path.join(__dirname, 'jest.fetch-polyfill.js'),
    ],
};
