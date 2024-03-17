import { validPassword } from "./valid-password";
import { login, validAuth, validChange } from "@constants/types";

type isValid = {
    [name: string]: boolean
}

type passwords = {
    password: string,
    password2: string
}

export function checkValidChangePassword(passwords: passwords, validStatus: validChange): validChange {
    return {
        password: validPassword(passwords.password) || passwords.password === "" ? "success" : "error",
        password2: passwords.password2 === passwords.password || (validStatus.password === "error" && passwords.password2 === "") ? "success" : "error"
    }
}

export function checkDisabledChangePassword(passwords: passwords, validStatus: validChange): boolean {
    const isAllValid = validStatus.password === "success" && validStatus.password2 === "success";
    return !isAllValid || passwords.password === "" || passwords.password2 === "";
}

export function checkValidAuth(isRegistration: boolean, isValid: isValid, formData: login): validAuth {
    if (isRegistration) {
        return {
            email: (!isValid.email && formData.email !== "") || (isValid.password2 && formData.password2 !== "" && formData.email === "") ? "error" : "success",
            password: (!isValid.password && formData.password !== "") || (isValid.email && formData.email !== "" && formData.password === "") ? "error" : "success",
            password2: (formData.password2 !== formData.password && formData.password !== "") || (isValid.email && formData.email !== "" && formData.password2 === "") ? "error" : "success",
            passwordHelp: (!isValid.password && formData.password !== "") ? "error" : "normal",
            password2Help: (!isValid.password2 && formData.password2 !== "") ? "error" : "normal"
        }
    } else {
        return {
            email: (!isValid.email && formData.email !== "") || (isValid.password && formData.password !== "" && formData.email === "") ? "error" : "success",
            password: !isValid.password && formData.password !== "" ? "error" : "success",
            password2: "success",
            passwordHelp: "normal",
            password2Help: "normal"
        }
    }
}

export function checkDisabledAuth(isRegistration: boolean, isValid: isValid, formData: login): boolean {
    const checkArray = isRegistration ? Object.values(isValid) : [formData.email, formData.password];
    return !checkArray.every(el => el);
}
