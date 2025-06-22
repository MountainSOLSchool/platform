import { Functions, Role } from '@sol/firebase/functions';
import { StudentRepository } from '@sol/student/repository';
import { DatabaseUtility } from '@sol/firebase/database';

export const updateCompletedUnits = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<{
        studentId: string;
        completedUnitIds: Array<string>;
        repeatableCompletions: Array<{
            unitId: string;
            recordedDate: string;
            appliedToPath?: string;
        }>;
    }>(async (request, response) => {
        // TODO: add auditing (who updated what and when)

        const { studentId, completedUnitIds, repeatableCompletions } = request.body.data;

        const completedUnits = [
            ...completedUnitIds.map(id =>
                DatabaseUtility.getDatabase().doc(`units/${id}`)
            ),

            ...(repeatableCompletions || []).map(completion => ({
                recorded_date: completion.recordedDate,
                unit: DatabaseUtility.getDatabase().doc(`units/${completion.unitId}`),
                applied_to_path: completion.appliedToPath
                    ? DatabaseUtility.getDatabase().doc(`paths/${completion.appliedToPath}`)
                    : undefined
            }))
        ];

        await StudentRepository.update({
            id: studentId,
            completed_units: completedUnits
        });

        response.send({ success: true });
    });