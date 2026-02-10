/**
 * Semester Info Panel API Types
 *
 * Shared types for semester additional info panel CRUD operations
 * between Angular frontend and Firebase Cloud Functions backend.
 */

import type { AdditionalInfoPanel } from '@sol/classes/domain';

export type { AdditionalInfoPanel };

export interface GetSemesterInfoPanelRequest {
    semesterId: string;
}

export interface GetSemesterInfoPanelResponse {
    panel: AdditionalInfoPanel | null;
}

export interface UpdateSemesterInfoPanelRequest {
    semesterId: string;
    panel: AdditionalInfoPanel;
}

export interface UpdateSemesterInfoPanelResponse {
    success: boolean;
}
