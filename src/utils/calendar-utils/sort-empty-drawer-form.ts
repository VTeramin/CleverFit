import { drawerFormFields } from "@constants/types";

export function sortEmptyDrawerForm(values: { exercises: drawerFormFields }) {
    const allDataForm = values.exercises;
    const noEmptyKeys = Object.keys(allDataForm).filter(key => {
        const name = allDataForm[key].name;
        return name === undefined || name === "";
    });
    noEmptyKeys.map(key => delete allDataForm[key]);
    return allDataForm;
}
