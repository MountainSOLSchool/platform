import { V1Functions, V1Role } from '@sol/firebase/functions';
import { ClassEmailGenerator } from '@sol/student/reports';

export const emails = V1Functions.endpoint
    .restrictedToRoles(V1Role.Admin)
    .handle<
        unknown,
        { classId: string; semesterId: string }
    >(async (request, response) => {
        const { classId, semesterId } = request.query;
        const emailList = await ClassEmailGenerator.createEmailList(
            classId,
            semesterId
        );
        response.send({
            list: emailList,
        });
    });
