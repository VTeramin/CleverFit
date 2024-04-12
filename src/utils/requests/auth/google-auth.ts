import { API } from '@constants/api';
import { AppDispatch } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const googleAuth = () => async (dispatch: AppDispatch) => {
    dispatch(toggleLoader(true));
    window.location.href = `${API}/auth/google`;
};
