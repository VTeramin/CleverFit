/* eslint-disable no-underscore-dangle */
import { TTraining } from '@constants/types';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './configure-store';

const initialState: TTraining[] = [];

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        changeTrainingData: (state, action: PayloadAction<TTraining[]>) => {
            state.splice(0, state.length);
            const trainingSorted = action.payload.sort((a, b) => a.date > b.date ? 1 : -1);

            state.push(...trainingSorted);
        }
    }
});

export const { changeTrainingData } = trainingSlice.actions;
export const selectTraining = (state: RootState) => state.training;
export default trainingSlice.reducer;
