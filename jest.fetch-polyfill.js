// jsdom test environment strips Node's globals. Firebase Auth's Node build
// references global `fetch` at module load time. Provide a stub so the import
// resolves; tests that actually exercise network code should mock at call sites.
if (typeof globalThis.fetch === 'undefined') {
    const stub = () =>
        Promise.reject(new Error('fetch is not mocked in this test'));
    globalThis.fetch = stub;
    globalThis.Headers = class Headers {};
    globalThis.Request = class Request {};
    globalThis.Response = class Response {};
}
