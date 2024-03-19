import { API } from "@constants/api";
import { status } from "@constants/enums";
import { AppDispatch, GetState } from "@redux/configure-store";
import { changeFeedbackData } from "@redux/feedbackSlice";
import { toggleLoader } from "@redux/loaderSlice";
import { toggleIsAuthorized } from "@redux/userDataSlice";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getFeedbacks = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const params = {
        headers: {
            "Authorization": `Bearer ${sessionToken}`
        }
    };

    return axios.get(`${API}/feedback`, params)
        .then(response => dispatch(changeFeedbackData(response.data)))
        .catch(error => {
            if (error.config.headers.Authorization === "Bearer null") return status.noToken;
            if (error.response.status === 403) {
                localStorage.clear();
                dispatch(toggleIsAuthorized(false));
                return status.redirect;
            }
            return status.errorFeedback;
        })
        .finally(() => dispatch(toggleLoader(false)));
};
