import { TTraining } from '@constants/types';
import { moveDay } from '@utils/move-day';

import { fillInMissingTrainings } from './fill-in-missing-trainings';

export const getWeekTrainingData = (training: TTraining[]) => {
    const todayDate = new Date(Date.now());
    const tomorrowDate = moveDay(todayDate, 1);
    const endDate = new Date(tomorrowDate.getFullYear(), tomorrowDate.getMonth(), tomorrowDate.getDate());
    const startDate = moveDay(endDate, -7);

    const weekTraining = training.filter(el => {
        const trainingDate = new Date(el.date);

        return trainingDate >= startDate && trainingDate < endDate;
    });

    return fillInMissingTrainings(weekTraining, startDate, endDate);
}
