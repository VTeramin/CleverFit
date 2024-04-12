import { getUTCDate } from './get-UTC-date';

export function convertDate(date: Date) {
    const utcDate = getUTCDate(date);

    return utcDate.toISOString().substring(0, 10).split('-').reverse().join('.');
}
