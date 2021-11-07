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
            cors(request, response, async () => handler(request, response));
        });
    }
}
