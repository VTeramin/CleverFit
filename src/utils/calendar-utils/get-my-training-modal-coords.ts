export const getMyTrainingModalCoords = (ind: number, pageSize: number) => ({
    x: 18,
    y: 57 + 32 * (ind % pageSize)
});
