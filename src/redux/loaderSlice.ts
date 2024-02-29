import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
};

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        toggleLoader: (state) => {
            return { isLoading: !state.isLoading };
        }
    }
});

export const { toggleLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
