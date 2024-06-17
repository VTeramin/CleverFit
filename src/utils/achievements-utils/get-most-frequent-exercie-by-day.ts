import { TTraining } from '@constants/types';

import { getMostFrequentExercise } from './get-most-frequent-exercise';

export function getMostFrequentExerciseByDay(trainingData: TTraining[], day: number) {
        const weekDayInd = day === 0 ? 6 : day - 1;
        const trainingCopy = [...trainingData].filter(el => new Date(el.date).getDay() === weekDayInd);

        return getMostFrequentExercise(trainingCopy);
}
