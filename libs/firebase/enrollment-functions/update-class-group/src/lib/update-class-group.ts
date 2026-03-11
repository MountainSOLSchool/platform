import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    UpdateClassGroupRequest,
    UpdateClassGroupResponse,
} from '@sol/ts/firebase/api-types';

export type { UpdateClassGroupRequest, UpdateClassGroupResponse };

export const updateClassGroup = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<UpdateClassGroupRequest>(async (request, response) => {
        const data = request.body.data;

        if (!data.semesterId || !data.groupId) {
            response
                .status(400)
                .send({ error: 'semesterId and groupId are required' });
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

        // Verify group exists
        const groupRef = db.doc(
            `semesters/${data.semesterId}/groups/${data.groupId}`
        );
        const existingGroup = await groupRef.get();
        if (!existingGroup.exists) {
            response.status(404).send({ error: 'Group not found' });
            return;
        }

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

        // Verify no class is already in another group (excluding this group)
        const existingGroups = await db
            .collection(`semesters/${data.semesterId}/groups`)
            .get();

        for (const groupDoc of existingGroups.docs) {
            if (groupDoc.id === data.groupId) continue;
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

        await groupRef.update({
            name: data.name.trim(),
            cost: data.cost,
            classIds: data.classIds,
        });

        const result: UpdateClassGroupResponse = { success: true };
        response.send(result);
    });
