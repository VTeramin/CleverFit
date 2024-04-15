import { AppDispatch, GetState } from '@redux/configure-store';

export const getMonthTrainingData = () => (_: AppDispatch, getState: GetState) => {
    const { training } = getState();

    return training.filter(el => {
        const trainingDate = new Date(el.date);
        const todayDate = new Date(Date.now());
        const endDate = new Date(new Date(Date.now()).setDate(todayDate.getDate() + (todayDate.getDay() === 0 ? 0 : 7) - todayDate.getDay()));
        const startDate = new Date(new Date(Date.now()).setDate(endDate.getDate() - 27));

        return trainingDate > startDate && trainingDate <= endDate;
    });
}
