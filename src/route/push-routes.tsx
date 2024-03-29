import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { EROUTE } from '@constants/enums';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const PushRoutes: React.FC = () => {
    const isPush = useAppSelector((state) => state.router).action === 'PUSH';

    return isPush ? <Outlet /> : <Navigate to={EROUTE.AUTH} />;
};
