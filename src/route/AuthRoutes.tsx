import { store } from '@redux/configure-store';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const AuthRoutes: React.FC = () => {
    const isAuthorized = store.getState().user.isAuthorized;
    const location = useLocation();

    console.log(location);
    console.log(history);
    console.log(store.getState().router.action);
    return isAuthorized ? <Navigate to="/main" /> : <Outlet />;
};
