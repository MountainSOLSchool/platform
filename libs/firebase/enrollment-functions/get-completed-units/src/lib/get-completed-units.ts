import { Functions, Role } from '@sol/firebase/functions';
import { StudentRepository } from '@sol/student/repository';

export const getCompletedUnits = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<{
        studentId: string;
    }>(async (request, response) => {
        const { studentId } = request.body.data;

        const student = await StudentRepository.get(studentId);

        const completedUnits = [];

        if (student?.completed_units) {
            for (const item of student.completed_units) {
                if ('recorded_date' in item) {
                    completedUnits.push({
                        type: 'repeatable',
                        unitId: item.unit.id,
                        recordedDate: item.recorded_date,
                        appliedToPath: item.applied_to_path?.id
                    });
                } else {
                    completedUnits.push({
                        type: 'regular',
                        unitId: item.id
                    });
                }
            }
        }

        response.send({ completedUnits });
    });