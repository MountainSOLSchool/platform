import { AuthUtility, Functions } from '@sol/firebase/functions';
import { StudentRepository } from '@sol/student/repository';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
import { SemesterEnrollment } from '@sol/classes/domain';

export const myEnrolledStudents = Functions.endpoint.handle(
    async (request, response) => {
        const user = await AuthUtility.getUserFromRequest(request, response);

        if (!user) {
            response.send({ studentIds: [] });
            return;
        }
        const studentIds = await AuthUtility.getUserStudentIds(user);

        if (studentIds.length === 0) {
            response.send({ students: [] });
            return;
        }

        const studentOrEmptyLookups = await Promise.all(
            studentIds.map(async (id) => await StudentRepository.get(id))
        );

        const enrollmentsByStudent =
            await ClassEnrollmentRepository.getEnrollmentsForStudents(
                studentIds
            );

        const students = studentOrEmptyLookups
            .filter(
                (student): student is NonNullable<typeof student> => !!student
            )
            .map(({ id, first_name, last_name, birth_date, completed_units }) => {
                const currentClasses = enrollmentsByStudent
                    .filter((e: SemesterEnrollment) => e.studentId === id)
                    .flatMap((e: SemesterEnrollment) =>
                        'classes' in e ? e.classes : []
                    );

                return {
                    id,
                    name: `${first_name} ${last_name}`,
                    birthday: birth_date,
                    completedUnitsCount: completed_units?.length ?? 0,
                    currentClasses: currentClasses.map(
                        (c: { id: string; semesterId: string }) => ({
                            id: c.id,
                            semesterId: c.semesterId,
                        })
                    ),
                };
            });

        response.send({ students });
    }
);
