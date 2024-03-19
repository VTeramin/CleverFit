import { API } from "@constants/api";
import { ROUTE } from "@constants/enums";
import { AppDispatch, GetState } from "@redux/configure-store";
import { toggleLoader } from "@redux/loaderSlice";
import axios from "axios";

axios.defaults.withCredentials = true;

export const register = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { email, password } = getState().login;

    return axios.post(`${API}/auth/registration`, { email, password })
        .then(() => ROUTE.SUCCESS)
        .catch(error => error.response.status === 409 ? ROUTE.ERROR_USER_EXIST : ROUTE.ERROR)
        .finally(() => dispatch(toggleLoader(false)));
};
