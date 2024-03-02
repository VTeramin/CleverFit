import React from 'react';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6'
import { history, store } from '@redux/configure-store';
import { Loader } from '@pages/components/loader/loader';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE } from './route/routes';
import { MainPage, Auth, Result, ConfirmEmail, ChangePassword, FeedbacksPage } from './pages';
import { PrivateRoutes } from './route/PrivateRoutes';
import { AuthRoutes } from './route/AuthRoutes';
import { PushRoutes } from './route/PushRoutes';

export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route element={<AuthRoutes />}>
                        <Route path={ROUTE.HOME} element={<Navigate to={ROUTE.AUTH} />} />
                        <Route path={ROUTE.AUTH} element={<Auth isRegistration={false} />} />
                        <Route path={ROUTE.REGISTRATION} element={<Auth isRegistration={true} />} />
                        <Route element={<PushRoutes />}>
                            <Route path={ROUTE.CHANGE_PASSWORD} element={<ChangePassword />} />
                            <Route path={ROUTE.CONFIRM_EMAIL} element={<ConfirmEmail />} />
                        </Route>
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path={ROUTE.MAIN} element={<MainPage />} />
                        <Route path={ROUTE.FEEDBACKS} element={<FeedbacksPage />} />
                    </Route>
                    <Route element={<PushRoutes />}>
                        <Route path={ROUTE.FEEDBACKS} element={<Result />} />
                    </Route>
                </Routes>
                <Loader />
            </HistoryRouter>
        </Provider>
    );
};
