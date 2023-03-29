import { configureStore } from '@reduxjs/toolkit';
import testStore from './testStore';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { applyMiddleware } from 'redux';
import { load100 } from './testStoreEpic';
import paths from './paths';
import { loadPaths } from './pathsEpic';
import unitStore from './unitStore';
import { loadUnits } from './unitEpic';
import testStudent from './testStudent';
import { loadTestStudent } from './testStudentEpic';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        counter: testStore,
        paths: paths,
        units: unitStore,
        student: testStudent,
    },
    middleware: () => [epicMiddleware],
});

export const rootEpic = combineEpics(
    loadPaths,
    load100,
    loadUnits,
    loadTestStudent
);

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
