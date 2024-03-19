export function convertDate(date: Date) {
    return date.toISOString().substring(0, 10).split("-").reverse().join(".");
}
