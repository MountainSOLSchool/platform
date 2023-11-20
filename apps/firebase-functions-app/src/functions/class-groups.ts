import { Functions } from '@sol/firebase/functions';

import { Semester } from '@sol/firebase/classes/semester';

export const classGroups = Functions.endpoint.handle<{
    ids: Array<string>;
}>(async (request, response) => {
    const groups = await Semester.active().groups.getMany(
        request.body.data.ids
    );

    response.send({ groups });
});
