import { Functions } from '@sol/firebase/functions';

import { Semester } from '@sol/firebase/classes/semester';
import { _getClasses } from './_getClasses';
import { _getClassesForSemester } from './_getClassesForSemester';

export const classes = Functions.endpoint.handle<
    | {
          query:
              | Array<{ id: string; semesterId: string }>
              | { semesterId: string };
      }
    | undefined
>(async (request, response) => {
    const activeSemesterClasses = Semester.active().classes;

    const query = request.body.data?.query;

    const classes = query
        ? 'semesterId' in query
            ? await _getClassesForSemester(query.semesterId)
            : await _getClasses(query)
        : await activeSemesterClasses.getAll();

    response.send({ classes });
});
