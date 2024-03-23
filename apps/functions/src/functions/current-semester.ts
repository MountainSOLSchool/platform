import { V1Functions } from '@sol/firebase/functions';

import { V1Semester } from '@sol/firebase/classes/semester';

export const currentSemester = V1Functions.endpoint.handle<
    | {
          ids: Array<string>;
      }
    | undefined
>(async (request, response) => {
    const semesterClasses = V1Semester.active().classes;
    const classes = await (request.body.data
        ? semesterClasses.getMany(request.body.data.ids)
        : semesterClasses.getAll());

    response.send({ classes });
});
