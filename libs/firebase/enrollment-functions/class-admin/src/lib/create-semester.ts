import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';

export interface CreateSemesterRequest {
    name: string;
}

export interface CreateSemesterResponse {
    id: string;
    name: string;
}

export const createSemester = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<CreateSemesterRequest>(async (request, response) => {
        const data = request.body.data;

        if (!data.name || !data.name.trim()) {
            response.status(400).send({ error: 'Semester name is required' });
            return;
        }

        const semestersCollection =
            await DatabaseUtility.getCollectionRef('semesters');

        const newSemesterRef = await semestersCollection.add({
            displayName: data.name.trim(),
        });

        response.send({
            id: newSemesterRef.id,
            name: data.name.trim(),
        } as CreateSemesterResponse);
    });
