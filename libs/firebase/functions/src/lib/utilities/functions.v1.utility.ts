import { type Request, type Response, runWith } from 'firebase-functions/v1';
import CORS from 'cors';
import { defineSecret, defineString } from 'firebase-functions/params';
import { SecretParam, StringParam } from 'firebase-functions/lib/params/types';
import { V1AuthUtility, V1Role } from './auth.v1.utility';

const cors = CORS({ origin: true });

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
        private roles: Array<V1Role> = []
    ) {}

    usingSecrets<
        SecretNamesParam extends Array<string>,
        SecretNames extends string = SecretNamesParam[number],
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
        StringNames extends string = StringNamesParam[number],
    >(...stringNames: StringNamesParam) {
        const strings: Record<StringNames, StringParam> = stringNames
            .map((string) => defineString(string))
            .reduce(
                (all, string) => ({ ...all, [string.name]: string }),
                {} as Record<StringNames, StringParam>
            );
        return new FunctionBuilder(this.secrets, strings, this.roles);
    }

    restrictedToRoles(...roles: Array<V1Role>) {
        return new FunctionBuilder(this.secrets, this.strings, roles);
    }

    handle<RequestData, QueryData extends ParsedQs = ParsedQs>(
        handler: (
            request: Omit<Request, 'body' | 'query'> & {
                body: { data: RequestData };
                query: QueryData;
            },
            response: Response,
            secrets: Record<string, string>,
            strings: Record<string, string>
        ) => void
    ) {
        return runWith({
            secrets: Object.values(this.secrets),
        }).https.onRequest(async (request, response) => {
            cors(request, response, async () => {
                this.roles.forEach((role) => {
                    V1AuthUtility.validateRole(request, response, role);
                });
                handler(
                    request as unknown as Parameters<typeof handler>[0],
                    {
                        ...response,
                        status: (code: number) => response.status(code),
                        send: (data: unknown) => {
                            response.send({ data });
                        },
                    } as Response,
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
        });
    }
}

export class V1Functions {
    public static endpoint = new FunctionBuilder();
}

interface ParsedQs {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
