import { TDrawerFormFields } from '@constants/types';

export function sortDrawerFormFromEmpty(values: { exercises: TDrawerFormFields }) {
    const allDataForm = values.exercises;
    const emptyNamesKeys = Object.keys(allDataForm).filter(key => {
        const { name } = allDataForm[key];

        return name === undefined || name === '';
    });

    emptyNamesKeys.map(key => delete allDataForm[key]);

    return allDataForm;
}
