import { API } from "@constants/api";
import { status } from "@constants/enums";
import { AppDispatch, GetState } from "@redux/configure-store";
import { toggleLoader } from "@redux/loaderSlice";
import axios from "axios";

axios.defaults.withCredentials = true;

export const sendFeedback = (message: string, rating: number) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;

    const params = {
        headers: {
            "Authorization": `Bearer ${sessionToken}`
        }
    };

    return axios.post(`${API}/feedback`, { message, rating }, params)
        .then(() => status.successFeedback)
        .catch(() => status.errorFeedback)
        .finally(() => dispatch(toggleLoader(false)));
};
