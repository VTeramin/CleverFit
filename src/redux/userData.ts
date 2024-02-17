import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    isAuthorized: localStorage.getItem("token") !== null
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        toggleIsAuthorized: (state, action) => {
            console.log(action.payload);
            return { ...state, isAuthorized: action.payload };
        }
    }
});

export const { toggleIsAuthorized } = userDataSlice.actions;
export default userDataSlice.reducer;
