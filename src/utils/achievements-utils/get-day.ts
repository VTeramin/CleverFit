export function getDay(date: string) {
    return new Date(date).getDay() || 7;
}
