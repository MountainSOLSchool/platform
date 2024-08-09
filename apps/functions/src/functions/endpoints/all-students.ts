import { Functions } from '@sol/firebase/functions';
import { StudentRepository } from '@sol/student/repository';

export const allStudents = Functions.endpoint
    // TODO: should be restricted to admins
    // .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const students = await StudentRepository.allStudentsOfAllTime();

        response.send({
            students,
        });
    });
