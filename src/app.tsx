import React from 'react';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6'
import { history, store } from '@redux/configure-store';
import { Loader } from '@pages/components/loader';
import { Route, Routes } from 'react-router-dom';
import { MainPage, Auth, Result, ConfirmEmail, ChangePassword } from './pages';
import { PrivateRoutes } from './route/PrivateRoutes';
import { AuthRoutes } from './route/AuthRoutes';
import { PushRoutes } from './route/PushRoutes';

export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route element={<AuthRoutes />}>
                        <Route path="/" element={"/auth"} />
                        <Route path="/auth">
                            <Route index element={<Auth isRegistration={false} />} />
                            <Route path="registration" element={<Auth isRegistration={true} />} />

                            <Route element={<PushRoutes />}>
                                <Route path="change-password" element={<ChangePassword />} />
                                <Route path="confirm-email" element={<ConfirmEmail />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route element={<PrivateRoutes />}>
                        <Route path="/main" element={<MainPage />} />
                    </Route>

                    <Route element={<PushRoutes />}>
                        <Route path="/result/:result" element={<Result />} />
                    </Route>
                </Routes>

                <Loader />
            </HistoryRouter>
        </Provider>
    );
};
