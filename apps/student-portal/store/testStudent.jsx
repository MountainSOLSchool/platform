import { createSlice } from '@reduxjs/toolkit';

export const testStudent = createSlice({
    name: 'test student',
    initialState: {
        name: '',
        completedUnits: [],
    },
    reducers: {
        loadedTestStudent: (state, action) => {
            return action.payload;
        },
        requestTestStudent: () => {},
        setTestStudent: (state, action) => action.payload,
    },
});

export const { loadedTestStudent, requestTestStudent, setTestStudent } =
    testStudent.actions;

export default testStudent.reducer;
