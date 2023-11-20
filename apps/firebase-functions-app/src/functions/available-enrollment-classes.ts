import { Functions } from '@sol/firebase/functions';
import { Semester } from '@sol/firebase/classes/semester';

async function getCategorizedClasses() {
    const semester = await Semester.active();
    const classes = await semester.classes.getOpenForRegistration();
    const groups = await semester.groups.getOpenForRegistration();
    const idsOfClassesInGroups = groups.flatMap((g) =>
        g.classes.map((c) => c.id)
    );
    const classesNotInGroups = classes.filter(
        (c) => !idsOfClassesInGroups.includes(c.id)
    );
    return { groups, classesNotInGroups };
}

export const availableEnrollmentClasses = Functions.endpoint.handle(
    async (request, response) => {
        const { groups, classesNotInGroups } = await getCategorizedClasses();

        response.send({ classes: classesNotInGroups, groups });
    }
);
