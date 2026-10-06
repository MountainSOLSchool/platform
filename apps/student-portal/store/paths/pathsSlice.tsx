import { createSlice } from '@reduxjs/toolkit';

export const paths = createSlice({
    name: 'paths',
    initialState: [],
    reducers: {
        loadedPaths: (state, action) => {
            return action.payload;
        },
        requestPaths: () => {
            // No state change: the action only triggers the paths epic.
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadedPaths, requestPaths } = paths.actions;

export default paths.reducer;
