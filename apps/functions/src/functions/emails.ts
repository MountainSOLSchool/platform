import { Functions, Role } from '@sol/firebase/functions';
import { ClassEmailGenerator } from '@sol/student/reports';

export const emails = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<unknown, { classId: string }>(async (request, response) => {
        const { classId } = request.query;
        const emailList = await ClassEmailGenerator.createEmailList(classId);
        response.send({
            list: emailList,
        });
    });
