import { AuthUtility, Functions } from '@sol/firebase/functions';

export const myEnrolledStudents = Functions.endpoint.handle(
    async (request, response) => {
        const user = await AuthUtility.getUserFromRequest(request, response);
        if (!user) {
            response.send({ studentIds: [] });
            return;
        }
        const students = await AuthUtility.getUserStudents(user);
        response.send({ students });
    }
);
