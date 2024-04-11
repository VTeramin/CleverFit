export function convertDate(date: Date) {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));

    return utcDate.toISOString().substring(0, 10).split('-').reverse().join('.');
}
