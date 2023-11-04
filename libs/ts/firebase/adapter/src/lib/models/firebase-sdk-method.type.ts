export type FirebaseSdkMethod<I, A extends Array<unknown>, R> = (
    instance: I,
    ...args: A
) => R;
