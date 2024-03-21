import { AppDispatch, GetState } from '@redux/configure-store';
import { TTrainingListItem } from '@redux/training-list-slice';
import { checkIsFuture } from '@utils/check-is-future';

import { checkIsTrainingDone } from './check-is-training-done';
import { findAllTraining } from './find-all-training';

export const getTrainingSelectOptions = (date: Date) => (_: AppDispatch, getState: GetState) => {
    const { training, trainingList } = getState();
    const { isEdit } = getState().calendarModal;
    const trainingNames = findAllTraining(training, date).map(el => el.name);
    const allTrainingNames = trainingList.map((el: TTrainingListItem) => ({ value: el.name }));
    const isFuture = checkIsFuture(date);

    if (!isFuture) {
        return allTrainingNames.filter(el => trainingNames.includes(el.value) && !checkIsTrainingDone(el.value, date));
    }
    if (isEdit) {
        return allTrainingNames;
    }

    return allTrainingNames.filter(el => !trainingNames.includes(el.value));
}
