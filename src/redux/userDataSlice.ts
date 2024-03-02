import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configure-store";

const initialState = {
    isAuthorized: localStorage.getItem("token") !== null,
    sessionToken: localStorage.getItem("token")
};

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        toggleIsAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
        changeSessionToken: (state, action: PayloadAction<string>) => {
            state.sessionToken = action.payload;
        }
    }
});

export const { toggleIsAuthorized, changeSessionToken } = userDataSlice.actions;
export const selectUserData = (state: RootState) => state.userData;
export default userDataSlice.reducer;
