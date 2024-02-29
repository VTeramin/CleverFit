import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    password: "",
    password2: "",
    isRemember: true
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeLoginData: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { changeLoginData } = loginSlice.actions;
export default loginSlice.reducer;
