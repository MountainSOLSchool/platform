import { provideState } from '@ngrx/store';
import { requestFeature } from './request.feature';

export const provideRequests = () => [provideState(requestFeature)];
