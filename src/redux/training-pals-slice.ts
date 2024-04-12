import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './configure-store';

export type TPalData = {
    id: string,
    name: string,
    trainingType: string,
    imageSrc: string | null,
    avgWeightInWeek: number,
    inviteId: string | null,
    status: string | null
}

const initialState: TPalData[] = [];

export const trainingPalsSlice = createSlice({
    name: 'trainingPals',
    initialState,
    reducers: {
        changeTrainingPalsData: (state, action: PayloadAction<TPalData[]>) => {
            state.splice(0, state.length);
            state.push(...action.payload);
        }
    }
});

export const { changeTrainingPalsData } = trainingPalsSlice.actions;
export const selectTrainingPals = (state: RootState) => state.trainingPals;
export default trainingPalsSlice.reducer;
