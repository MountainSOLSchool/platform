import { SemesterClassGroup } from '@sol/classes/domain';
import { Semester } from '@sol/firebase/classes/semester';

export async function _getClassGroups(
    query: Array<{ id: string; semesterId: string }>
): Promise<{ [semesterId: string]: Array<SemesterClassGroup> }> {
    const classIdsBySemesterId = query.reduce(
        (acc, { id, semesterId }) => {
            if (!acc[semesterId]) {
                acc[semesterId] = [];
            }
            acc[semesterId].push(id);
            return acc;
        },
        {} as Record<string, Array<string>>
    );

    const groups = await Object.fromEntries(
        await Promise.all(
            Object.entries(classIdsBySemesterId).map(
                async ([semesterId, classIds]) =>
                    [
                        semesterId,
                        await Semester.of(semesterId).groups.getMany(classIds),
                    ] as const
            )
        )
    );
    return groups;
}
