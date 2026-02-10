import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    AdditionalInfoPanel,
} from '@sol/classes/domain';

export interface GetSemesterInfoPanelRequest {
    semesterId: string;
}

export interface GetSemesterInfoPanelResponse {
    panel: AdditionalInfoPanel | null;
}

export const getSemesterInfoPanel = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<GetSemesterInfoPanelRequest>(async (request, response) => {
        const { semesterId } = request.body.data;

        if (!semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const semesterDoc = await db.doc(`semesters/${semesterId}`).get();

        if (!semesterDoc.exists) {
            response.status(404).send({ error: 'Semester not found' });
            return;
        }

        const data = semesterDoc.data();
        const panel = (data?.additionalInfoPanel as AdditionalInfoPanel) ?? null;

        const result: GetSemesterInfoPanelResponse = { panel };
        response.send(result);
    });
