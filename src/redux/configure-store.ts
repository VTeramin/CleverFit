import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import loginReducer from "./loginSlice";
import loaderReducer from "./loaderSlice";
import userDataReducer from "./userDataSlice";

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
    reducer: combineReducers({
        login: loginReducer,
        loader: loaderReducer,
        user: userDataReducer,
        router: routerReducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);
