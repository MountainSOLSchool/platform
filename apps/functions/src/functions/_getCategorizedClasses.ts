import { Semester } from '@sol/firebase/classes/semester';

export async function _getCategorizedClasses(semesterId: string) {
    const semester = await Semester.of(semesterId);
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
