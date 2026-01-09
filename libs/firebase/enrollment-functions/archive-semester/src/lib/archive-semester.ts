import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';

export interface ArchiveSemesterRequest {
    semesterId: string;
    archived: boolean;
}

export interface ArchiveSemesterResponse {
    success: boolean;
}

export const archiveSemester = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<ArchiveSemesterRequest>(async (request, response) => {
        const { semesterId, archived } = request.body.data;

        if (!semesterId) {
            response.status(400).send({ error: 'Semester ID is required' });
            return;
        }

        const semesterDoc = await DatabaseUtility.getDocumentRef(
            `semesters/${semesterId}`
        );

        const semesterSnapshot = await semesterDoc.get();
        if (!semesterSnapshot.exists) {
            response.status(404).send({ error: 'Semester not found' });
            return;
        }

        await semesterDoc.update({ archived: archived ?? true });

        response.send({
            success: true,
        } as ArchiveSemesterResponse);
    });
