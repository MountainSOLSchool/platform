import * as functions from 'firebase-functions';
import * as CORS from 'cors';
import { AuthUtility, Role } from './auth.utility';
import { defineSecret } from 'firebase-functions/params';
import { SecretParam } from 'firebase-functions/lib/params/types';

const cors = CORS({ origin: true });

class FunctionBuilder<SecretNames extends string> {
    constructor(
        private secrets: Record<SecretNames, SecretParam> = {} as Record<
            SecretNames,
            SecretParam
        >,
        private roles: Array<Role> = []
    ) {}

    usingSecrets<
        SecretNamesParam extends Array<string>,
        SecretNames extends string = SecretNamesParam[number]
    >(...secretNames: SecretNamesParam) {
        const secrets: Record<SecretNames, SecretParam> = secretNames
            .map((secret) => defineSecret(secret))
            .reduce(
                (all, secret) => ({ ...all, [secret.name]: secret }),
                {} as Record<SecretNames, SecretParam>
            );
        return new FunctionBuilder(secrets, this.roles);
    }

    restrictedToRoles(...roles: Array<Role>) {
        return new FunctionBuilder(this.secrets, roles);
    }

    handle<RequestData>(
        handler: (
            request: Omit<functions.https.Request, 'body'> & {
                body: { data: RequestData };
            },
            response: functions.Response,
            secrets?: Record<string, string>
        ) => void
    ) {
        return functions
            .runWith({ secrets: Object.values(this.secrets) })
            .https.onRequest(
                async (
                    request: Omit<functions.https.Request, 'body'> & {
                        body: { data: RequestData };
                    },
                    response
                ) => {
                    cors(request, response, async () => {
                        this.roles.forEach((role) => {
                            AuthUtility.validateRole(request, response, role);
                        });
                        handler(
                            request,
                            {
                                ...response,
                                status: (code: number) => response.status(code),
                                send: (data: unknown) => {
                                    response.send({ data });
                                },
                            } as functions.Response,
                            Object.fromEntries(
                                Object.entries(this.secrets).map(
                                    ([key, secret]: [string, SecretParam]) => [
                                        key,
                                        secret.value(),
                                    ]
                                )
                            )
                        );
                    });
                }
            );
    }
}

export class Functions {
    public static endpoint = new FunctionBuilder();
}
