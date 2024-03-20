import React from 'react';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6'
import { history, store } from '@redux/configure-store';
import { Loader } from '@components/loader/loader';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage, Auth, Result, ConfirmEmail, ChangePassword, FeedbacksPage } from './pages';
import { PrivateRoutes } from './route/PrivateRoutes';
import { AuthRoutes } from './route/AuthRoutes';
import { PushRoutes } from './route/PushRoutes';
import { CalendarPage } from '@pages/calendar-page';
import { EROUTE } from '@constants/enums';

export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route element={<AuthRoutes />}>
                        <Route path={EROUTE.HOME} element={<Navigate to={EROUTE.AUTH} />} />
                        <Route path={EROUTE.AUTH} element={<Auth isRegistration={false} />} />
                        <Route path={EROUTE.REGISTRATION} element={<Auth isRegistration={true} />} />
                        <Route element={<PushRoutes />}>
                            <Route path={EROUTE.CHANGE_PASSWORD} element={<ChangePassword />} />
                            <Route path={EROUTE.CONFIRM_EMAIL} element={<ConfirmEmail />} />
                        </Route>
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path={EROUTE.MAIN} element={<MainPage />} />
                        <Route path={EROUTE.FEEDBACKS} element={<FeedbacksPage />} />
                        <Route path={EROUTE.CALENDAR} element={<CalendarPage />} />
                    </Route>
                    <Route element={<PushRoutes />}>
                        <Route path={EROUTE.RESULT} element={<Result />} />
                    </Route>
                </Routes>
                <Loader />
            </HistoryRouter>
        </Provider>
    );
};
