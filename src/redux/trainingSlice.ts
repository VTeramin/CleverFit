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
        },
        addTraining: (state, action: PayloadAction<training>) => {
            state.push(action.payload);
        },
        setIsImplementation: (state, action: PayloadAction<string>) => {
            state.forEach(el => {
                if(el._id === action.payload) el.isImplementation = true;
            })
        }
    }
});

export const { changeTrainingData, addTraining, setIsImplementation } = trainingSlice.actions;
export const selectTraining = (state: RootState) => state.training;
export default trainingSlice.reducer;
