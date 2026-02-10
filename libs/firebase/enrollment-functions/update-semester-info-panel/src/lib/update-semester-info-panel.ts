import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    AdditionalInfoPanel,
} from '@sol/classes/domain';

export interface UpdateSemesterInfoPanelRequest {
    semesterId: string;
    panel: AdditionalInfoPanel;
}

export interface UpdateSemesterInfoPanelResponse {
    success: boolean;
}

export const updateSemesterInfoPanel = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<UpdateSemesterInfoPanelRequest>(async (request, response) => {
        const { semesterId, panel } = request.body.data;

        if (!semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }

        if (!panel) {
            response.status(400).send({ error: 'panel is required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const semesterRef = db.doc(`semesters/${semesterId}`);

        const semesterDoc = await semesterRef.get();
        if (!semesterDoc.exists) {
            response.status(404).send({ error: 'Semester not found' });
            return;
        }

        await semesterRef.update({
            additionalInfoPanel: panel,
        });

        const result: UpdateSemesterInfoPanelResponse = { success: true };
        response.send(result);
    });
