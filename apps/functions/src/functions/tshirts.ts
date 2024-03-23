import { V1Functions, V1Role } from '@sol/firebase/functions';
import { StudentTshirtsGenerator } from '@sol/student/reports';

export const tshirts = V1Functions.endpoint
    .restrictedToRoles(V1Role.Admin)
    .handle<{
        semesterId: string;
    }>(async (request, response) => {
        const { semesterId } = request.body.data;
        const tshirtList =
            await StudentTshirtsGenerator.createTshirtList(semesterId);
        response.send({
            list: tshirtList,
        });
    });
