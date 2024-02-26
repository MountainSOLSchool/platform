import { Functions } from '@sol/firebase/functions';

import { Semester } from '@sol/firebase/classes/semester';

export const classes = Functions.endpoint.handle<
    | {
          query: Array<{ id: string; semesterId: string }>;
      }
    | undefined
>(async (request, response) => {
    const activeSemesterClasses = Semester.active().classes;

    const query = request.body.data?.query;

    const classIdsBySemesterId = query?.reduce(
        (acc, { id, semesterId }) => {
            if (!acc[semesterId]) {
                acc[semesterId] = [];
            }
            acc[semesterId].push(id);
            return acc;
        },
        {} as Record<string, Array<string>>
    );

    const classes = await (classIdsBySemesterId
        ? Object.fromEntries(
              await Promise.all(
                  Object.entries(classIdsBySemesterId).map(
                      async ([semesterId, classIds]) =>
                          [
                              semesterId,
                              await Semester.of(semesterId).classes.getMany(
                                  classIds
                              ),
                          ] as const
                  )
              )
          )
        : activeSemesterClasses.getAll());

    response.send({ classes });
});
