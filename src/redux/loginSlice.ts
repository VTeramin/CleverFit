import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configure-store";
import { TLogin, TPasswords } from "@constants/types";

type changeData = {
    [name:string]: string | boolean
}

const initialState: TLogin = {
    email: "",
    password: "",
    confirmPassword: "",
    isRemember: false
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeLoginData: (state, action: PayloadAction<changeData>) => {
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
