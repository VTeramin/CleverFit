import { TTraining } from '@constants/types';

export function getTotalApproaches(trainingData: TTraining[]) {
    const approachesArr = trainingData.map(el => el.exercises.reduce((acc2, next2) => acc2 + next2.approaches || 0, 0));

    return approachesArr.reduce((acc, next) => acc + next, 0);
}
