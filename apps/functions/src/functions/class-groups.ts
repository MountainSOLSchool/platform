import { Functions } from '@sol/firebase/functions';
import {
    SemesterRepository,
    SUMMER_2023_SEMESTER,
} from '@sol/classes/repository';

export const classGroups = Functions.endpoint.handle<{
    ids: Array<string>;
}>(async (request, response) => {
    const groups = await SemesterRepository.of(
        SUMMER_2023_SEMESTER
    ).groups.getMany(request.body.data.ids);

    response.send({ groups });
});
