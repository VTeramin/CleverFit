import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { changeResultType } from '@redux/calendar-modal-slice';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import { changeTrainingListData } from '@redux/training-list-slice';
import { changeTrainingData } from '@redux/training-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getTrainingList = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.get(`${API}/catalogs/training-list`, params)
        .then(response => dispatch(changeTrainingListData(response.data)))
        .catch(() => {
            dispatch(changeTrainingData([]));
            dispatch(changeResultType(EStatus.errorTrainingList));
        })
        .finally(() => dispatch(toggleLoader(false)));
};
