import { configureStore, Tuple } from '@reduxjs/toolkit';
import login from './login/loginSlice';
import updateUnits from './updateUnits/updateUnitsSlice';
import { createEpicMiddleware } from 'redux-observable';
import paths from './paths/pathsSlice';
import { loadPaths } from './paths/pathsEpic';
import unitStore from './unit/unitSlice';
import { loadUnits } from './unit/unitEpic';
import student from './student/studentSlice';
import { loadStudent } from './student/studentEpic';
import { createRootEpic } from '@sharakai/use-redux-observable-epic';

const epics = [loadPaths, loadUnits, loadStudent];

export const { rootEpic, addEpic } = createRootEpic(epics);

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        paths: paths,
        units: unitStore,
        student: student,
        login: login,
        updateUnits: updateUnits,
    },
    middleware: () => new Tuple(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
