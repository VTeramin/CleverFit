export function getCheckboxDeleteKeys(checkboxList: { [key: number]: boolean }) {
    const checkboxKeys = Object.keys(checkboxList).map(key => Number(key));

    return checkboxKeys.filter(key => checkboxList[key] === true);
}
