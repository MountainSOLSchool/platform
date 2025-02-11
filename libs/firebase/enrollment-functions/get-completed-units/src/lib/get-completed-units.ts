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
                student?.completed_units?.map(
                    (unit) => (unit as DocumentReference).id
                ) ?? [],
        });
    });
