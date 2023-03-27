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
        setTestStudent: (state, action) => action.payload,
    }
})

export const {
    loadedTestStudent,
    requestTestStudent,
    setTestStudent,
} = testStudent.actions;

export default testStudent.reducer;