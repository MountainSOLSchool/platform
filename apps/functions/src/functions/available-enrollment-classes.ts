import { Functions } from '@sol/firebase/functions';
import { _getCategorizedClasses } from './_getCategorizedClasses';
import { _getSemestersAvailableToEnroll } from './_getSemestersAvailableToEnroll';

export const availableEnrollmentClasses = Functions.endpoint.handle(
    async (request, response) => {
        const semesters = await _getSemestersAvailableToEnroll();

        const categorizedClassesBySemester = await Promise.all(
            semesters.map(async (semester) => {
                const { classesNotInGroups: classes, groups } =
                    await _getCategorizedClasses(semester.id);
                return [
                    semester.id,
                    {
                        classes,
                        groups,
                    },
                ] as const;
            })
        ).then((entries) => Object.fromEntries(entries));

        response.send(categorizedClassesBySemester);
    }
);
