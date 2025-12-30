import { AuthUtility, Functions } from '@sol/firebase/functions';
import { StudentRepository } from '@sol/student/repository';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
import { SemesterEnrollment } from '@sol/classes/domain';

export const myEnrolledStudents = Functions.endpoint.handle(
    async (request, response) => {
        const user = await AuthUtility.getUserFromRequest(request, response);

        if (!user) {
            response.send({ students: [] });
            return;
        }

        const studentIds = await AuthUtility.getUserStudentIds(user);
        const studentOrEmptyLookups = await Promise.all(
            studentIds.map(async (id) => await StudentRepository.get(id))
        );

        const allEnrollments =
            await ClassEnrollmentRepository.getCurrentSemesterEnrollments();
        const enrollmentsByStudent = allEnrollments.filter(
            (e: SemesterEnrollment) => studentIds.includes(e.studentId)
        );

        const students = studentOrEmptyLookups
            .filter(
                (student): student is NonNullable<typeof student> => !!student
            )
            .map(({ id, first_name, last_name, birth_date, completed_units }) => {
                const currentClasses = enrollmentsByStudent
                    .filter((e: SemesterEnrollment) => e.studentId === id)
                    .flatMap((e: SemesterEnrollment) =>
                        'classes' in e && Array.isArray(e.classes)
                            ? e.classes
                            : []
                    )
                    .filter(
                        (c): c is { id: string; semesterId: string } =>
                            c != null && typeof c.id === 'string'
                    );

                return {
                    id,
                    name: `${first_name} ${last_name}`,
                    birthday: birth_date,
                    completedUnitsCount: completed_units?.length ?? 0,
                    currentClasses: currentClasses.map((c) => ({
                        id: c.id,
                        semesterId: c.semesterId,
                    })),
                };
            });

        response.send({ students });
    }
);
