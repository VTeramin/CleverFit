import { createReduxHistoryContext } from 'redux-first-history';
import { thunk } from 'redux-thunk';
import { combineReducers , configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import calendarModalReducer from './calendar-modal-slice';
import feedbackReducer from './feedback-slice';
import loaderReducer from './loader-slice';
import loginReducer from './login-slice';
import tariffListReducer from './tariff-list-slice';
import trainingListReducer from './training-list-slice';
import trainingPalsReducer from './training-pals-slice';
import trainingReducer from './training-slice';
import userDataReducer from './user-data-slice';
import userJointTrainingListReducer from './user-joint-training-list-slice';

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer,
} = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
    reducer: combineReducers({
        login: loginReducer,
        loader: loaderReducer,
        userData: userDataReducer,
        feedback: feedbackReducer,
        training: trainingReducer,
        trainingList: trainingListReducer,
        calendarModal: calendarModalReducer,
        router: routerReducer,
        tariffList: tariffListReducer,
        trainingPals: trainingPalsReducer,
        userJointTrainingList: userJointTrainingListReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware).concat(thunk),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type GetState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
