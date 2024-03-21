import { AppDispatch, GetState } from '@redux/configure-store';

export const getNamesInForm = () => (_: AppDispatch, getState: GetState) => {
    const form = getState().calendarModal.exerciseFormFields;
    const keys = Object.keys(form);

    return keys.map(key => ({ key, name: form[key].name }));
}
