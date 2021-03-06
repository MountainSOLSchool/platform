import * as functions from 'firebase-functions';
import * as CORS from 'cors';

const cors = CORS({ origin: true });

export class HttpUtility {
    public static aGetEndpoint(
        handler: (
            request: functions.https.Request,
            response: functions.Response
        ) => void
    ) {
        return functions.https.onRequest(async (request, response) => {
            cors(request, response, async () => {
                // await AuthUtility.validateFirebaseIdToken(request, response);
                handler(request, {
                    ...response,
                    status: (code: number) => response.status(code),
                    send: (data: unknown) => response.send({ data }),
                } as functions.Response);
            });
        });
    }
}
