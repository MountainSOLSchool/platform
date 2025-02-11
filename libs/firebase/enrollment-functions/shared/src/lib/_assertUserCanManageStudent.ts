import { AuthUtility, Role } from '@sol/firebase/functions';
import { UserRecord } from 'firebase-admin/auth';
import { Response } from 'firebase-functions/v1';

export const _assertUserCanManageStudent = async (
    user: UserRecord,
    studentId: string,
    response: Response
) => {
    const isAdmin = (await AuthUtility.getUserRoles(user)).includes(Role.Admin);
    const myStudentIds = await AuthUtility.getUserStudentIds(user);
    const userHasAccessToStudent =
        isAdmin || !!myStudentIds.find((id) => id === studentId);
    if (!userHasAccessToStudent) {
        response.status(403).send();
    }
};
