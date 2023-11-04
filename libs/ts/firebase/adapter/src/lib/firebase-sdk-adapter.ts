import {
    Auth,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    user,
} from '@angular/fire/auth';
import { FirebaseServiceFactoryUtility } from './utilities/firebase-service-factory.utility';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { inject, InjectionToken } from '@angular/core';

export const fireAuth = (auth: Auth) =>
    FirebaseServiceFactoryUtility.create(auth, {
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

export const fireFunctions = (functions: Functions) =>
    FirebaseServiceFactoryUtility.create(functions, {
        httpsCallable,
    });

export const FIRE_FUNCTIONS = new InjectionToken<
    ReturnType<typeof fireFunctions>
>('FIRE_FUNCTIONS');

export const provideFireFunctions = () => ({
    provide: FIRE_FUNCTIONS,
    useFactory: () => fireFunctions(inject(Functions)),
});
