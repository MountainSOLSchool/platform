import { Semester } from '@sol/firebase/classes/semester';

export async function _getCategorizedClasses(
    semesterId: string,
    config: {
        onlyOpenForRegistration?: boolean;
    } = {}
) {
    const semester = await Semester.of(semesterId);
    console.log(semester);
    const getMethodName = config.onlyOpenForRegistration
        ? 'getOpenForRegistration'
        : 'getAll';
    const classes = await semester.classes[getMethodName]();
    const groups = await semester.groups[getMethodName]();
    const idsOfClassesInGroups = groups.flatMap((g) =>
        g.classes.map((c) => c.id)
    );
    const classesNotInGroups = classes.filter(
        (c) => !idsOfClassesInGroups.includes(c.id)
    );
    return { groups, classesNotInGroups };
}
