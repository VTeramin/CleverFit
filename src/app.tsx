import React from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6'
import { Loader } from '@components/loader/loader';
import { EROUTE } from '@constants/enums';
import { history, store } from '@redux/configure-store';

import { AuthRoutes } from './route/auth-routes';
import { PrivateRoutes } from './route/private-routes';
import { PushRoutes } from './route/push-routes';
import {
    AchievementsPage,
    Auth,
    CalendarPage,
    ChangePassword,
    ConfirmEmail,
    FeedbacksPage,
    MainPage,
    NotFoundPage,
    ProfilePage,
    Result,
    SettingsPage,
    TrainingPage
} from './pages';

export const App: React.FC = () => (
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
                    <Route path={EROUTE.PROFILE} element={<ProfilePage />} />
                    <Route path={EROUTE.SETTINGS} element={<SettingsPage />} />
                    <Route path={EROUTE.TRAINING} element={<TrainingPage />} />
                    <Route path={EROUTE.ACHIEVEMENTS} element={<AchievementsPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
                <Route element={<PushRoutes />}>
                    <Route path={EROUTE.RESULT} element={<Result />} />
                </Route>
            </Routes>
            <Loader />
        </HistoryRouter>
    </Provider>
);
