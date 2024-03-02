import { store } from '@redux/configure-store';
import { changeFeedbackData } from '@redux/feedbackSlice';
import { toggleLoader } from '@redux/loaderSlice';
import { changeSessionToken, toggleIsAuthorized } from '@redux/userDataSlice';
import axios from 'axios';
axios.defaults.withCredentials = true;
const API = "https://marathon-api.clevertec.ru";

export async function login(email: string, password: string) {
    store.dispatch(toggleLoader(true));
    return axios({
        method: "post",
        url: `${API}/auth/login`,
        data: { email, password }
    })
        .then((response) => {
            const token = response.data.accessToken;
            if (store.getState().login.isRemember) localStorage.setItem("token", token);
            store.dispatch(changeSessionToken(token));
            store.dispatch(toggleIsAuthorized(true));
            return "/main";
        })
        .catch(() => "/result/error-login")
        .finally(() => store.dispatch(toggleLoader(false)));
}

export async function register(email: string, password: string) {
    store.dispatch(toggleLoader(true));
    return axios({
        method: "post",
        url: `${API}/auth/registration`,
        data: { email, password }
    })
        .then(() => "/result/success")
        .catch(error => {
            let path = "/result/error"
            if (error.response.status === 409) {
                path = "/result/error-user-exist"
            }
            return path;
        })
        .finally(() => store.dispatch(toggleLoader(false)));
}

export async function checkEmail(email: string) {
    store.dispatch(toggleLoader(true));
    return axios({
        method: "post",
        url: `${API}/auth/check-email`,
        data: { email }
    })
        .then(() => "/auth/confirm-email")
        .catch(error => {
            let path = "/result/error-check-email"
            if (error.response.status === 404 && error.response.data.message == "Email не найден") {
                path = "/result/error-check-email-no-exist"
            }
            return path;
        })
        .finally(() => store.dispatch(toggleLoader(false)));
}

export async function confirmEmail(email: string, code: string) {
    store.dispatch(toggleLoader(true));
    return axios({
        method: "post",
        url: `${API}/auth/confirm-email`,
        data: { email, code }
    })
        .then(() => "/auth/change-password")
        .catch(() => "error")
        .finally(() => store.dispatch(toggleLoader(false)));
}

export async function changePassword(password: string, confirmPassword: string) {
    store.dispatch(toggleLoader(true));
    return axios({
        method: "post",
        url: `${API}/auth/change-password`,
        data: { password, confirmPassword },
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(() => "/result/success-change-password")
        .catch(() => "/result/error-change-password")
        .finally(() => store.dispatch(toggleLoader(false)));
}

export async function getFeedbacks() {
    store.dispatch(toggleLoader(true));
    return axios({
        method: "get",
        url: `${API}/feedback`,
        headers: {
            "Authorization": `Bearer ${store.getState().userData.sessionToken}`
        }
    })
        .then(response => {
            store.dispatch(changeFeedbackData(response.data));
            return response.data;
        })
        .catch(error => {

            if (error.config.headers.Authorization === "Bearer null") return "no token";
            if (error.response.status === 403) {
                localStorage.clear();
                store.dispatch(toggleIsAuthorized(false));
                return "redirect";
            }
            return "error";
        }).finally(() => store.dispatch(toggleLoader(false)));
}

export async function sendFeedback(message: string, rating: number) {
    store.dispatch(toggleLoader(true));
    return axios({
        method: "post",
        url: `${API}/feedback`,
        data: { message, rating },
        headers: {
            "Authorization": `Bearer ${store.getState().userData.sessionToken}`
        }
    })
        .then(() => "success")
        .catch(() => "error")
        .finally(() => store.dispatch(toggleLoader(false)));
}

export async function googleAuth() {
    store.dispatch(toggleLoader(true));
    window.location.href = `${API}/auth/google`;
}
