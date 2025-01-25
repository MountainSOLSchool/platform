import { configureStore } from '@reduxjs/toolkit';
import login from '../app/login/login.slice';
import updateUnits from '../components/Units/UnitsStore';
import { createEpicMiddleware } from 'redux-observable';
import paths from './paths';
import { loadPaths } from './pathsEpic';
import unitStore from './unitStore';
import { loadUnits } from './unitEpic';
import student from './studentStore';
import { loadStudent } from './studentEpic';
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
    middleware: () => [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
