import { store } from '@redux/configure-store';
import { changeSessionToken, selectUserData, toggleIsAuthorized } from '@redux/userDataSlice';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getTokenFromSearch } from '@utils/get-token-from-search';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ROUTE } from '@constants/enums';

export const AuthRoutes: React.FC = () => {
    const { isAuthorized } = useAppSelector(selectUserData);
    const token = getTokenFromSearch();
    if (token) {
        store.dispatch(changeSessionToken(token));
        store.dispatch(toggleIsAuthorized(true));
    }
    return isAuthorized ? <Navigate to={ROUTE.MAIN} /> : <Outlet />;
};
