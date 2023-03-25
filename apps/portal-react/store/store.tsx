import { configureStore } from '@reduxjs/toolkit';
import testStore from './testStore';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { applyMiddleware } from 'redux';
import { load100 } from './testStoreEpic';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        counter: testStore,
    },
    middleware: () => [epicMiddleware],
});

export const rootEpic = combineEpics(load100);

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
