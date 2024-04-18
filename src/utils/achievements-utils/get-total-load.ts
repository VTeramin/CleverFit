import { TTraining } from '@constants/types';

export function getTotalLoad(trainingData: TTraining[]) {
    const loadsArr = trainingData.map(el => el.exercises.reduce((acc2, next2) => acc2 + (next2.weight * next2.approaches * next2.replays || 0), 0));

    return loadsArr.reduce((acc, next) => acc + next, 0);
}
