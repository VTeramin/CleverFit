import { TExercise, TTraining } from '@constants/types';
import { checkIsDatesEqual } from '@utils/check-is-dates-equal';

function getExerciseLoad(exercises: TExercise[]) {
    return exercises.reduce((prev, curr) => prev + curr.approaches * curr.weight * curr.replays, 0);
}

function getTrainingLoad(trainingData: TTraining[], date: string) {
    const todayTraining = trainingData.filter(el => checkIsDatesEqual(new Date(el.date), new Date(date)));
    const totalLoad = todayTraining.reduce((prev, curr) => prev + getExerciseLoad(curr.exercises) || 0, 0);
    const exercisesCounter = todayTraining.reduce((prev, curr) => prev + curr.exercises.length || 0, 0);

    return exercisesCounter === 0 ? 0 : Math.round(totalLoad / exercisesCounter);
}

export function getColumnChartData(trainingData: TTraining[]) {
    const allDates = [...trainingData].map(el => {
        const fixedDate = new Date(el.date);

        return new Date(fixedDate.getFullYear(), fixedDate.getMonth(), fixedDate.getDate()).toISOString();
    });

    const uniqueDates = [...new Set(allDates)];

    return uniqueDates.map(date => ({ date, weight: getTrainingLoad(trainingData, date) }));
}
