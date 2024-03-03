import { SideBar } from '@pages/components/side-bar/side-bar';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE } from './routes';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserData } from '@redux/userDataSlice';

export const PrivateRoutes: React.FC = () => {
    const { isAuthorized } = useAppSelector(selectUserData);
    return isAuthorized ? <SideBar innerLayout={<Outlet />} /> : <Navigate to={ROUTE.AUTH} />;
};
