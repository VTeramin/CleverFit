export function getCalendarModalCoords(width: number) {
    const calendarMargin = 4;
    const modalWidth = 264;
    const cellSelected = document.getElementsByClassName("ant-picker-cell-selected")[0];
    const cellWidth = document.getElementsByClassName("ant-picker-cell-selected")[0].clientWidth;

    const cellX = cellSelected.getBoundingClientRect().x;
    const cellY = cellSelected.getBoundingClientRect().y;
    const x = cellX + 300 > width ? cellX - (modalWidth - cellWidth) - calendarMargin : cellX + calendarMargin;
    const y = cellY;
    return { x, y }
}
