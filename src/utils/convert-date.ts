import { getPureDate } from './get-pure-date';


export function convertDate(date: Date) {
    const utcDate = getPureDate(date);

    return utcDate.toISOString().substring(0, 10).split('-').reverse().join('.');
}
