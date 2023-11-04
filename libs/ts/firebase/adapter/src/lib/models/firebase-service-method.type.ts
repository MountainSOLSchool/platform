import { FirebaseSdkMethod } from './firebase-sdk-method.type';

export type FirebaseServiceMethod<G> = G extends FirebaseSdkMethod<
    infer I,
    infer A,
    infer R
>
    ? (...args: A) => R
    : never;
