import { TTraining } from '@constants/types';

export function getTotalReplays(trainingData: TTraining[]) {
    const replaysArr = trainingData.map(el => el.exercises.reduce((acc2, next2) => acc2 + next2.replays || 0, 0));

    return replaysArr.reduce((acc, next) => acc + next, 0);
}
