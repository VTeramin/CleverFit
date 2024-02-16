import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage, Auth, Result, ConfirmEmail, ChangePassword } from './pages';

export const routes = (
    <Routes>
        <Route path="/" element={<Navigate to={localStorage.getItem("token") ? "/main" : "/auth"} />} />
        <Route path={"/auth"} element={<Auth isRegistration={false} />} />
        <Route path={"/auth/registration"} element={<Auth isRegistration={true} />} />
        <Route path={"/auth/change-password"} element={<ChangePassword />} />
        <Route path={"/auth/confirm-email"} element={<ConfirmEmail />} />
        <Route path={"/result/success"} element={<Result resultType="success" />} />
        <Route path={"/result/error-user-exist"} element={<Result resultType="errorUserExist" />} />
        <Route path={"/result/error"} element={<Result resultType="error" />} />
        <Route path={"/result/error-login"} element={<Result resultType="errorLogin" />} />
        <Route path={"/result/error-check-email-no-exist"} element={<Result resultType="errorCheckEmailNoExist" />} />
        <Route path={"/result/error-check-email"} element={<Result resultType="errorCheckEmail" />} />
        <Route path={"/result/success-change-password"} element={<Result resultType="successChangePassword" />} />
        <Route path={"/result/error-change-password"} element={<Result resultType="errorChangePassword" />} />
        <Route path={"/main"} element={<MainPage />} />
    </Routes>
);
