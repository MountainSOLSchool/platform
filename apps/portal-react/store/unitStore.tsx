/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

export const units = createSlice({
    name: 'paths',
    initialState: [],
    reducers: {
        loadedUnits: (state, action) => {
            //console.log("loaded => ",action.payload, " => ",action);
            return (action.payload)
        },
        requestUnits: () => {  },
        overrideUnits: (state, action) => {
            return (action.payload)
        }
    },
});

// Action creators are generated for each case reducer function
export const {
    loadedUnits,
    requestUnits,
    overrideUnits
} = units.actions;

export default units.reducer;
