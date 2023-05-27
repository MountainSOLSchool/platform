import { Functions, Role } from '@sol/firebase/functions';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';

export const adminEnrollments = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const enrollments =
            await ClassEnrollmentRepository.getCurrentSemesterEnrollments();
        console.log('enrollments', enrollments);
        response.send(enrollments);
    });
