export function getCalendarModalCoords(browserWidth: number) {
    const coords = { x: 0, y: 0 };

    if (!document.getElementsByClassName('ant-picker-cell-selected')[0]) return coords;
    const isMobile = browserWidth <= 800;
    const calendarHorMargin = 4;
    const calendarVertMargin = 3;
    const modalWidth = isMobile ? 312: 264;
    const tdHeight = isMobile ? 30 : 0;
    const cellSelected = document.getElementsByClassName('ant-picker-cell-selected')[0];
    const cellWidth = cellSelected.clientWidth;

    const cellX = cellSelected.getBoundingClientRect().x;
    const cellY = cellSelected.getBoundingClientRect().y;

    if (isMobile) {
        coords.x = (browserWidth - modalWidth) / 2;
        coords.y = cellY + tdHeight - calendarVertMargin;
    } else {
        coords.x = cellX + 300 > browserWidth ? cellX - (modalWidth - cellWidth) - calendarHorMargin : cellX + calendarHorMargin;
        coords.y = cellY;
    }

    return coords;
}
