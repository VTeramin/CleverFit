import axios from 'axios';
axios.defaults.withCredentials = true;
const API = "https://marathon-api.clevertec.ru";

export async function login(email, password) {
    return axios({
        method: "post",
        url: `${API}/auth/login`,
        data: { email, password }
    })
        .then((responce) => {
            const token = responce.data.accessToken;
            localStorage.setItem("token", token);
            return "/main";
        })
        .catch(() => "/result/error-login");
}

export async function register(email, password) {
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
        });
}

export async function checkEmail(email) {
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
        });
}

export async function confirmEmail(email, code) {
    return axios({
        method: "post",
        url: `${API}/auth/confirm-email`,
        data: { email, code }
    })
        .then(() => "/auth/change-password")
        .catch(() => "error");
}

export async function changePassword(password, confirmPassword) {
    axios.defaults.withCredentials = true;
    return axios({
        method: "post",
        url: `${API}/auth/change-password`,
        data: { password, confirmPassword },
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(() => "/result/success-change-password")
        .catch((error) => {
            console.log(error.response.data.message)
            return "/result/error-change-password";
        });
}
