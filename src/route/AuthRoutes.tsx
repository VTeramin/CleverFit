import { store } from '@redux/configure-store';
import { changeSessionToken, toggleIsAuthorized } from '@redux/userDataSlice';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE } from './routes';

function getTokenFromSearch() {
    const searchParams = window.location.search;
    if (searchParams) {
        const searchParamsArray = searchParams.replace("?", "").split("&");
        const serachToken = searchParamsArray.find(el => el.startsWith("accessToken")) || "";
        return serachToken ? serachToken.split("=")[1] : "";
    }
}

export const AuthRoutes: React.FC = () => {
    const token = getTokenFromSearch();
    if (token) {
        store.dispatch(changeSessionToken(token));
        store.dispatch(toggleIsAuthorized(true));
    }

    const isAuthorized = store.getState().user.isAuthorized;
    return isAuthorized ? <Navigate to={ROUTE.MAIN} /> : <Outlet />;
};
