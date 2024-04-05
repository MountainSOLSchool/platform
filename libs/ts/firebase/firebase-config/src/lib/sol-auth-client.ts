import { FirebaseAuthBasedServiceFactory } from '@sol/ts/firebase/adapter';
import { solAuth } from './sol-auth';
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
export const solAuthClient = FirebaseAuthBasedServiceFactory.create(solAuth, {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
});
