import { TTraining } from '@constants/types';

import { findAllTraining } from './find-all-training';

export function getListData(training: TTraining[], date: Date) {
    return findAllTraining(training, date).map(el => ({
        // eslint-disable-next-line no-underscore-dangle
        key: el._id as string,
        name: el.name
    }));
}
