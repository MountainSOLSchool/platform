import { configureStore } from '@reduxjs/toolkit';
import testStore from './testStore';
import login from '../app/login/login.slice';
import { createEpicMiddleware } from 'redux-observable';
import { load100 } from './testStoreEpic';
import paths from './paths';
import { loadPaths } from './pathsEpic';
import unitStore from './unitStore';
import { loadUnits } from './unitEpic';
import testStudent from './testStudent';
import { loadTestStudent } from './testStudentEpic';
import { createRootEpic } from '@sharakai/use-redux-observable-epic';

const epics = [loadPaths, load100, loadUnits, loadTestStudent];

export const { rootEpic, addEpic } = createRootEpic(epics);

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        counter: testStore,
        paths: paths,
        units: unitStore,
        student: testStudent,
        login: login,
    },
    middleware: () => [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
