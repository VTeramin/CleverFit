import { valid } from "@constants/enums";
import { validPassword } from "./valid-password";
import { login, validAuth, validChange } from "@constants/types";

type isValid = {
    [name: string]: boolean
}

type passwords = {
    password: string,
    confirmPassword: string
}

export function checkValidChangePassword(passwords: passwords, validStatus: validChange): validChange {
    return {
        password: validPassword(passwords.password) || passwords.password === "" ? valid.success : valid.error,
        confirmPassword: passwords.confirmPassword === passwords.password || (validStatus.password === valid.error && passwords.confirmPassword === "") ? valid.success : valid.error
    }
}

export function checkDisabledChangePassword(passwords: passwords, validStatus: validChange): boolean {
    const isAllValid = validStatus.password === valid.success && validStatus.confirmPassword === valid.success;
    return !isAllValid || passwords.password === "" || passwords.confirmPassword === "";
}

export function checkValidAuth(isRegistration: boolean, isValid: isValid, formData: login): validAuth {
    if (isRegistration) {
        return {
            email: (!isValid.email && formData.email !== "") || (isValid.confirmPassword && formData.confirmPassword !== "" && formData.email === "") ? valid.error : valid.success,
            password: (!isValid.password && formData.password !== "") || (isValid.email && formData.email !== "" && formData.password === "") ? valid.error : valid.success,
            confirmPassword: (formData.confirmPassword !== formData.password && formData.password !== "") || (isValid.email && formData.email !== "" && formData.confirmPassword === "") ? valid.error : valid.success,
            passwordHelp: (!isValid.password && formData.password !== "") ? valid.error : valid.normal,
            confirmPasswordHelp: (!isValid.confirmPassword && formData.confirmPassword !== "") ? valid.error : valid.normal
        }
    } else {
        return {
            email: (!isValid.email && formData.email !== "") || (isValid.password && formData.password !== "" && formData.email === "") ? valid.error : valid.success,
            password: !isValid.password && formData.password !== "" ? valid.error : valid.success,
            confirmPassword: valid.success,
            passwordHelp: valid.normal,
            confirmPasswordHelp: valid.normal
        }
    }
}

export function checkDisabledAuth(isRegistration: boolean, isValid: isValid, formData: login): boolean {
    const checkArray = isRegistration ? Object.values(isValid) : [formData.email, formData.password];
    return !checkArray.every(el => el);
}
