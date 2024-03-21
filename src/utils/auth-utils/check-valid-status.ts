import { EValid } from '@constants/enums';
import { TLogin, TValidAuth, TValidChange } from '@constants/types';

import { validPassword } from './valid-password';

type TIsValid = {
    [name: string]: boolean
}

type TPasswords = {
    password: string,
    confirmPassword: string
}

export function checkValidChangePassword(passwords: TPasswords, validStatus: TValidChange): TValidChange {
    return {
        password: validPassword(passwords.password) || passwords.password === '' ? EValid.success : EValid.error,
        confirmPassword: passwords.confirmPassword === passwords.password || (validStatus.password === EValid.error && passwords.confirmPassword === '') ? EValid.success : EValid.error
    }
}

export function checkDisabledChangePassword(passwords: TPasswords, validStatus: TValidChange): boolean {
    const isAllValid = validStatus.password === EValid.success && validStatus.confirmPassword === EValid.success;

    return !isAllValid || passwords.password === '' || passwords.confirmPassword === '';
}

export function checkValidAuth(isValid: TIsValid, formData: TLogin): TValidAuth {
        return {
            email: (!isValid.email && formData.email !== '') || (isValid.password && formData.password !== '' && formData.email === '') ? EValid.error : EValid.success,
            password: !isValid.password && formData.password !== '' ? EValid.error : EValid.success,
            confirmPassword: EValid.success,
            passwordHelp: EValid.normal,
            confirmPasswordHelp: EValid.normal
        }
}

export function checkValidRegistraion(isValid: TIsValid, formData: TLogin): TValidAuth {
    return {
        email: (!isValid.email && formData.email !== '') || (isValid.confirmPassword && formData.confirmPassword !== '' && formData.email === '') ? EValid.error : EValid.success,
        password: (!isValid.password && formData.password !== '') || (isValid.email && formData.email !== '' && formData.password === '') ? EValid.error : EValid.success,
        confirmPassword: (formData.confirmPassword !== formData.password && formData.password !== '') || (isValid.email && formData.email !== '' && formData.confirmPassword === '') ? EValid.error : EValid.success,
        passwordHelp: (!isValid.password && formData.password !== '') ? EValid.error : EValid.normal,
        confirmPasswordHelp: (!isValid.confirmPassword && formData.confirmPassword !== '') ? EValid.error : EValid.normal
    }
}

export function checkDisabledAuth(isRegistration: boolean, isValid: TIsValid, formData: TLogin): boolean {
    const checkArray = isRegistration ? Object.values(isValid) : [formData.email, formData.password];

    return !checkArray.every(el => el);
}
