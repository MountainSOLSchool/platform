import { createSlice } from '@reduxjs/toolkit';

export const units = createSlice({
    name: 'paths',
    initialState: [],
    reducers: {
        loadedUnits: (_, action) => {
            return action.payload;
        },
        requestUnits: () => {
            // No state change: the action only triggers the units epic.
        },
        overrideUnits: (_, action) => {
            return action.payload;
        },
    },
});

export const { loadedUnits, requestUnits, overrideUnits } = units.actions;

export default units.reducer;
