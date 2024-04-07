export const getMyTrainingModalCoords = (ind: number, pageSize: number, isMobile: boolean) => {
    if (isMobile) {
        return {
            x: 24,
            y: ind >= 5
            ? 39 + 37 * (ind % pageSize) - (ind === 0 ? 0 : 5)
            : 242 + 37 * (ind % pageSize) - (ind === 0 ? 0 : 5)
        }
    }

    return {
        x: 18,
        y: 57 + 37 * (ind % pageSize) - (ind === 0 ? 0 : 5)
    }
};
