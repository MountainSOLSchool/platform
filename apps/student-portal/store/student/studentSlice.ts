import { createSlice } from '@reduxjs/toolkit';

export const student = createSlice({
    name: 'studentSlice',
    initialState: {
        name: '',
        completedUnits: [],
    },
    reducers: {
        loadedStudentCompletedUnits: (state, action) => {
            return action.payload;
        },
        setStudentId: (_, action: { payload: string }) => {
            // empty
        },
        setStudent: (state, action) => action.payload,
    },
});

export const { loadedStudentCompletedUnits, setStudentId, setStudent } =
    student.actions;

export default student.reducer;
