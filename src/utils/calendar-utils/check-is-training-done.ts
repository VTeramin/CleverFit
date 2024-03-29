import { AppDispatch, GetState } from '@redux/configure-store';
import { checkIsDatesEqual } from '@utils/check-is-dates-equal';

export const checkIsTrainingDone = (trainingName: string, date: Date) => (_: AppDispatch, getState: GetState) => {
    const { training } = getState();

    return training.find(el => checkIsDatesEqual(date, new Date(el.date)) && el.name === trainingName)?.isImplementation;
}
