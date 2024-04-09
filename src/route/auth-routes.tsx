import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { EROUTE } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeSessionToken, selectUserData, toggleIsAuthorized } from '@redux/user-data-slice';
import { getTokenFromSearch } from '@utils/get-token-from-search';

export const AuthRoutes: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuthorized } = useAppSelector(selectUserData);
    const token = getTokenFromSearch();

    if (token) {
        dispatch(changeSessionToken(token));
        dispatch(toggleIsAuthorized(true));
    }

    return isAuthorized ? <Navigate to={EROUTE.MAIN} /> : <Outlet />;
};
