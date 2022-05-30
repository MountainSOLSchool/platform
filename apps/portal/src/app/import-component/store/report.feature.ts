import { createFeature, createReducer, on } from '@ngrx/store';
import { reportEffectsActions } from './report.actions';

type ReportComponentFeatureState = {
    inProgressClassFormDownloads: Record<string, boolean>;
    inProgressCopyClassEmails: Record<string, boolean>;
};

const initialState: ReportComponentFeatureState = {
    inProgressClassFormDownloads: {},
    inProgressCopyClassEmails: {},
};

export const reportComponentFeature = createFeature({
    name: 'reportComponentFeature',
    reducer: createReducer(
        initialState,
        on(
            reportEffectsActions.startedDownloadingForms,
            (state, { className }): ReportComponentFeatureState => ({
                ...state,
                inProgressClassFormDownloads: {
                    ...state.inProgressClassFormDownloads,
                    [className]: true,
                },
            })
        ),
        on(
            reportEffectsActions.finishedDownloadingForms,
            (state, { className }): ReportComponentFeatureState => {
                return {
                    ...state,
                    inProgressClassFormDownloads: {
                        ...state.inProgressClassFormDownloads,
                        [className]: false,
                    },
                };
            }
        ),
        on(
            reportEffectsActions.startedDownloadingClassEmails,
            (state, { className }): ReportComponentFeatureState => ({
                ...state,
                inProgressCopyClassEmails: {
                    ...state.inProgressCopyClassEmails,
                    [className]: true,
                },
            })
        ),
        on(
            reportEffectsActions.finishedDownloadingClassEmails,
            (state, { className }): ReportComponentFeatureState => {
                return {
                    ...state,
                    inProgressCopyClassEmails: {
                        ...state.inProgressCopyClassEmails,
                        [className]: false,
                    },
                };
            }
        )
    ),
});
