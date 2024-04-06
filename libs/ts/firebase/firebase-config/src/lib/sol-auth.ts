import * as auth from 'firebase/auth';
import { solApp } from './sol-app';

export const solAuth = auth.getAuth(solApp);
