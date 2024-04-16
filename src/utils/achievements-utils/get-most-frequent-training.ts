import { TTraining } from '@constants/types';

export function getMostFrequentTraining(training: TTraining[]) {
    const names = training.map(el => el.name);
    const sortedNames = names.sort((a, b) => a > b ? -1 : 1);
    let counter = 0;
    let name = '';

    sortedNames.forEach(el => {
        const occurNumber = sortedNames.lastIndexOf(el) - sortedNames.indexOf(el);

        if(occurNumber > counter && el !== '') {
            counter = occurNumber;
            name = el;
        }
    })

    return name;
}
