import { FirebaseOptions } from '@firebase/app';

// Dev project web config (sol-web-dev app on mountain-sol-platform-dev).
// Swapped in for sol-firebase-config.ts by the enrollment-portal `dev` build
// configuration so the deployed-dev portal authenticates and calls functions
// against the dev project rather than prod. Web API keys are public client-side
// identifiers (same as the prod config), safe to commit.
export const solFirebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyDzw8zRBy5ruIkkwEnnExsiCGN8bl5L52k',
    authDomain: 'mountain-sol-platform-dev.firebaseapp.com',
    projectId: 'mountain-sol-platform-dev',
    storageBucket: 'mountain-sol-platform-dev.firebasestorage.app',
    messagingSenderId: '1062901014652',
    appId: '1:1062901014652:web:9385be3945a0cce84069f9',
};
