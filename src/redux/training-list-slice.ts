import { createSlice,PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './configure-store';

export type TTrainingListItem = {
    'name': 'string',
    'key': 'string'
}

const initialState: TTrainingListItem[] = [];

export const trainingListSlice = createSlice({
    name: 'trainingList',
    initialState,
    reducers: {
        changeTrainingListData: (state, action: PayloadAction<TTrainingListItem[]>) => {
            state.splice(0, state.length);
            state.push(...action.payload);
        }
    }
});

export const { changeTrainingListData } = trainingListSlice.actions;
export const selectTrainingList = (state: RootState) => state.trainingList;
export default trainingListSlice.reducer;
