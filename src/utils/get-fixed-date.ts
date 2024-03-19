export function getFixedDate(date: Date) {
    return date.toISOString().substring(0, 10);
}
