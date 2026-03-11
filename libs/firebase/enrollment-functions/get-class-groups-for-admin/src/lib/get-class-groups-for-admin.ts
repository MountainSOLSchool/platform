import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    GetClassGroupsForAdminRequest,
    GetClassGroupsForAdminResponse,
    AdminClassGroup,
} from '@sol/ts/firebase/api-types';

export type {
    GetClassGroupsForAdminRequest,
    GetClassGroupsForAdminResponse,
    AdminClassGroup,
};

export const getClassGroupsForAdmin = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<GetClassGroupsForAdminRequest>(async (request, response) => {
        const { semesterId } = request.body.data;

        if (!semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const groupsSnapshot = await db
            .collection(`semesters/${semesterId}/groups`)
            .get();

        const groups: AdminClassGroup[] = await Promise.all(
            groupsSnapshot.docs.map(async (doc) => {
                const data = doc.data();
                const classIds: string[] = data.classIds || [];

                const classes = await Promise.all(
                    classIds.map(async (classId) => {
                        const classDoc = await db
                            .doc(
                                `semesters/${semesterId}/classes/${classId}`
                            )
                            .get();
                        const classData = classDoc.data();
                        return {
                            id: classDoc.id,
                            name: classData?.name || '',
                            cost: Number(classData?.cost) || 0,
                        };
                    })
                );

                return {
                    id: doc.id,
                    name: data.name || '',
                    cost: Number(data.cost) || 0,
                    classes,
                };
            })
        );

        groups.sort((a, b) => a.name.localeCompare(b.name));

        const result: GetClassGroupsForAdminResponse = { groups };
        response.send(result);
    });
