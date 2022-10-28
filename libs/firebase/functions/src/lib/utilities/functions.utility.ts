import * as functions from 'firebase-functions';
import * as CORS from 'cors';

const cors = CORS({ origin: true });

export class Functions {
    public static endpoint = {
        usingSecrets: <S extends Array<string>>(...secrets: S) => ({
            handle: (
                handler: (
                    request: functions.https.Request,
                    response: functions.Response,
                    secrets: Record<S[number], string>
                ) => void
            ) => this.anEndpoint(handler, secrets),
        }),
        handle: this.anEndpoint,
    };
    public static anEndpoint(
        handler: (
            request: functions.https.Request,
            response: functions.Response,
            secrets?: Record<string, string>
        ) => void,
        secrets?: Array<string>
    ) {
        return functions
            .runWith({ secrets: secrets ?? [] })
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
                            secrets?.map((secret) => [
                                secret,
                                process.env[secret],
                            ]) ?? []
                        )
                    );
                });
            });
    }
}
