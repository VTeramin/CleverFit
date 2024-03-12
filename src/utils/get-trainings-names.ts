import { FieldData } from 'rc-field-form/lib/interface';

export function getTrainingNames(form: FieldData[]) {
    return form.map(el => {
        const fieldName = el.name[0].split(" ")[1];
        if(fieldName === "training-name") return el.value;
    }).filter(el => el !== undefined);
}
