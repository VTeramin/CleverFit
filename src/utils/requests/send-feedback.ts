import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const sendFeedback = (message: string, rating: number) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;

    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.post(`${API}/feedback`, { message, rating }, params)
        .then(() => EStatus.successFeedback)
        .catch(() => EStatus.errorFeedback)
        .finally(() => dispatch(toggleLoader(false)));
};
