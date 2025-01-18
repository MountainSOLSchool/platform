import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { Auth, user } from '@angular/fire/auth';
import { FirebaseAuthBasedServiceFactory } from '@sol/ts/firebase/adapter';
import { inject, InjectionToken } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

export const fireAuth = (auth: Auth) =>
    FirebaseAuthBasedServiceFactory.create(auth, {
        createUserWithEmailAndPassword,
        sendPasswordResetEmail,
        signInWithEmailAndPassword,
        signOut,
        user,
    });

export const FIRE_AUTH = new InjectionToken<ReturnType<typeof fireAuth>>(
    'FIRE_AUTH'
);

export const provideFireAuth = () => ({
    provide: FIRE_AUTH,
    useFactory: () => fireAuth(inject(Auth)),
});

const fireFunctions = (functions: Functions) =>
    FirebaseAuthBasedServiceFactory.create(functions, {
        httpsCallable,
    });

export const FIRE_FUNCTIONS = new InjectionToken<
    ReturnType<typeof fireFunctions>
>('FIRE_FUNCTIONS');

export const provideFireFunctions = () => ({
    provide: FIRE_FUNCTIONS,
    useFactory: () => fireFunctions(inject(Functions)),
});
