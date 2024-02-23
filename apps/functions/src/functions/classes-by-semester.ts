import { Functions } from '@sol/firebase/functions';

import { Semester } from '@sol/firebase/classes/semester';
import { SemesterClass } from '@sol/classes/domain';

export const classesBySemester = Functions.endpoint.handle<
    Record<string, Array<string> | 'all'> // class ids by semester id
>(async (request, response) => {
    const allClasses: Array<SemesterClass> = [];

    try {
        for (const [semesterId, classIdsOrAll] of Object.entries(
            request.body.data
        )) {
            const classes = await _classesBySemester(semesterId, classIdsOrAll);
            allClasses.push(...classes);
        }

        response.send({ classes: allClasses });
    } catch (error) {
        response.status(500).send({ error: 'Internal server error' });
    }
});

const _classesBySemester = async (
    semesterId: string,
    classIdsOrAll: Array<string> | 'all'
) => {
    const semesterClasses = Semester.of(semesterId).classes;
    return await (classIdsOrAll === 'all'
        ? semesterClasses.getAll()
        : semesterClasses.getMany(classIdsOrAll));
};
