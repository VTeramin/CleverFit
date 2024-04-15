import { TTraining } from '@constants/types';

import { getExercisesNames } from './get-exercises-names';

export function getMostFrequentExercise(training: TTraining[]) {
    const sortedNames = getExercisesNames(training).sort((a, b) => a > b ? -1 : 1);
    let counter = 0;
    let name = '';

    sortedNames.forEach(el => {
        const occurNumber = sortedNames.lastIndexOf(el) - sortedNames.indexOf(el) + 1;

        if(occurNumber > counter && el !== '') {
            counter = occurNumber;
            name = el;
        }
    });

    return name.toLowerCase();
}
