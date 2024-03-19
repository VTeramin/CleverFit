import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserData } from '@redux/userDataSlice';
import { Page } from '@components/page/page';
import { ROUTE } from '@constants/enums';

export const PrivateRoutes: React.FC = () => {
    const { isAuthorized } = useAppSelector(selectUserData);
    return isAuthorized ? <Page innerLayout={<Outlet />} /> : <Navigate to={ROUTE.AUTH} />;
};
