import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configure-store";
import { login, passwords } from "@constants/types";

type changeData = {
    [name:string]: string | boolean
}

const initialState: login = {
    email: "",
    password: "",
    password2: "",
    isRemember: false
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeLoginData: (state, action: PayloadAction<changeData>) => {
            Object.assign(state, action.payload)
        },
        changePasswords: (state, action: PayloadAction<passwords>) => {
            Object.assign(state, action.payload)
        }
    }
});

export const { changeLoginData, changePasswords } = loginSlice.actions;
export const selectLogin = (state: RootState) => state.login;
export default loginSlice.reducer;
