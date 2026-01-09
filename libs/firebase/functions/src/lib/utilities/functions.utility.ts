import { AuthUtility, Role } from './auth.utility';
import { defineSecret, defineString } from 'firebase-functions/params';
import { params } from 'firebase-functions/lib/params/types';
import { onRequest } from 'firebase-functions/v2/https';
import { type Request } from 'firebase-functions/v2/https';
import * as express from 'express';

const ALLOWED_ORIGINS = defineString('ALLOWED_ORIGINS');

const corsMiddleware = (
    req: Request,
    res: express.Response,
    next: () => void
) => {
    const origin = req.headers.origin;
    const allowedOrigins = ALLOWED_ORIGINS.value()
        .split(',')
        .map((o) => o.trim());

    if (!origin) {
        res.status(400).json({
            error: 'Bad Request: Origin header is required',
        });
        return;
    }

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Authorization,Content-Type'
        );

        if (req.method === 'OPTIONS') {
            res.status(204).send();
            return;
        }

        next();
    } else {
        res.status(400).json({
            error: 'Bad Request: Origin not allowed by CORS policy',
            origin,
            allowedOrigins,
        });
    }
};

class FunctionBuilder<SecretNames extends string, StringNames extends string> {
    constructor(
        private secrets: Record<SecretNames, params.SecretParam> = {} as Record<
            SecretNames,
            params.SecretParam
        >,
        private strings: Record<StringNames, params.StringParam> = {} as Record<
            StringNames,
            params.StringParam
        >,
        private roles: Array<Role> = []
    ) {}

    usingSecrets<
        SecretNamesParam extends Array<string>,
        SecretNames extends string = SecretNamesParam[number],
    >(...secretNames: SecretNamesParam) {
        const secrets: Record<SecretNames, params.SecretParam> = secretNames
            .map((secret) => defineSecret(secret))
            .reduce(
                (all, secret) => ({ ...all, [secret.name]: secret }),
                {} as Record<SecretNames, params.SecretParam>
            );
        return new FunctionBuilder(secrets, this.strings, this.roles);
    }

    usingStrings<
        StringNamesParam extends Array<string>,
        StringNames extends string = StringNamesParam[number],
    >(...stringNames: StringNamesParam) {
        const strings: Record<StringNames, params.StringParam> = stringNames
            .map((string) => defineString(string))
            .reduce((all, string) => ({ ...all, [string.name]: string }), {
                ALLOWED_ORIGINS: ALLOWED_ORIGINS,
            } as Record<StringNames, params.StringParam>);
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
            {
                secrets: Object.values(this.secrets),
            },
            async (request, response) => {
                corsMiddleware(request, response, async () => {
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
                                .map(
                                    (pair) =>
                                        pair as [string, params.SecretParam]
                                )
                                .map(([key, secret]) => [key, secret.value()])
                        ),
                        Object.fromEntries(
                            Object.entries(this.strings)
                                .map(
                                    (pair) =>
                                        pair as [string, params.StringParam]
                                )
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
