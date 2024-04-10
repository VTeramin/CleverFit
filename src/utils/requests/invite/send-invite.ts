import { API } from '@constants/api';
import { EJointStatus, EStatus } from '@constants/enums';
import { changeResultType } from '@redux/calendar-modal-slice';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import { TPalData } from '@redux/training-pals-slice';
import { changeUserJointTrainingListData } from '@redux/user-joint-training-list-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const sendInvite = (trainingId: string) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const { selectedPal } = getState().calendarModal;
    const { userJointTrainingList } = getState()
    const listWithPenddingUser = userJointTrainingList.map((user: TPalData) => user.id === selectedPal ? { ...user, status: EJointStatus.pending } : user);

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
        .then(() => dispatch(changeUserJointTrainingListData(listWithPenddingUser)))
        .catch(() => dispatch(changeResultType(EStatus.errorSaveTraining)))
        .finally(() => dispatch(toggleLoader(false)));
};
