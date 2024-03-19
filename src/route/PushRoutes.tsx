import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ROUTE } from '@constants/enums';

export const PushRoutes: React.FC = () => {
    const isPush = useAppSelector((state) => state.router).action === "PUSH";
    return isPush ? <Outlet /> : <Navigate to={ROUTE.AUTH} />;
};
