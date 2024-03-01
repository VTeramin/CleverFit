import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthorized: localStorage.getItem("token") !== null,
    sessionToken: localStorage.getItem("token")
};

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        toggleIsAuthorized: (state, action) => {
            return { ...state, isAuthorized: action.payload };
        },
        changeSessionToken: (state, action) => {
            return { ...state, sessionToken: action.payload }
        }
    }
});

export const { toggleIsAuthorized, changeSessionToken } = userDataSlice.actions;
export default userDataSlice.reducer;
