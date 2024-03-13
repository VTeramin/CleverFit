import { formFields } from "@constants/types";

export function convertFormDataToExercises(formFields: formFields) {
    return Object.values(formFields).map(el => ({
        name: el[0].value,
        replays: el[1].value || 1,
        weight: el[2].value || 0,
        approaches: el[3].value || 1
    }))
}
