import { V1AuthUtility, V1Functions } from '@sol/firebase/functions';
import { V1StudentRepository } from '@sol/student/repository';

export const myEnrolledStudents = V1Functions.endpoint.handle(
    async (request, response) => {
        const user = await V1AuthUtility.getUserFromRequest(request, response);
        if (!user) {
            response.send({ studentIds: [] });
            return;
        }
        const studentIds = await V1AuthUtility.getUserStudentIds(user);
        const studentOrEmptyLookups = await Promise.all(
            studentIds.map(async (id) => await V1StudentRepository.get(id))
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
