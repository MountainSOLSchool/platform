/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

export const testStudent = createSlice({
    name: 'test student',
    initialState: {
        name: '',
        completedUnits: []
    },
    reducers: {
        loadedTestStudent: (state, action) => {
            console.log("loaded student => ", action.payload)
            return action.payload;
        },
        requestTestStudent: () => { console.log("loading test student") },
    }
})

export const {
    loadedTestStudent,
    requestTestStudent
} = testStudent.actions;

export default testStudent.reducer;