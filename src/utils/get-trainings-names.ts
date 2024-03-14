import { formFields } from '@constants/types';

export function getTrainingNames(form: formFields) {
    const keys = Object.keys(form);
    return keys.map(key => form[key].name);
}
