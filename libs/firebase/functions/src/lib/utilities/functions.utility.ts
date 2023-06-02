import * as CORS from 'cors';
import { AuthUtility, Role } from './auth.utility';
import { defineSecret, defineString } from 'firebase-functions/params';
import { SecretParam, StringParam } from 'firebase-functions/lib/params/types';
import { onRequest } from 'firebase-functions/v2/https';
const cors = CORS({ origin: true });
import { Request } from 'firebase-functions/v2/https';
import * as express from 'express';

class FunctionBuilder<SecretNames extends string, StringNames extends string> {
    constructor(
        private secrets: Record<SecretNames, SecretParam> = {} as Record<
            SecretNames,
            SecretParam
        >,
        private strings: Record<StringNames, StringParam> = {} as Record<
            StringNames,
            StringParam
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
        return new FunctionBuilder(secrets, this.strings, this.roles);
    }

    usingStrings<
        StringNamesParam extends Array<string>,
        StringNames extends string = StringNamesParam[number]
    >(...stringNames: StringNamesParam) {
        const strings: Record<StringNames, StringParam> = stringNames
            .map((string) => defineString(string))
            .reduce(
                (all, string) => ({ ...all, [string.name]: string }),
                {} as Record<StringNames, StringParam>
            );
        return new FunctionBuilder(this.secrets, strings, this.roles);
    }

    restrictedToRoles(...roles: Array<Role>) {
        return new FunctionBuilder(this.secrets, this.strings, roles);
    }

    handle<RequestData, QueryData extends ParsedQs = ParsedQs>(
        handler: (
            request: Omit<Request, 'body' | 'query'> & {
                body: { data: RequestData };
                query: QueryData;
            },
            response: express.Response,
            secrets: Record<string, string>,
            strings: Record<string, string>
        ) => void
    ) {
        return onRequest(
            { secrets: Object.values(this.secrets), maxInstances: 10 },
            async (request, response) => {
                cors(request, response, async () => {
                    this.roles.forEach((role) => {
                        AuthUtility.validateRole(request, response, role);
                    });
                    handler(
                        request as Parameters<typeof handler>[0],
                        {
                            ...response,
                            status: (code: number) => response.status(code),
                            send: (data: unknown) => {
                                response.send({ data });
                            },
                        } as express.Response,
                        Object.fromEntries(
                            Object.entries(this.secrets)
                                .map((pair) => pair as [string, SecretParam])
                                .map(([key, secret]) => [key, secret.value()])
                        ),
                        Object.fromEntries(
                            Object.entries(this.strings)
                                .map((pair) => pair as [string, StringParam])
                                .map(([key, string]) => [key, string.value()])
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

interface ParsedQs {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
