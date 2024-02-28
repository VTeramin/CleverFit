import { SideBar } from '@pages/components/side-bar/side-bar';
import { store } from '@redux/configure-store';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes: React.FC = () => {
    const isAuthorized = store.getState().user.isAuthorized;
    return isAuthorized ? <SideBar innerLayout={<Outlet />} /> : <Navigate to="/auth" />;
};
