import { API } from '@constants/api';
import { TInvite } from '@constants/types';
import { AppDispatch, GetState } from '@redux/configure-store';
import { changeInvites } from '@redux/user-data-slice';
import axios, { AxiosResponse } from 'axios';

axios.defaults.withCredentials = true;

export const getInvite = () => async (dispatch: AppDispatch, getState: GetState) => {
    const { sessionToken } = getState().userData;

    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.get(`${API}/invite`, params)
        .then((response: AxiosResponse<TInvite[]>) => dispatch(changeInvites(response.data)))
        .catch(() => dispatch(changeInvites([])));
};
