import { V1DatabaseUtility } from '@sol/firebase/database';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { type Request, type Response } from 'firebase-functions/v1';
import { type UserRecord, getAuth } from 'firebase-admin/auth';

const auth = getAuth();

export enum V1Role {
    Admin = 'admin',
}

export class V1AuthUtility {
    static validateRole(request: Request, response: Response, role: V1Role) {
        switch (role) {
            case V1Role.Admin:
                V1AuthUtility.validateIsAdmin(request, response);
                break;
        }
    }
    public static async validateIsAdmin(req: Request, res: Response) {
        const decoded = await V1AuthUtility.validateFirebaseIdToken(req, res);
        if (!decoded) {
            res.status(403).send('Unauthorized');
            return;
        } else {
            const isAdmin = await V1AuthUtility.isAdmin(decoded.uid);

            if (!isAdmin) {
                res.status(403).send();
            }
        }
    }

    private static async isAdmin(userId: string): Promise<boolean> {
        const db = V1DatabaseUtility.getDatabase();
        const admin = await V1DatabaseUtility.fetchFirstMatchingDocument(
            db.collection('admins'),
            ['userId', '==', userId]
        );
        return !!admin;
    }

    public static async getUserRoles(user: UserRecord): Promise<Array<V1Role>> {
        const roles = new Array<V1Role>();
        if (await V1AuthUtility.isAdmin(user.uid)) {
            roles.push(V1Role.Admin);
        }
        return roles;
    }

    public static async getUserStudentIds(
        user: UserRecord
    ): Promise<Array<string>> {
        const db = V1DatabaseUtility.getDatabase();
        const studentEnrollments = await db
            .collection('enrollment')
            .where('userId', '==', user.uid)
            .where('status', '==', 'enrolled')
            .get();
        const nonUniqueStudents = studentEnrollments.docs.map(
            (enrollment) => enrollment.data().studentId
        );
        return Array.from(new Set(nonUniqueStudents));
    }

    public static async getUserFromRequest(
        req: Request,
        res: Response
    ): Promise<UserRecord | void> {
        const decoded = await V1AuthUtility.validateFirebaseIdToken(req, res);
        if (!decoded) {
            res.status(403).send('Unauthorized');
            return;
        } else {
            return await auth.getUser(decoded.uid);
        }
    }

    public static async getUser(uid: string) {
        return await auth.getUser(uid);
    }

    public static async validateFirebaseIdToken(
        req: Request,
        res: Response
    ): Promise<DecodedIdToken | void> {
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
            return;
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
            return;
        }

        try {
            const decodedIdToken = await auth.verifyIdToken(idToken);
            return decodedIdToken;
        } catch (error) {
            console.error('Error while verifying Firebase ID token:', error);
            res.status(403).send('Unauthorized');
            return;
        }
    }
}
