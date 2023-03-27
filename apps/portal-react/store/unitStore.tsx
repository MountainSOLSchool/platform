/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

export const units = createSlice({
    name: 'paths',
    initialState: {  },
    reducers: {
        loadedUnits: (state, action) => {
            //console.log("loaded => ",action.payload, " => ",action);
            return (action.payload)
        },
        requestUnits: () => {  },
    },
});

// Action creators are generated for each case reducer function
export const {
    loadedUnits,
    requestUnits
} = units.actions;

export default units.reducer;
