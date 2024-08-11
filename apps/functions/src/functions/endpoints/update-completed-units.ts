import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import { StudentRepository } from '@sol/student/repository';

export const updateCompletedUnits = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<{
        studentId: string;
        completedUnitIds: Array<string>;
    }>(async (request, response) => {
        // TODO: add auditing (who updated what and when)

        const { studentId, completedUnitIds } = request.body.data;

        StudentRepository.update({
            id: studentId,
            completed_units: completedUnitIds.map((id) => {
                return DatabaseUtility.getDatabase().doc(`units/${id}`);
            }),
        });

        response.send();
    });
