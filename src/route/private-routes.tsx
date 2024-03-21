import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Page } from '@components/page/page';
import { EROUTE } from '@constants/enums';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserData } from '@redux/user-data-slice';

export const PrivateRoutes: React.FC = () => {
    const { isAuthorized } = useAppSelector(selectUserData);

    return isAuthorized ? <Page innerLayout={<Outlet />} /> : <Navigate to={EROUTE.AUTH} />;
};
