export function checkIsFuture(date: Date) {
    const dates = [date, new Date(Date.now())].map(date => {
        return date.toISOString().substring(0, 10);
    });
    return dates[1] < dates[0];
}
