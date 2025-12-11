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
        const studentOrEmptyLookups = await Promise.all(
            studentIds.map(async (id) => await StudentRepository.get(id))
        );

        // Get all enrollments for the user to find current classes per student
        const allEnrollments =
            await ClassEnrollmentRepository.getCurrentSemesterEnrollments();
        const userEnrollments = allEnrollments.filter(
            (e: SemesterEnrollment) => studentIds.includes(e.studentId)
        );

        const students = studentOrEmptyLookups
            .filter(
                (student): student is NonNullable<typeof student> => !!student
            )
            .map(({ id, first_name, last_name, birth_date, completed_units }) => {
                // Get current class enrollments for this student
                const studentEnrollments = userEnrollments.filter(
                    (e: SemesterEnrollment) => e.studentId === id
                );
                const currentClasses = studentEnrollments.flatMap(
                    (e: SemesterEnrollment) =>
                        'classes' in e ? e.classes : []
                );

                // Count completed units
                const completedUnitsCount = completed_units?.length ?? 0;

                return {
                    id,
                    name: `${first_name} ${last_name}`,
                    birthday: birth_date,
                    completedUnitsCount,
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
