import { TTraining } from '@constants/types';

export function getEmptyTraining(date: Date) {
    const missingTraining: TTraining = {
        name: '',
        date: date.toISOString(),
        exercises: []
    };

    return missingTraining;
}
