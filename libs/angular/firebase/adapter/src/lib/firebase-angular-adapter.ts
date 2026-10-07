import {
    Auth,
    connectAuthEmulator,
    createUserWithEmailAndPassword,
    getAuth,
    onIdTokenChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import { FirebaseServiceFactory } from '@sol/ts/firebase/adapter';
import { inject, InjectionToken } from '@angular/core';
import { Functions, getFunctions, httpsCallable } from 'firebase/functions';
import {
    getRemoteConfig,
    getValue,
    fetchAndActivate,
    RemoteConfig,
} from 'firebase/remote-config';
import { FirebaseApp } from 'firebase/app';
import { Observable } from 'rxjs';

export const FIREBASE_APP = new InjectionToken<FirebaseApp>('FIREBASE_APP');
export const FIREBASE_AUTH = new InjectionToken<Auth>('FIREBASE_AUTH');
export const FIREBASE_FUNCTIONS = new InjectionToken<Functions>(
    'FIREBASE_FUNCTIONS'
);

export const provideFirebase = (
    app: () => FirebaseApp,
    options: { authEmulatorUrl?: string } = {}
) => [
    { provide: FIREBASE_APP, useFactory: app },
    {
        provide: FIREBASE_AUTH,
        useFactory: () => {
            const auth = getAuth(inject(FIREBASE_APP));
            if (options.authEmulatorUrl) {
                connectAuthEmulator(auth, options.authEmulatorUrl, {
                    disableWarnings: true,
                });
            }
            return auth;
        },
    },
    {
        provide: FIREBASE_FUNCTIONS,
        useFactory: () => getFunctions(inject(FIREBASE_APP)),
    },
];

// Emits on sign-in, sign-out and token refresh (what @angular/fire's `user` did).
const user = (auth: Auth) =>
    new Observable<User | null>((subscriber) =>
        onIdTokenChanged(
            auth,
            (u) => subscriber.next(u),
            (e) => subscriber.error(e),
            () => subscriber.complete()
        )
    );

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
    useFactory: () => fireAuth(inject(FIREBASE_AUTH)),
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
    useFactory: () => fireFunctions(inject(FIREBASE_FUNCTIONS)),
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
    useFactory: () => fireConfigApp(inject(FIREBASE_APP)),
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
        useFactory: () => fireConfigApp(inject(FIREBASE_APP)),
    },
    {
        provide: FIRE_CONFIG_INSTANCE,
        useFactory: () => {
            const app = inject(FIREBASE_APP);
            const configApp = fireConfigApp(app);
            const remoteConfig = configApp.getRemoteConfig();
            return fireConfigInstance(remoteConfig);
        },
    },
];
