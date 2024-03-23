import { V1Functions } from '@sol/firebase/functions';

import { V1Semester } from '@sol/firebase/classes/semester';

export const classGroups = V1Functions.endpoint.handle<{
    query: Array<{ id: string; semesterId: string }>;
}>(async (request, response) => {
    const activeSemesterGroups = V1Semester.active().groups;

    const query = request.body.data.query;

    const groupIdsBySemesterId = query.reduce(
        (acc, { id, semesterId }) => {
            if (!acc[semesterId]) {
                acc[semesterId] = [];
            }
            acc[semesterId].push(id);
            return acc;
        },
        {} as Record<string, Array<string>>
    );

    const groups = await (groupIdsBySemesterId
        ? Object.fromEntries(
              await Promise.all(
                  Object.entries(groupIdsBySemesterId).map(
                      async ([semesterId, groupIds]) =>
                          [
                              semesterId,
                              await V1Semester.of(semesterId).groups.getMany(
                                  groupIds
                              ),
                          ] as const
                  )
              )
          )
        : activeSemesterGroups.getOpenForRegistration());

    response.send({ groups });
});
