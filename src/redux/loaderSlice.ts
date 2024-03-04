import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configure-store";

const initialState = {
    isLoading: false
};

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        toggleLoader: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
});

export const { toggleLoader } = loaderSlice.actions;
export const selectLoader = (state: RootState) => state.loader.isLoading;
export default loaderSlice.reducer;
