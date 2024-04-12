type TCheckboxList = {
    [key: number]: boolean;
}

export function sortCheckboxListFromEmpty(checkboxList: TCheckboxList, prevCheckboxList: TCheckboxList, remove: (index: number | number[]) => void) {
    const checkboxKeys = Object.keys(checkboxList).map(key => Number(key));
    const checkboxTrueList = checkboxKeys.filter(key => checkboxList[key] === true);
    const newList = { ...prevCheckboxList };

    checkboxTrueList.forEach(key => {
        delete newList[key];
    });

    remove(checkboxTrueList);

    return newList;
}
