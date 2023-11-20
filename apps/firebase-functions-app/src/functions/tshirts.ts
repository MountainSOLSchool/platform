import { Functions, Role } from '@sol/firebase/functions';
import { StudentTshirtsGenerator } from '@sol/student/reports';

export const tshirts = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const tshirtList = await StudentTshirtsGenerator.createTshirtList();
        response.send({
            list: tshirtList,
        });
    });
