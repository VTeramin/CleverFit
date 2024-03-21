import { TLogin, TPasswords } from '@constants/types';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './configure-store';

type TChangeData = {
    [name:string]: string | boolean
}

const initialState: TLogin = {
    email: '',
    password: '',
    confirmPassword: '',
    isRemember: false
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeLoginData: (state, action: PayloadAction<TChangeData>) => {
            Object.assign(state, action.payload)
        },
        changePasswords: (state, action: PayloadAction<TPasswords>) => {
            Object.assign(state, action.payload)
        }
    }
});

export const { changeLoginData, changePasswords } = loginSlice.actions;
export const selectLogin = (state: RootState) => state.login;
export default loginSlice.reducer;
