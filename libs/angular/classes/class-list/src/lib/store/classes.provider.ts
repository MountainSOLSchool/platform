import { provideState } from '@ngrx/store';
import { classesFeature } from './classes.feature';
import { provideEffects } from '@ngrx/effects';
import { ClassesEffects } from './classes.effects';

export const provideClassList = () => [
    provideState(classesFeature),
    provideEffects(ClassesEffects),
];
