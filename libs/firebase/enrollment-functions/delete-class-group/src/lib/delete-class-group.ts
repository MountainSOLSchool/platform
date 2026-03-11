import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    DeleteClassGroupRequest,
    DeleteClassGroupResponse,
} from '@sol/ts/firebase/api-types';

export type { DeleteClassGroupRequest, DeleteClassGroupResponse };

export const deleteClassGroup = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<DeleteClassGroupRequest>(async (request, response) => {
        const { semesterId, groupId } = request.body.data;

        if (!semesterId || !groupId) {
            response
                .status(400)
                .send({ error: 'semesterId and groupId are required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const groupRef = db.doc(
            `semesters/${semesterId}/groups/${groupId}`
        );

        const existingGroup = await groupRef.get();
        if (!existingGroup.exists) {
            response.status(404).send({ error: 'Group not found' });
            return;
        }

        await groupRef.delete();

        const result: DeleteClassGroupResponse = { success: true };
        response.send(result);
    });
