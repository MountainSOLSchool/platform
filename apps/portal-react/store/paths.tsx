/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

export const paths = createSlice({
    name: 'paths',
    initialState: {  },
    reducers: {
        loadedPaths: (state, action) => {
            //console.log("loaded => ",action.payload, " => ",action);
            return (action.payload)
        },
        requestPaths: () => {  },
    },
});

// Action creators are generated for each case reducer function
export const {
    loadedPaths,
    requestPaths
} = paths.actions;

export default paths.reducer;
