import { TTraining } from '@constants/types';
import { checkIsDatesEqual } from '@utils/check-is-dates-equal';
import { moveDay } from '@utils/move-day';

import { getEmptyTraining } from './get-empty-training';

export function fillInMissingTrainings(trainingData: TTraining[], start: Date, end: Date): TTraining[] {
    const isTrainingMissing = trainingData.findIndex(el => checkIsDatesEqual(new Date(el.date), start)) === -1;

    const trainingWithMissingOne: TTraining[] = isTrainingMissing
        ? [...trainingData, getEmptyTraining(start)]
        : trainingData;

    const newStart = moveDay(start, 1);

    return checkIsDatesEqual(newStart, end)
        ? trainingWithMissingOne.sort((a, b) => a.date > b.date ? 1 : -1)
        : fillInMissingTrainings(trainingWithMissingOne, newStart, end);
}
