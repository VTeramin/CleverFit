import { API } from '@constants/api';
import { AppDispatch, GetState } from '@redux/configure-store';
import { changeUserInfo } from '@redux/user-data-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getUserData = () => async (dispatch: AppDispatch, getState: GetState) => {
    const { sessionToken } = getState().userData;
    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.get(`${API}/user/me`, params)
        .then(response => dispatch(changeUserInfo(response.data)))
        .catch(() => dispatch(changeUserInfo({})));
};
