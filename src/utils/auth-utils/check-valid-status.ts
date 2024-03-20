import { EValid } from "@constants/enums";
import { validPassword } from "./valid-password";
import { TLogin, TValidAuth, TValidChange } from "@constants/types";

type isValid = {
    [name: string]: boolean
}

type passwords = {
    password: string,
    confirmPassword: string
}

export function checkValidChangePassword(passwords: passwords, validStatus: TValidChange): TValidChange {
    return {
        password: validPassword(passwords.password) || passwords.password === "" ? EValid.success : EValid.error,
        confirmPassword: passwords.confirmPassword === passwords.password || (validStatus.password === EValid.error && passwords.confirmPassword === "") ? EValid.success : EValid.error
    }
}

export function checkDisabledChangePassword(passwords: passwords, validStatus: TValidChange): boolean {
    const isAllValid = validStatus.password === EValid.success && validStatus.confirmPassword === EValid.success;
    return !isAllValid || passwords.password === "" || passwords.confirmPassword === "";
}

export function checkValidAuth(isRegistration: boolean, isValid: isValid, formData: TLogin): TValidAuth {
    if (isRegistration) {
        return {
            email: (!isValid.email && formData.email !== "") || (isValid.confirmPassword && formData.confirmPassword !== "" && formData.email === "") ? EValid.error : EValid.success,
            password: (!isValid.password && formData.password !== "") || (isValid.email && formData.email !== "" && formData.password === "") ? EValid.error : EValid.success,
            confirmPassword: (formData.confirmPassword !== formData.password && formData.password !== "") || (isValid.email && formData.email !== "" && formData.confirmPassword === "") ? EValid.error : EValid.success,
            passwordHelp: (!isValid.password && formData.password !== "") ? EValid.error : EValid.normal,
            confirmPasswordHelp: (!isValid.confirmPassword && formData.confirmPassword !== "") ? EValid.error : EValid.normal
        }
    } else {
        return {
            email: (!isValid.email && formData.email !== "") || (isValid.password && formData.password !== "" && formData.email === "") ? EValid.error : EValid.success,
            password: !isValid.password && formData.password !== "" ? EValid.error : EValid.success,
            confirmPassword: EValid.success,
            passwordHelp: EValid.normal,
            confirmPasswordHelp: EValid.normal
        }
    }
}

export function checkDisabledAuth(isRegistration: boolean, isValid: isValid, formData: TLogin): boolean {
    const checkArray = isRegistration ? Object.values(isValid) : [formData.email, formData.password];
    return !checkArray.every(el => el);
}
