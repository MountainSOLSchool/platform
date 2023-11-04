import { AuthV2Utility, Functions } from '@sol/firebase/functions';
import { StudentV2Repository } from '@sol/student/repository';

export const myEnrolledStudents = Functions.endpoint.handleV2(
    async (request, response) => {
        const user = await AuthV2Utility.getUserFromRequest(request, response);
        if (!user) {
            response.send({ studentIds: [] });
            return;
        }
        const studentIds = await AuthV2Utility.getUserStudentIds(user);
        const studentOrEmptyLookups = await Promise.all(
            studentIds.map(async (id) => await StudentV2Repository.get(id))
        );
        const students = studentOrEmptyLookups
            .filter(
                (student): student is NonNullable<typeof student> => !!student
            )
            .map(({ id, first_name, last_name }) => ({
                id,
                name: `${first_name} ${last_name}`,
            }));
        response.send({ students });
    }
);
