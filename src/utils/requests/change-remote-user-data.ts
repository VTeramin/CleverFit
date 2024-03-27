import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;
const params = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
};

export const changeRemoteUserData = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { password } = getState().login;
    const { userInfo } = getState().userData;
    const data = password === '' ? userInfo : { ...userInfo, password };

    return axios.put(`${API}/user`, data, params)
        .then(() => EStatus.success)
        .catch(() => EStatus.errorSaveUserData)
        .finally(() => dispatch(toggleLoader(false)));
};
