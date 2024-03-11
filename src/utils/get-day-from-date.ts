export function dateToString(date: Date) {
    function addZeroIfOneDig(number: number) {
        return number < 10 ? "0" + number : number;
    }

    const day = addZeroIfOneDig(date.getDate());
    const month = addZeroIfOneDig(date.getMonth());
    const year = date.getFullYear();

    return `${day}.${month}.${year}`
}
