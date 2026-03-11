import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    CreateClassGroupRequest,
    CreateClassGroupResponse,
} from '@sol/ts/firebase/api-types';

export type { CreateClassGroupRequest, CreateClassGroupResponse };

export const createClassGroup = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<CreateClassGroupRequest>(async (request, response) => {
        const data = request.body.data;

        if (!data.semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }

        if (!data.name?.trim()) {
            response.status(400).send({ error: 'name is required' });
            return;
        }

        if (data.cost == null || data.cost < 0) {
            response
                .status(400)
                .send({ error: 'cost must be a non-negative number' });
            return;
        }

        if (!data.classIds || data.classIds.length < 2) {
            response
                .status(400)
                .send({ error: 'At least 2 classes are required for a group' });
            return;
        }

        const db = DatabaseUtility.getDatabase();

        // Verify all classes exist in the semester
        for (const classId of data.classIds) {
            const classDoc = await db
                .doc(`semesters/${data.semesterId}/classes/${classId}`)
                .get();
            if (!classDoc.exists) {
                response.status(400).send({
                    error: `Class ${classId} not found in semester ${data.semesterId}`,
                });
                return;
            }
        }

        // Verify no class is already in another group
        const existingGroups = await db
            .collection(`semesters/${data.semesterId}/groups`)
            .get();

        for (const groupDoc of existingGroups.docs) {
            const groupData = groupDoc.data();
            const existingClassIds: string[] = groupData.classIds || [];
            const overlap = data.classIds.filter((id) =>
                existingClassIds.includes(id)
            );
            if (overlap.length > 0) {
                response.status(400).send({
                    error: `Class(es) already belong to group "${groupData.name}"`,
                });
                return;
            }
        }

        const groupDoc = {
            name: data.name.trim(),
            cost: data.cost,
            classIds: data.classIds,
        };

        const docRef = await db
            .collection(`semesters/${data.semesterId}/groups`)
            .add(groupDoc);

        const result: CreateClassGroupResponse = {
            success: true,
            groupId: docRef.id,
        };

        response.send(result);
    });
