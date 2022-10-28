import { DatabaseUtility } from '@sol/firebase/database';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import * as functions from 'firebase-functions';

export class AuthUtility {
    public static async validateIsAdmin(
        req: functions.https.Request,
        res: functions.Response
    ) {
        const { uid: userId } = await AuthUtility.validateFirebaseIdToken(
            req,
            res
        );

        const db = DatabaseUtility.getDatabase();

        const isAdmin = !!(await DatabaseUtility.fetchFirstMatchingDocument(
            db.collection('admins'),
            ['userId', '==', userId]
        ));

        if (!isAdmin) {
            res.status(403).send();
        }
    }

    public static async getUserFromRequest(
        req: functions.https.Request,
        res: functions.Response
    ): Promise<admin.auth.UserRecord> {
        const { uid } = await AuthUtility.validateFirebaseIdToken(req, res);
        return await admin.auth().getUser(uid);
    }

    public static async validateFirebaseIdToken(
        req: functions.https.Request,
        res: functions.Response
    ): Promise<DecodedIdToken | undefined> {
        if (
            (!req.headers.authorization ||
                !req.headers.authorization.startsWith('Bearer ')) &&
            !(req.cookies && req.cookies.__session)
        ) {
            console.error(
                'No Firebase ID token was passed as a Bearer token in the Authorization header.',
                'Make sure you authorize your request by providing the following HTTP header:',
                'Authorization: Bearer <Firebase ID Token>',
                'or by passing a "__session" cookie.'
            );
            res.status(403).send('Unauthorized');
            return undefined;
        }

        let idToken;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            // Read the ID Token from the Authorization header.
            idToken = req.headers.authorization.split('Bearer ')[1];
        } else if (req.cookies) {
            // Read the ID Token from cookie.
            idToken = req.cookies.__session;
        } else {
            // No cookie
            res.status(403).send('Unauthorized');
            return undefined;
        }

        try {
            // TODO: validate user is admin, not just valid user
            const decodedIdToken = await admin.auth().verifyIdToken(idToken);
            return decodedIdToken;
        } catch (error) {
            console.error('Error while verifying Firebase ID token:', error);
            res.status(403).send('Unauthorized');
            return undefined;
        }
    }
}
