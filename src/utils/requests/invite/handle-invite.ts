/* eslint-disable no-underscore-dangle */
import { API } from '@constants/api';
import { AppDispatch, GetState } from '@redux/configure-store';
import { changeTrainingPalsData, TPalData } from '@redux/training-pals-slice';
import { changeInvites } from '@redux/user-data-slice';
import axios from 'axios';

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
        .then(() => {
            dispatch(changeInvites(invites.filter(invite => invite._id !== id)));
            const inviteData = invites.find(invite => invite._id === id);
            const palData = inviteData?.from;
            const newPal: TPalData = {
                id: palData?._id || '',
                name: `${palData?.lastName} ${palData?.firstName}`,
                trainingType: inviteData?.training.name || '',
                imageSrc: palData?.imageSrc || '',
                avgWeightInWeek: 0,
                inviteId: id,
                status: 'accepted'
            };

            if (status === 'accepted') dispatch(changeTrainingPalsData([
                ...trainingPals, newPal
            ]));
        });
};
