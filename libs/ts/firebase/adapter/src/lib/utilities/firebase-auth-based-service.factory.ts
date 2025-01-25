import { FirebaseSdkMethod } from '../models/firebase-sdk-method.type';
import { FirebaseServiceMethod } from '../models/firebase-service-method.type';

type FirebaseServiceMethods<T> = {
    [key: string]: FirebaseSdkMethod<T, any, any>;
};

export class FirebaseServiceFactory {
    static create<T, Methods extends FirebaseServiceMethods<T>>(
        instance: T,
        methods: Methods
    ): {
        [K in keyof Methods]: FirebaseServiceMethod<Methods[K]>;
    } {
        return Object.entries(methods).reduce((acc, [name, method]) => {
            return {
                ...acc,
                [name]: (...args: any[]) => {
                    return method(instance, ...args);
                },
            };
        }, {}) as {
            [K in keyof Methods]: FirebaseServiceMethod<Methods[K]>;
        };
    }
}
