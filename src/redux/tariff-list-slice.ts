import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './configure-store';

type TTariffPeriod = {
    text: string,
    cost: number,
    days: number
}

export type TTariffListItem = {
    _id: string,
    name: string,
    periods: TTariffPeriod[]
}

const initialState: TTariffListItem[] = [];

export const tariffListSlice = createSlice({
    name: 'tariffList',
    initialState,
    reducers: {
        changeTariffListData: (state, action: PayloadAction<TTariffListItem[]>) => {
            state.splice(0, state.length);
            state.push(...action.payload);
        }
    }
});

export const { changeTariffListData } = tariffListSlice.actions;
export const selectTariffList = (state: RootState) => state.tariffList;
export default tariffListSlice.reducer;
