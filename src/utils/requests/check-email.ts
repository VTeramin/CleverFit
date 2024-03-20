import { API } from "@constants/api";
import { EROUTE } from "@constants/enums";
import { AppDispatch, GetState } from "@redux/configure-store";
import { toggleLoader } from "@redux/loaderSlice";
import axios from "axios";

axios.defaults.withCredentials = true;

export const checkEmail = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { email } = getState().login;

    return axios.post(`${API}/auth/check-email`, { email })
        .then(() => EROUTE.CONFIRM_EMAIL)
        .catch(error => {
            if (error.response.data.message === "Email не найден") return EROUTE.ERROR_EMAIL_NO_EXIST;
            return EROUTE.ERROR_CHECK_EMAIL;
        })
        .finally(() => dispatch(toggleLoader(false)));
};
