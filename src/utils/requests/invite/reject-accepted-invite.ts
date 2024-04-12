import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { changeResultType } from '@redux/calendar-modal-slice';
import { AppDispatch, GetState } from '@redux/configure-store';
import { changeTrainingPalsData } from '@redux/training-pals-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const rejectAcceptedInvite = (palId: string, inviteId: string) => async (dispatch: AppDispatch, getState: GetState) => {
    const { sessionToken } = getState().userData;
    const { trainingPals } = getState();

    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.delete(`${API}/invite/${inviteId}`, params)
        .then(() => dispatch(changeTrainingPalsData(trainingPals.filter(pal => pal.id !== palId))))
        .catch(() => dispatch(changeResultType(EStatus.errorSaveTraining)));
};
