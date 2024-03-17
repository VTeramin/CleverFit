export function checkIsDatesEqual(date1: Date, date2: Date) {
    const dates = [date1, date2].map(date => date.toISOString().substring(0, 10));
    return dates[0] === dates[1];
}
