import { initializeApp } from 'firebase/app';
import { solFirebaseConfig } from './sol-firebase-config';

export const solApp = initializeApp(solFirebaseConfig);
