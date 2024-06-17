import { TInvite, TUserData, TUserDataFormReponse } from '@constants/types';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './configure-store';

const initialState: TUserData = {
    isAuthorized: localStorage.getItem('token') !== null,
    sessionToken: localStorage.getItem('token') || '',
    invites: [],
    userInfo: {}
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
        },
        changeInvites: (state, action: PayloadAction<TInvite[]>) => {
            state.invites.splice(0, state.invites.length);
            state.invites.push(...action.payload);
        },
        changeUserInfo: (state, action: PayloadAction<TUserDataFormReponse>) => {
            Object.assign(state.userInfo, action.payload);
        },
        deleteUserInfo: (state) => {
            state.userInfo = {};
        }
    }
});

export const { toggleIsAuthorized, changeSessionToken, changeInvites, changeUserInfo, deleteUserInfo } = userDataSlice.actions;
export const selectUserData = (state: RootState) => state.userData;
export default userDataSlice.reducer;
