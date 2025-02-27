import { Functions, Role } from '@sol/firebase/functions';
import { StudentRepository } from '@sol/student/repository';
import { DocumentReference } from 'firebase-admin/firestore';

export const getCompletedUnits = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<{
        studentId: string;
    }>(async (request, response) => {
        const student = await StudentRepository.get(
            request.body.data.studentId
        );

        response.send({
            completedUnitIds:
                student?.completed_units?.filter((unit): unit is { id: string } => !('recorded_date' in unit)).map(
                    (unit) => (unit).id
                ) ?? [],
            completedRepeatableUnits:
                student?.completed_units?.filter((unit): unit is {
                    recorded_date: string;
                    unit: DocumentReference;
                    applied_to_path?: DocumentReference;
                } => 'recorded_date' in unit).map(unit => ({
                    unitId: unit.unit.id,
                    recordedDate: unit.recorded_date,
                    appliedToPathId: unit.applied_to_path?.id
                }))
        });
    });
