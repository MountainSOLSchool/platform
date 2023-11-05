import { AuthUtility, Functions } from '@sol/firebase/functions';
import { StudentRepository } from '@sol/student/repository';

export const myEnrolledStudents = Functions.endpoint.handle(
    async (request, response) => {
        const user = await AuthUtility.getUserFromRequest(request, response);
        if (!user) {
            response.send({ studentIds: [] });
            return;
        }
        const studentIds = await AuthUtility.getUserStudentIds(user);
        const studentOrEmptyLookups = await Promise.all(
            studentIds.map(async (id) => await StudentRepository.get(id))
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
