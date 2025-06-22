import { Functions, Role } from '@sol/firebase/functions';
import { ClassEmailGenerator } from '@sol/student/reports';

export const emails = Functions.endpoint
    .restrictedToRoles(Role.Admin)
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
