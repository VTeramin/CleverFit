import { getCheckboxDeleteKeys } from './get-checkbox-delete-keys';

type TCheckboxList = {
    [key: number]: boolean;
}

export function sortCheckboxListFromEmpty(checkboxList: TCheckboxList, prevCheckboxList: TCheckboxList) {
    const deleteKeys = getCheckboxDeleteKeys(checkboxList);
    const newList = { ...prevCheckboxList };

    deleteKeys.forEach(key => {
        delete newList[key];
    });

    return newList;
}
