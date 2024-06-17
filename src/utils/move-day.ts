export function moveDay(date: Date, value: number) {
    const dateCopy = new Date(date);

    return new Date(dateCopy.setDate(dateCopy.getDate() + value));
}
