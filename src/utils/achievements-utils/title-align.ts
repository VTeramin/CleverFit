export function titleAlign(title: string, number: number): string {
    return number <= 0 ? title : titleAlign(`${title} `, number - 1);
}
