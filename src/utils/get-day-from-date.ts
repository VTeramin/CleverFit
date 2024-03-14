export function getDayFromDate(date: Date) {
    function addZeroIfOneDig(number: number) {
        return number < 10 ? "0" + number : number;
    }

    const day = addZeroIfOneDig(date.getDate());
    const month = addZeroIfOneDig(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}.${month}.${year}`
}
