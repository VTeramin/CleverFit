import { AppDispatch, GetState } from '@redux/configure-store';
import { moveDay } from '@utils/move-day';

import { fillInMissingTrainings } from './fill-in-missing-trainings';

export const getMonthTrainingData = () => (_: AppDispatch, getState: GetState) => {
    const { training } = getState();
    const todayDate = new Date(Date.now());
    const todayMidnightDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    const daysUntilMonday = (todayMidnightDate.getDay() === 0 ? 0 : 7) - todayMidnightDate.getDay();

    const endDate = moveDay(todayMidnightDate, daysUntilMonday + 1);
    const startDate = moveDay(endDate, -28);

    const monthTraining = training.filter(el => {
        const trainingDate = new Date(el.date);

        return trainingDate >= startDate && trainingDate < endDate;
    });

    return fillInMissingTrainings(monthTraining, startDate, endDate);
}
