import { FirebaseServiceFactory } from '@sol/ts/firebase/adapter';
import { getSolAuth } from './sol-auth';
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

let _solAuthClient:
    | ReturnType<typeof FirebaseServiceFactory.create>
    | undefined;

export const getSolAuthClient = () => {
    _solAuthClient ??= FirebaseServiceFactory.create(getSolAuth(), {
        createUserWithEmailAndPassword,
        sendPasswordResetEmail,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
    });
    return _solAuthClient;
};
