import { Functions, Role } from '@sol/firebase/functions';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
import { _getClasses } from '@sol/firebase/enrollment-functions/shared';
import { SemesterEnrollment } from '@sol/classes/domain';

export const adminEnrollments = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const enrollments =
            await ClassEnrollmentRepository.getCurrentSemesterEnrollments();

        const classNamesById = await resolveClassNames(enrollments);

        const enriched = enrollments.map((enrollment) => ({
            ...enrollment,
            classNames: classRefsOf(enrollment).map(
                ({ id }) => classNamesById.get(id) ?? id
            ),
        }));

        response.send(enriched);
    });

function classRefsOf(
    enrollment: SemesterEnrollment
): Array<{ id: string; semesterId: string }> {
    return 'classes' in enrollment
        ? enrollment.classes
        : enrollment.classIds.map((id) => ({ id, semesterId: '' }));
}

/**
 * Resolves class titles for every class referenced across the given
 * enrollments. Classes are deduplicated so each is only fetched once, and a
 * deleted/missing class degrades gracefully (it is simply omitted from the map,
 * leaving the caller to fall back to the raw id).
 */
async function resolveClassNames(
    enrollments: Array<SemesterEnrollment>
): Promise<Map<string, string>> {
    const uniqueRefs = new Map<string, { id: string; semesterId: string }>();
    for (const enrollment of enrollments) {
        for (const ref of classRefsOf(enrollment)) {
            uniqueRefs.set(ref.id, ref);
        }
    }

    const namesById = new Map<string, string>();
    await Promise.all(
        [...uniqueRefs.values()].map(async (ref) => {
            try {
                const [aClass] = Object.values(await _getClasses([ref])).flat();
                if (aClass) {
                    namesById.set(ref.id, aClass.title);
                }
            } catch {
                // Class may have been deleted since enrollment; fall back to id.
            }
        })
    );
    return namesById;
}
