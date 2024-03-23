import { V1AuthUtility } from '@sol/firebase/functions';
import { UserRecord } from 'firebase-admin/auth';
import { Response } from 'firebase-functions/v1';

export const _assertUserCanManageStudent = async (
    user: UserRecord,
    studentId: string,
    response: Response
) => {
    const myStudentIds = await V1AuthUtility.getUserStudentIds(user);
    const userHasAccessToStudent = !!myStudentIds.find(
        (id) => id === studentId
    );
    if (!userHasAccessToStudent) {
        response.status(403).send();
    }
};
