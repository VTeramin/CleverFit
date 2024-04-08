import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './configure-store';
import { TPalData } from './training-pals-slice';

const initialState: TPalData[] = [];

export const userJointTrainingListSlice = createSlice({
    name: 'userJointTrainingList',
    initialState,
    reducers: {
        changeUserJointTrainingListData: (state, action: PayloadAction<TPalData[]>) => {
            state.splice(0, state.length);
            state.push(...action.payload);
        }
    }
});

export const { changeUserJointTrainingListData } = userJointTrainingListSlice.actions;
export const selectUserJointTrainingList = (state: RootState) => state.userJointTrainingList;
export default userJointTrainingListSlice.reducer;
