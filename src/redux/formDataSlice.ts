import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    email: "",
    password: "",
    password2: "",
    isEmailValid: false,
    isPasswordValid: false,
    isPassword2Valid: false
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
