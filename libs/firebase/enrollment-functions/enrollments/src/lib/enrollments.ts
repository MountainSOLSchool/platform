import { Functions } from '@sol/firebase/functions';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';

export const enrollments = Functions.endpoint.handle(
    async (request, response) => {
        const enrollments =
            await ClassEnrollmentRepository.getCurrentUserCompletedEnrollments(
                request,
                response
            );
        response.send(enrollments);
    }
);
