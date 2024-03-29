import { EValid } from '@constants/enums';
import { TValidChange } from '@constants/types';
import { UploadFile } from 'antd/lib/upload';

export const checkIsSubmitProfileDisabled = (fileList: UploadFile[], valid: TValidChange, password: string, emailValid: EValid, email: string | undefined) => {
    const isPictureError = fileList[0]?.status === 'error';
    const isPasswordsNotValid = valid.password === EValid.error || valid.confirmPassword === EValid.error;
    const isEmailNotValid = emailValid === EValid.error;
    const isEmailExist = email !== '' && email !== undefined;

    if (isPictureError || isPasswordsNotValid && password !== '' || isEmailNotValid && isEmailExist) {
        return true;
    }

    return false;
}
