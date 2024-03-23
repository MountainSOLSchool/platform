import { V1Functions } from '@sol/firebase/functions';
import { V1ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';

export const enrollments = V1Functions.endpoint.handle(
    async (request, response) => {
        const enrollments =
            await V1ClassEnrollmentRepository.getCurrentUserCompletedEnrollments(
                request,
                response
            );
        response.send(enrollments);
    }
);
