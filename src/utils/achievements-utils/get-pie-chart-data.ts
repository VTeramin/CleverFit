import { TTraining } from '@constants/types';

import { getExercisesNames } from './get-exercises-names';

export function getPieChartData(trainingData: TTraining[]) {
    const allExerciseNames = getExercisesNames(trainingData).sort((a, b) => a > b ? -1 : 1);
    const uniqueExerciseNames = [...new Set(allExerciseNames)];

    const pieData = uniqueExerciseNames.map((exerciseName, ind) => ({
        key: ind,
        value: allExerciseNames.lastIndexOf(exerciseName) - allExerciseNames.indexOf(exerciseName) + 1,
        exerciseName
    }));

    return pieData;
}
