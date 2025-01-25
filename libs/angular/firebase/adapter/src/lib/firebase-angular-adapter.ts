import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { Auth, user } from '@angular/fire/auth';
import { FirebaseServiceFactory } from '@sol/ts/firebase/adapter';
import { inject, InjectionToken } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
    getRemoteConfig,
    getValue,
    fetchAndActivate,
    RemoteConfig,
} from 'firebase/remote-config';
import { FirebaseApp } from '@angular/fire/app';

export const fireAuth = (auth: Auth) =>
    FirebaseServiceFactory.create(auth, {
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
    FirebaseServiceFactory.create(functions, {
        httpsCallable,
    });

export const FIRE_FUNCTIONS = new InjectionToken<
    ReturnType<typeof fireFunctions>
>('FIRE_FUNCTIONS');

export const provideFireFunctions = () => ({
    provide: FIRE_FUNCTIONS,
    useFactory: () => fireFunctions(inject(Functions)),
});

const fireConfigApp = (app: FirebaseApp) =>
    FirebaseServiceFactory.create(app, {
        getRemoteConfig,
    });

export const FIRE_CONFIG_APP = new InjectionToken<
    ReturnType<typeof fireConfigApp>
>('FIRE_CONFIG_APP');

export const provideFireConfigApp = () => ({
    provide: FIRE_CONFIG_APP,
    useFactory: () => fireConfigApp(inject(FirebaseApp)),
});

const fireConfigInstance = (remoteConfig: RemoteConfig) =>
    FirebaseServiceFactory.create(remoteConfig, {
        getValue,
        fetchAndActivate,
    });

export const FIRE_CONFIG_INSTANCE = new InjectionToken<
    ReturnType<typeof fireConfigInstance>
>('FIRE_CONFIG_INSTANCE');

export const provideFireConfigInstance = (remoteConfig: RemoteConfig) => ({
    provide: FIRE_CONFIG_INSTANCE,
    useFactory: () => fireConfigInstance(remoteConfig),
});

export const provideFireConfig = () => [
    {
        provide: FIRE_CONFIG_APP,
        useFactory: () => fireConfigApp(inject(FirebaseApp)),
    },
    {
        provide: FIRE_CONFIG_INSTANCE,
        useFactory: () => {
            const app = inject(FirebaseApp);
            const configApp = fireConfigApp(app);
            const remoteConfig = configApp.getRemoteConfig();
            return fireConfigInstance(remoteConfig);
        },
    },
];
