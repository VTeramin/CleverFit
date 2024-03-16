export function getCalendarModalCoords(browserWidth: number) {
    const coords = { x: 0, y: 0 };
    if (!document.getElementsByClassName("ant-picker-cell-selected")[0]) return coords;
    const isMobile = browserWidth <= 800;
    const calendarMargin = 4;
    const modalWidth = isMobile ? 312: 264;
    const cellSelected = document.getElementsByClassName("ant-picker-cell-selected")[0];
    const cellWidth = cellSelected.clientWidth;
    const tdHeight = isMobile ? 30 : 0;

    const cellX = cellSelected.getBoundingClientRect().x;
    const cellY = cellSelected.getBoundingClientRect().y;

    if (isMobile) {
        coords.x = (browserWidth - modalWidth) / 2;
        coords.y = cellY + tdHeight - 3;
    } else {
        coords.x = cellX + 300 > browserWidth ? cellX - (modalWidth - cellWidth) - calendarMargin : cellX + calendarMargin;
        coords.y = cellY;
    }
    return coords;
}
