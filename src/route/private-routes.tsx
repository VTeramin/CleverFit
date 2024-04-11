import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Page } from '@components/page/page';
import { EROUTE } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserData } from '@redux/user-data-slice';
import { getUserData } from '@utils/requests/user/get-user-data';

export const PrivateRoutes: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuthorized } = useAppSelector(selectUserData);

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    return isAuthorized ? <Page innerLayout={<Outlet />} /> : <Navigate to={EROUTE.AUTH} />;
};
