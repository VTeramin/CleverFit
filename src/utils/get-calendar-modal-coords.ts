export function getCalendarModalCoords(width: number) {
    if (!document.getElementsByClassName("ant-picker-cell-selected")[0]) return { x: 0, y: 0 };
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
