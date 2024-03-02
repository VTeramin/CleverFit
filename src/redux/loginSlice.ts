import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configure-store";

type passwords = {
    password: string,
    password2: string
};

export type login = {
    email: string,
    isRemember: boolean
} & passwords;

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
        changeLoginData: (state, action: PayloadAction<login>) => {
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
