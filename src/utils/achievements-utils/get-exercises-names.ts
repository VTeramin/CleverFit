import { TTraining } from '@constants/types';

export function getExercisesNames(training: TTraining[]) {
    const exercises = training.map(el => el.exercises);
    const names: string[] = [];

    exercises.forEach(exerciseArr => exerciseArr.forEach(exercise => names.push(exercise.name || '')));

    return names;
}
