import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';

export interface UpdateActiveSemesterConfigRequest {
    activeSemesterId: string;
    otherEnrollableSemesterIds: string[];
}

export interface UpdateActiveSemesterConfigResponse {
    success: boolean;
}

export const updateActiveSemesterConfig = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<UpdateActiveSemesterConfigRequest>(async (request, response) => {
        const data = request.body.data;

        if (!data.activeSemesterId) {
            response
                .status(400)
                .send({ error: 'Active semester ID is required' });
            return;
        }

        const activeSemesterDoc = await DatabaseUtility.getDocumentRef(
            'config/activeSemester'
        );
        await activeSemesterDoc.set({ id: data.activeSemesterId });

        const otherSemestersDoc = await DatabaseUtility.getDocumentRef(
            'config/otherSemestersAvailableToEnroll'
        );
        await otherSemestersDoc.set({
            list: data.otherEnrollableSemesterIds ?? [],
        });

        response.send({ success: true } as UpdateActiveSemesterConfigResponse);
    });
