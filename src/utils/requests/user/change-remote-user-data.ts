import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { AppDispatch, GetState } from '@redux/configure-store';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const changeRemoteUserData = () => async (_: AppDispatch, getState: GetState) => {
    const { password } = getState().login;
    const { userInfo } = getState().userData;
    const data = password === '' ? userInfo : { ...userInfo, password };

    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    return axios.put(`${API}/user`, data, params)
        .then(() => EStatus.success)
        .catch(() => EStatus.errorSaveUserData);
};
