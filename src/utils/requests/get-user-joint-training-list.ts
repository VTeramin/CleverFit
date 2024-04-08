import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { changeResultType } from '@redux/calendar-modal-slice';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import { changeUserJointTrainingListData } from '@redux/user-joint-training-list-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getUserJointTrainingList = (trainingType?: string) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const trainingList = [...getState().trainingList];
    const { sessionToken } = getState().userData;
    const params = {
        params: {
            trainingType: trainingList.find(el => el.name === trainingType)?.key || ''
        },
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.get(`${API}/catalogs/user-joint-training-list`, params)
        .then(response => dispatch(changeUserJointTrainingListData(response.data)))
        .catch(() => dispatch(changeResultType(EStatus.errorUserJointTrainingList)))
        .finally(() => dispatch(toggleLoader(false)));
};
