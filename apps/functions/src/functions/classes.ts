import { Functions } from '@sol/firebase/functions';

import { Semester } from '@sol/firebase/classes/semester';
import { NewClassRepository } from '@sol/classes/repository';

export const classes = Functions.endpoint.handle<
    | {
          ids: Array<string>;
      }
    | undefined
>(async (request, response) => {
    const semesterClasses = Semester.active().classes;
    const classes = await (request.body.data
        ? NewClassRepository.of().getMany(request.body.data.ids)
        : semesterClasses.getAll());

    response.send({ classes });
});
