import * as functions from 'firebase-functions';
import * as CORS from 'cors';
import { AuthUtility } from './auth.utility';

const cors = CORS({ origin: true });

export class HttpUtility {
    public static get = {
        usingSecrets: <S extends Array<string>>(...secrets: S) => ({
            handle: (
                handler: (
                    request: functions.https.Request,
                    response: functions.Response,
                    secrets: Record<S[number], string>
                ) => void
            ) => this.aGetEndpoint(handler, secrets),
        }),
        handle: this.aGetEndpoint,
    };
    public static aGetEndpoint(
        handler: (
            request: functions.https.Request,
            response: functions.Response,
            secrets?: Record<string, string>
        ) => void,
        secrets?: Array<string>
    ) {
        return functions
            .runWith({ secrets })
            .https.onRequest(async (request, response) => {
                cors(request, response, async () => {
                    // await AuthUtility.validateFirebaseIdToken(
                    //     request,
                    //     response
                    // );
                    handler(
                        request,
                        {
                            ...response,
                            status: (code: number) => response.status(code),
                            send: (data: unknown) => {
                                // response.set(
                                //     'Access-Control-Allow-Origin',
                                //     '*'
                                // );
                                response.send({ data });
                            },
                        } as functions.Response,
                        Object.fromEntries(
                            secrets.map((secret) => [
                                secret,
                                process.env[secret],
                            ])
                        )
                    );
                });
            });
    }
}
