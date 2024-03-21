import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { EROUTE } from '@constants/enums';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { store } from '@redux/configure-store';
import { changeSessionToken, selectUserData, toggleIsAuthorized } from '@redux/user-data-slice';
import { getTokenFromSearch } from '@utils/get-token-from-search';

export const AuthRoutes: React.FC = () => {
    const { isAuthorized } = useAppSelector(selectUserData);
    const token = getTokenFromSearch();

    if (token) {
        store.dispatch(changeSessionToken(token));
        store.dispatch(toggleIsAuthorized(true));
    }

    return isAuthorized ? <Navigate to={EROUTE.MAIN} /> : <Outlet />;
};
