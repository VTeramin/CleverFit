import { EValid } from '@constants/enums';
import { TLogin, TPasswords, TValidChange } from '@constants/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './configure-store';

type TChangeData = {
    [name: string]: string | boolean
}

const initialState: TLogin = {
    email: '',
    password: '',
    confirmPassword: '',
    isRemember: false,
    valid: {
        password: EValid.success,
        confirmPassword: EValid.success
    }
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
        },
        changeValidStatus: (state, action: PayloadAction<TValidChange>) => {
            Object.assign(state.valid, action.payload)
        },
    }
});

export const { changeLoginData, changePasswords, changeValidStatus } = loginSlice.actions;
export const selectLogin = (state: RootState) => state.login;
export default loginSlice.reducer;
