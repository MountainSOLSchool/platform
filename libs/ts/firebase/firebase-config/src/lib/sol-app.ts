import { initializeApp } from 'firebase/app';
import { solFirebaseConfig } from './sol-firebase-config';

let _solApp: ReturnType<typeof initializeApp> | undefined;

export const getSolApp = () => {
    _solApp ??= initializeApp(solFirebaseConfig);
    return _solApp;
};
