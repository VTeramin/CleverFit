import { drawerFormFields } from "@constants/types";

export function sortDrawerFormFromEmpty(values: { exercises: drawerFormFields }) {
    const allDataForm = values.exercises;
    const emptyNamesKeys = Object.keys(allDataForm).filter(key => {
        const name = allDataForm[key].name;
        return name === undefined || name === "";
    });
    emptyNamesKeys.map(key => delete allDataForm[key]);
    return allDataForm;
}
