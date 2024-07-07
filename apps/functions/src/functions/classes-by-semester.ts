import { Functions } from '@sol/firebase/functions';

import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { _getCategorizedClasses } from './_getCategorizedClasses';

export const classesBySemester = Functions.endpoint.handle<
    Array<string> // semester ids
>(async (request, response) => {
    const theClassesBySemester: {
        [semesterId: string]: {
            classes: SemesterClass[];
            groups: SemesterClassGroup[];
        };
    } = {};

    try {
        const semesterIds = request.body.data;
        for (const semesterId of semesterIds) {
            const { classesNotInGroups, groups } =
                await _getCategorizedClasses(semesterId);
            theClassesBySemester[semesterId] = {
                classes: classesNotInGroups,
                groups,
            };
        }
        response.send(theClassesBySemester);
    } catch (e) {
        response
            .status(500)
            .send({ error: 'Error fetching classes by semester' });
    }
});
