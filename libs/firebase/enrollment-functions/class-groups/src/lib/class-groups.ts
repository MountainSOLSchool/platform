import { Functions } from '@sol/firebase/functions';
import { Semester } from '@sol/firebase/classes/semester';

export const classGroups = Functions.endpoint.handle<{
    query: Array<{ id: string; semesterId: string }>;
}>(async (request, response) => {
    const activeSemesterGroups = Semester.active().groups;

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
                            await Semester.of(semesterId).groups.getMany(
                                groupIds
                            ),
                        ] as const
                )
            )
        )
        : activeSemesterGroups.getOpenForRegistration());

    response.send({ groups });
});
