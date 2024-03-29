import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const changeTariff = (tariffId: string, days: number) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.post(`${API}/tariff`, { tariffId, days }, params)
    .then(() => EStatus.successTariff)
    .finally(() => dispatch(toggleLoader(false)));
};
