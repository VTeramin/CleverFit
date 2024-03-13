import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import loginReducer from "./loginSlice";
import loaderReducer from "./loaderSlice";
import userDataReducer from "./userDataSlice";
import feedbackReducer from "./feedbackSlice";
import trainingReducer from "./trainingSlice";
import { thunk } from "redux-thunk";

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
        router: routerReducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware).concat(thunk),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type GetState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
