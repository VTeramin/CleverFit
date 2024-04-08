import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { changeResultType } from '@redux/calendar-modal-slice';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import { changeTrainingPalsData } from '@redux/training-pals-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getTrainingPals = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.get(`${API}/catalogs/training-pals`, params)
        .then(response => dispatch(changeTrainingPalsData(response.data)))
        .catch(() => dispatch(changeResultType(EStatus.errorSaveTraining)))
        .finally(() => dispatch(toggleLoader(false)));
};
