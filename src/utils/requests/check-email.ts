import { API } from "@constants/api";
import { ROUTE } from "@constants/enums";
import { AppDispatch, GetState } from "@redux/configure-store";
import { toggleLoader } from "@redux/loaderSlice";
import axios from "axios";

axios.defaults.withCredentials = true;

export const checkEmail = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { email } = getState().login;

    return axios.post(`${API}/auth/check-email`, { email })
        .then(() => ROUTE.CONFIRM_EMAIL)
        .catch(error => {
            if (error.response.data.message === "Email не найден") return ROUTE.ERROR_EMAIL_NO_EXIST;
            return ROUTE.ERROR_CHECK_EMAIL;
        })
        .finally(() => dispatch(toggleLoader(false)));
};
