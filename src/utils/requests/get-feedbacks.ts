import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { AppDispatch, GetState } from '@redux/configure-store';
import { changeFeedbackData } from '@redux/feedback-slice';
import { toggleLoader } from '@redux/loader-slice';
import { toggleIsAuthorized } from '@redux/user-data-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getFeedbacks = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.get(`${API}/feedback`, params)
        .then(response => dispatch(changeFeedbackData(response.data)))
        .catch(error => {
            if (error.config.headers.Authorization === 'Bearer null') return EStatus.noToken;
            if (error.response.status === 403) {
                localStorage.clear();
                dispatch(toggleIsAuthorized(false));

                return EStatus.redirect;
            }

            return EStatus.errorFeedback;
        })
        .finally(() => dispatch(toggleLoader(false)));
};
