import { createFeature, createReducer } from '@ngrx/store';
import { Path } from '../models/path';

export interface PathsFeatureState {
  paths: Array<Path>;
}

export const pathsFeatureInitialState: PathsFeatureState = {
  paths: [
    {
      name: 'Scout',
      color: 'rgba(235, 0, 0, 0.5)'
    },
    {
      name: 'Medic',
      color: 'rgba(0, 84, 7, 0.5)'
    },
    {
        name: 'Herbalist',
        color: 'rgba(113, 61, 0, 0.5)'
    },
    {
        name: 'Provider',
	color: 'rgba(235, 191, 0, 0.5)'
    }
  ],
};

export const pathsFeature = createFeature({
  name: 'pathsFeature',
  reducer: createReducer(pathsFeatureInitialState),
});
