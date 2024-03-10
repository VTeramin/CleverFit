import { AppDispatch, GetState } from '@redux/configure-store';
import { addNewFeedback, changeFeedbackData } from '@redux/feedbackSlice';
import { toggleLoader } from '@redux/loaderSlice';
import { changeSessionToken, toggleIsAuthorized } from '@redux/userDataSlice';
import { ROUTE } from '@route/routes';
import axios from 'axios';
axios.defaults.withCredentials = true;
const API = "https://marathon-api.clevertec.ru";

export enum status {
    empty = "",
    redirect = "redirect",
    noToken = "noToken",
    error = "error",
    errorFeedback = "errorFeedback",
    successFeedback = "successFeedback",
    errorTrainingList = "errorTrainingList"
}

export const login = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { email, password, isRemember } = getState().login;

    return axios.post(`${API}/auth/login`, { email, password })
        .then((response) => {
            const token = response.data.accessToken;
            if (isRemember) localStorage.setItem("token", token);
            dispatch(changeSessionToken(token));
            dispatch(toggleIsAuthorized(true));
            return ROUTE.MAIN;
        })
        .catch(() => ROUTE.ERROR_LOGIN)
        .finally(() => dispatch(toggleLoader(false)));
}

export const register = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { email, password } = getState().login;

    return axios.post(`${API}/auth/registration`, { email, password })
        .then(() => ROUTE.SUCCESS)
        .catch(error => error.response.status === 409 ? ROUTE.ERROR_USER_EXIST : ROUTE.ERROR)
        .finally(() => dispatch(toggleLoader(false)));
}

export const checkEmail = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { email } = getState().login;

    return axios.post(`${API}/auth/check-email`, { email })
        .then(() => ROUTE.CONFIRM_EMAIL)
        .catch(error => {
            if (error.response.data.message === "Email не найден") {
                return ROUTE.ERROR_EMAIL_NO_EXIST
            }
            return ROUTE.ERROR_CHECK_EMAIL;
        })
        .finally(() => dispatch(toggleLoader(false)));
}

export const confirmEmail = (code: string) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { email } = getState().login;

    return axios.post(`${API}/auth/confirm-email`, { email, code })
        .then(() => ROUTE.CHANGE_PASSWORD)
        .catch(() => status.error)
        .finally(() => dispatch(toggleLoader(false)));
}

export const changePassword = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { password, password2 } = getState().login;

    return axios.post(`${API}/auth/change-password`, { password, confirmPassword: password2 }, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(() => ROUTE.SUCCESS_CHANGE_PASSWORD)
        .catch(() => ROUTE.ERROR_CHANGE_PASSWORD)
        .finally(() => dispatch(toggleLoader(false)));
}

export const getFeedbacks = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;

    return axios.get(`${API}/feedback`, {
        headers: {
            "Authorization": `Bearer ${sessionToken}`
        }
    })
        .then(response => dispatch(changeFeedbackData(response.data)))
        .catch(error => {
            if (error.config.headers.Authorization === "Bearer null") return status.noToken;
            if (error.response.status === 403) {
                localStorage.clear();
                dispatch(toggleIsAuthorized(false));
                return status.redirect;
            }
            return status.errorFeedback;
        }).finally(() => dispatch(toggleLoader(false)));
}

export const sendFeedback = (message: string, rating: number) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;

    return axios.post(`${API}/feedback`, { message, rating }, {
        headers: {
            "Authorization": `Bearer ${sessionToken}`
        }
    })
        .then(() => {
            dispatch(addNewFeedback({
                imageSrc: "",
                fullName: "",
                rating: rating,
                createdAt: new Date(Date.now()).toISOString(),
                message: message
            }))
            return status.successFeedback;
        })
        .catch(() => status.errorFeedback)
        .finally(() => dispatch(toggleLoader(false)));
}

export const googleAuth = () => async (dispatch: AppDispatch) => {
    dispatch(toggleLoader(true));
    window.location.href = `${API}/auth/google`;
}

export const getTraining = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;

    return axios.get(`${API}/training`, {
        headers: {
            "Authorization": `Bearer ${sessionToken}`
        }
    })
        .then((response) => response.data)
        .catch(() => status.noToken)
        .finally(() => dispatch(toggleLoader(false)));
}

export const getTrainingList = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;

    return axios.get(`${API}/catalogs/training-list`, {
        headers: {
            "Authorization": `Bearer ${sessionToken}`
        }
    })
        .then((response) => response.data)
        .catch(() => status.errorTrainingList)
        .finally(() => dispatch(toggleLoader(false)));
}
