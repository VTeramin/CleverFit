import { API } from "@constants/api";
import { EROUTE, EStatus } from "@constants/enums";
import { AppDispatch, GetState } from "@redux/configure-store";
import { toggleLoader } from "@redux/loaderSlice";
import axios from "axios";

axios.defaults.withCredentials = true;

export const confirmEmail = (code: string) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { email } = getState().login;

    return axios.post(`${API}/auth/confirm-email`, { email, code })
        .then(() => EROUTE.CHANGE_PASSWORD)
        .catch(() => EStatus.error)
        .finally(() => dispatch(toggleLoader(false)));
};
