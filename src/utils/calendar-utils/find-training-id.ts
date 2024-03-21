import { AppDispatch } from '@redux/configure-store';

import { findTraining } from './find-training';

// eslint-disable-next-line no-underscore-dangle
export const findTrainingId = (date: Date, trainingName: string) => (dispatch: AppDispatch) => dispatch(findTraining(date, trainingName))?._id
