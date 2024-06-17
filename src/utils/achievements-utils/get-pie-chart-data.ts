import { daysOfTheWeek } from '@constants/calendar-config';
import { TTraining } from '@constants/types';

import { getMostFrequentExerciseByDay } from './get-most-frequent-exercie-by-day';

function countExerciseInTraining(training: TTraining, exerciseName: string) {
    return training.exercises.reduce((acc, next) => next.name === exerciseName ? acc + 1 : acc, 0);
}

function countExerciseInAll(training: TTraining[], exerciseName: string) {
    return training.reduce((acc, next) => acc + countExerciseInTraining(next, exerciseName), 0);
}

export function getPieChartData(trainingData: TTraining[]) {
    const mostFrequentExercises = daysOfTheWeek.map((_, ind) => getMostFrequentExerciseByDay(trainingData, ind));
    const uniqueFrequentExercises = [...new Set(mostFrequentExercises)].filter(name => name !== '');

    const pieData = uniqueFrequentExercises.map((exerciseName, ind) => ({
        key: ind,
        value: countExerciseInAll(trainingData, exerciseName),
        exerciseName
    }));

    return pieData;
}
