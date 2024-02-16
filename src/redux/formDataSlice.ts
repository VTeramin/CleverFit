import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    email: "",
    password: "",
    password2: "",
    isEmailValid: true,
    isPasswordValid: true,
    isPassword2Valid: true
}

export const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        changeFormData: (state, action) => {
            state;
            return action.payload;
        }
    }
});

export const { changeFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
