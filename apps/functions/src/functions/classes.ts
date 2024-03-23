import { V1Functions } from '@sol/firebase/functions';

import { V1Semester } from '@sol/firebase/classes/semester';
import { _getClasses } from './_getClasses';

export const classes = V1Functions.endpoint.handle<
    | {
          query:
              | Array<{ id: string; semesterId: string }>
              | { semesterId: string };
      }
    | undefined
>(async (request, response) => {
    const activeSemesterClasses = V1Semester.active().classes;

    const query = request.body.data?.query;

    const classes = query
        ? 'semesterId' in query
            ? await V1Semester.of(query.semesterId).classes.getAll()
            : await _getClasses(query)
        : await activeSemesterClasses.getAll();

    response.send({ classes });
});
