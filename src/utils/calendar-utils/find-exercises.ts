import { TDrawerFormFields } from '@constants/types';
import { AppDispatch } from '@redux/configure-store';

import { findTraining } from './find-training';

export const findExercises = (fixedDate: string, trainingName: string) => (dispatch: AppDispatch) => {
    const todayExercises = dispatch(findTraining(new Date(fixedDate), trainingName))?.exercises;

    return { ...todayExercises } as TDrawerFormFields;
}
