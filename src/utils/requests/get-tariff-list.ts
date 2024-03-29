import { API } from '@constants/api';
import { EStatus } from '@constants/enums';
import { AppDispatch, GetState } from '@redux/configure-store';
import { changeTariffListData } from '@redux/tariff-list-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getTariffList = () => async (dispatch: AppDispatch, getState: GetState) => {
    const { sessionToken } = getState().userData;
    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    return axios.get(`${API}/catalogs/tariff-list`, params)
        .then(response => dispatch(changeTariffListData(response.data)))
        .catch(() => EStatus.error);
};
