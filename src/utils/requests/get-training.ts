import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { changeResultType } from '@redux/calendar-modal-slice';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import { changeTrainingData } from '@redux/training-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getTraining = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.get(`${API}/training`, params)
        .then(response => dispatch(changeTrainingData(response.data)))
        .catch(() => {
            dispatch(changeResultType(EStatus.noToken));

            return EStatus.noToken;
        })
        .finally(() => dispatch(toggleLoader(false)));
};
