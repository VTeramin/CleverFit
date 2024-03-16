import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configure-store";
import { training } from "@constants/types";

const initialState: training[] = [];

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        changeTrainingData: (state, action: PayloadAction<training[]>) => {
            state.splice(0, state.length);
            state.push(...action.payload);
        }
    }
});

export const { changeTrainingData } = trainingSlice.actions;
export const selectTraining = (state: RootState) => state.training;
export default trainingSlice.reducer;
