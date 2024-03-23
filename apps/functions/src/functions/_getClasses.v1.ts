import { SemesterClass } from '@sol/classes/domain';
import { V1Semester } from '@sol/firebase/classes/semester';

export async function _getClassesV1(
    query: Array<{ id: string; semesterId: string }>
): Promise<{ [semesterId: string]: Array<SemesterClass> }> {
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

    const classes = await Object.fromEntries(
        await Promise.all(
            Object.entries(classIdsBySemesterId).map(
                async ([semesterId, classIds]) =>
                    [
                        semesterId,
                        await V1Semester.of(semesterId).classes.getMany(
                            classIds
                        ),
                    ] as const
            )
        )
    );
    return classes;
}
