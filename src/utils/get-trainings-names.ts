import { drawerFormFields } from '@constants/types';

export function getTrainingNames(form: drawerFormFields) {
    const keys = Object.keys(form);
    return keys.map(key => form[key].name);
}
