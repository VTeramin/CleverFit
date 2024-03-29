import { convertDate } from './convert-date';

export function checkIsDatesEqual(date1: Date, date2: Date) {
    const dates = [date1, date2].map(date => convertDate(date));

    return dates[0] === dates[1];
}
