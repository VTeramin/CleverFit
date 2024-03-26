import { API } from '@constants/api';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import { changeUserData } from '@redux/user-data-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getUserData = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.get(`${API}/user/me`, params)
        .then(response => dispatch(changeUserData(response.data)))
        .finally(() => dispatch(toggleLoader(false)));
};
