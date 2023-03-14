import { Functions } from '@sol/firebase/functions';
import {
    SemesterRepository,
    SUMMER_2023_SEMESTER,
} from '@sol/classes/repository';

export const classes = Functions.endpoint.handle<
    | {
          ids: Array<string>;
      }
    | undefined
>(async (request, response) => {
    const semesterClasses = SemesterRepository.of(SUMMER_2023_SEMESTER).classes;
    const classes = await (request.body.data
        ? semesterClasses.getMany(request.body.data.ids)
        : semesterClasses.getAll());

    response.send({ classes });
});
