import { drawerFormFields } from "@constants/types";

export function convertFormDataToExercises(formFields: drawerFormFields) {
    return Object.values(formFields).map(el => ({
        name: el.name,
        replays: el.replays || 1,
        weight: el.weight || 0,
        approaches: el.approaches || 1
    }))
}
