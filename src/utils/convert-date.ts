export function convertDate(date: string) {
    return date.substring(0, 10).split("-").reverse().join(".");
}
