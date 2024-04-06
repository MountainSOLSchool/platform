import { Functions } from '@sol/firebase/functions';

import { default as next } from 'next';

const nextjsDistDir = '.next';

const nextjsServer = next({
    dev: false,
    conf: {
        distDir: nextjsDistDir,
    },
});
const nextjsHandle = nextjsServer.getRequestHandler();

export const studentsNextJsApp = Functions.endpoint.handle((req, res) => {
    return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
