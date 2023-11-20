import { AuthUtility } from '@sol/firebase/functions';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const _assertUserCanManageStudent = async (
    user: admin.auth.UserRecord,
    studentId: string,
    response: functions.Response
) => {
    const myStudentIds = await AuthUtility.getUserStudentIds(user);
    const userHasAccessToStudent = !!myStudentIds.find(
        (id) => id === studentId
    );
    if (!userHasAccessToStudent) {
        response.status(403).send();
    }
};
