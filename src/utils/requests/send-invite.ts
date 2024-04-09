import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { changeResultType } from '@redux/calendar-modal-slice';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import { editTraining } from '@redux/training-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const sendInvite = (trainingId: string) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const { selectedPal } = getState().calendarModal;

    const data = {
        to: selectedPal,
        trainingId
    }

    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.post(`${API}/invite`, data, params)
        .then(response => dispatch(editTraining(response.data.training)))
        .catch(() => dispatch(changeResultType(EStatus.errorSaveTraining)))
        .finally(() => dispatch(toggleLoader(false)));
};
