import * as functions from 'firebase-functions';
import * as CORS from 'cors';
import { AuthUtility, Role } from './auth.utility';

const cors = CORS({ origin: true });

class FunctionBuilder<S extends Array<string>> {
    constructor(
        private secrets: S = [] as S,
        private roles: Array<Role> = []
    ) {}

    usingSecrets<S extends Array<string>>(...secrets: S) {
        return new FunctionBuilder(secrets, this.roles);
    }

    restrictedToRoles(...roles: Array<Role>) {
        return new FunctionBuilder(this.secrets, roles);
    }

    handle(
        handler: (
            request: functions.https.Request,
            response: functions.Response,
            secrets?: Record<string, string>
        ) => void
    ) {
        return functions
            .runWith({ secrets: this.secrets })
            .https.onRequest(async (request, response) => {
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
                            this.secrets.map((secret) => [
                                secret,
                                process.env[secret],
                            ]) ?? []
                        )
                    );
                });
            });
    }
}

export class Functions {
    public static endpoint = new FunctionBuilder();
}
