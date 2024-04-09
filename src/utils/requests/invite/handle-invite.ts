/* eslint-disable no-underscore-dangle */
import { API } from '@constants/api';
import { AppDispatch, GetState } from '@redux/configure-store';
import { changeTrainingPalsData, TPalData } from '@redux/training-pals-slice';
import { changeInvites } from '@redux/user-data-slice';
import axios, { AxiosResponse } from 'axios';

axios.defaults.withCredentials = true;

export const handleInvite = (id: string, status: 'accepted' | 'rejected') => async (dispatch: AppDispatch, getState: GetState) => {
    const { sessionToken } = getState().userData;
    const { invites } = getState().userData;
    const { trainingPals } = getState();

    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.put(`${API}/invite`, { id, status }, params)
        .then((response: AxiosResponse<TPalData>) => {
            dispatch(changeInvites(invites.filter(invite => invite._id !== id)));
            if(status === 'accepted') dispatch(changeTrainingPalsData([...trainingPals, response.data]));
        });
};
