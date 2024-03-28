import { EValid } from '@constants/enums';
import { TValidChange } from '@constants/types';
import { UploadFile } from 'antd/lib/upload';

export const checkIsSubmitProfileDisabled = (fileList: UploadFile[], valid: TValidChange, password: string, isFormChanged: boolean) => {
    const isPictureError = fileList[0]?.status !== 'done';
    const isPicture = fileList[0];
    const isPasswordsNotValid = valid.password === EValid.error || valid.confirmPassword === EValid.error;

    if (isPictureError && isPicture && isFormChanged || isPasswordsNotValid) {
        return true
    }

    if (!isPasswordsNotValid && password !== '' || isPicture && isFormChanged) {
        return false
    }

    return null;
}
