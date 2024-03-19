import { API } from "@constants/api";
import { ROUTE } from "@constants/enums";
import { AppDispatch, GetState } from "@redux/configure-store";
import { toggleLoader } from "@redux/loaderSlice";
import { changeSessionToken, toggleIsAuthorized } from "@redux/userDataSlice";
import axios from "axios";

axios.defaults.withCredentials = true;

export const login = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { email, password, isRemember } = getState().login;

    return axios.post(`${API}/auth/login`, { email, password })
        .then(response => {
            const token = response.data.accessToken;
            if (isRemember) localStorage.setItem("token", token);
            dispatch(changeSessionToken(token));
            dispatch(toggleIsAuthorized(true));
            return ROUTE.MAIN;
        })
        .catch(() => ROUTE.ERROR_LOGIN)
        .finally(() => dispatch(toggleLoader(false)));
};
