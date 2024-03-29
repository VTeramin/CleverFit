import { API } from '@constants/api';
import { EROUTE } from '@constants/enums';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;
const params = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
};

export const changePassword = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { password, confirmPassword } = getState().login;

    return axios.post(`${API}/auth/change-password`, { password, confirmPassword }, params)
        .then(() => EROUTE.SUCCESS_CHANGE_PASSWORD)
        .catch(() => EROUTE.ERROR_CHANGE_PASSWORD)
        .finally(() => dispatch(toggleLoader(false)));
};
