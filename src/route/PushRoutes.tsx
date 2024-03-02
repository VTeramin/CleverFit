import { store } from '@redux/configure-store';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE } from './routes';

export const PushRoutes: React.FC = () => {
    const isPush = store.getState().router.action === "PUSH";
    return isPush ? <Outlet /> : <Navigate to={ROUTE.AUTH} />;
};
