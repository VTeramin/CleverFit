import { TTraining } from '@constants/types';
import { checkIsDatesEqual } from '@utils/check-is-dates-equal';

export const findAllTraining = (training: TTraining[], date: Date) => training.filter(el => checkIsDatesEqual(new Date(el.date), date));
