import { FieldData } from 'rc-field-form/lib/interface';

type formFields = {
    [key: string]: FieldData[]
}

export function getTrainingNames(form: formFields) {
    const keys = Object.keys(form);
    return keys.map(key => form[key][0].value);
}
