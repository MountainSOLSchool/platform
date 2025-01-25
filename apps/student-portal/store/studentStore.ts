import { createSlice } from '@reduxjs/toolkit';

export const student = createSlice({
    name: 'studentSlice',
    initialState: {
        name: '',
        completedUnits: [],
    },
    reducers: {
        loadedTestStudent: (state, action) => {
            return action.payload;
        },
        setStudentId: (state, action: { payload: string }) => {
            // empty
        },
        setStudent: (state, action) => action.payload,
    },
});

export const { loadedTestStudent, setStudentId, setStudent } = student.actions;

export default student.reducer;
