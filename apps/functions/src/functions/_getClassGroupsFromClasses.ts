import { SemesterClassGroup } from '@sol/classes/domain';
import { V1Semester } from '@sol/firebase/classes/semester';

export async function _getClassGroupsFromClasses(
    classQuery: Array<{ id: string; semesterId: string }>
): Promise<{ [semesterId: string]: Array<SemesterClassGroup> }> {
    const classIdsBySemesterId = classQuery.reduce(
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
                        await V1Semester.of(semesterId).groups.getByClassIds(
                            classIds
                        ),
                    ] as const
            )
        )
    );
    return groups;
}
