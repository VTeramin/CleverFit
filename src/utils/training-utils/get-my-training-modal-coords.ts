export const getMyTrainingModalCoords = (id: string, pageSize: number, isMobile: boolean) => {
    const elements = document.querySelectorAll('.table-cell');
    const ind = [...elements].findIndex(el => el.id === id);

    if (isMobile) {
        return {
            x: 24,
            y: ind >= 5
            ? 39 + 37 * (ind % pageSize) - (ind === 0 ? 0 : 5)
            : 242 + 37 * (ind % pageSize) - (ind === 0 ? 0 : 5)
        }
    }

    return {
        x: 12,
        y: 53 + 37 * (ind % pageSize) - (ind === 0 ? 0 : 5)
    }
};
