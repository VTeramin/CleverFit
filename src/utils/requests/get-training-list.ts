import { API } from "@constants/api";
import { status } from "@constants/enums";
import { changeResultType } from "@redux/calendarModalSlice";
import { AppDispatch, GetState } from "@redux/configure-store";
import { toggleLoader } from "@redux/loaderSlice";
import { changeTrainingListData } from "@redux/trainingListSlice";
import { changeTrainingData } from "@redux/trainingSlice";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getTrainingList = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const params = {
        headers: {
            "Authorization": `Bearer ${sessionToken}`
        }
    };

    return axios.get(`${API}/catalogs/training-list`, params)
        .then(response => dispatch(changeTrainingListData(response.data)))
        .catch(() => {
            dispatch(changeTrainingData([]));
            dispatch(changeResultType(status.errorTrainingList));
        })
        .finally(() => dispatch(toggleLoader(false)));
};
