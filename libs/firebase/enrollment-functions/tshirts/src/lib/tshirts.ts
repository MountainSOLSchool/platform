import { Functions, Role } from '@sol/firebase/functions';
import { StudentTshirtsGenerator } from '@sol/student/reports';

export const tshirts = Functions.endpoint.restrictedToRoles(Role.Admin).handle<{
    semesterId: string;
}>(async (request, response) => {
    const { semesterId } = request.body.data;
    const tshirtList =
        await StudentTshirtsGenerator.createTshirtList(semesterId);

    response.send({
        list: tshirtList,
    });
});
