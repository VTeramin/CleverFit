import { SideBar } from '@pages/components/side-bar/side-bar';
import { store } from '@redux/configure-store';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE } from './routes';

export const PrivateRoutes: React.FC = () => {
    const isAuthorized = store.getState().userData.isAuthorized;
    return isAuthorized ? <SideBar innerLayout={<Outlet />} /> : <Navigate to={ROUTE.AUTH} />;
};
