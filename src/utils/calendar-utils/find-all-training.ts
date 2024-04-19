import { TTraining } from '@constants/types';
import { checkIsDatesEqual } from '@utils/check-is-dates-equal';
import moment from 'moment';

export const findAllTraining = (training: TTraining[], date: Date | undefined) => {
    if(date === undefined) {
        return training;
    }

    return training.filter(el => {
        const elDate = typeof el.date === 'number' ? new Date(el.date) : moment(el.date, 'YYYY-MM-DD HH:mm').toDate();

        return checkIsDatesEqual(elDate, date)
    });
};
