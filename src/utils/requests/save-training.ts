import { API } from '@constants/api';
import { ECalendarModalType, EStatus } from '@constants/enums';
import { changeModalType, changeResultType } from '@redux/calendar-modal-slice';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import { findTrainingId } from '@utils/calendar-utils/find-training-id';
import { checkIsFuture } from '@utils/check-is-future';
import axios from 'axios';

import { getTraining } from './get-training';

axios.defaults.withCredentials = true;

export const saveTraining = (date: Date) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const { selectedTraining, exerciseFormFields, isEdit, interval } = getState().calendarModal;

    const trainingId = dispatch(findTrainingId(date, selectedTraining as string));
    const isImplementation = !checkIsFuture(date);

    const parameters = interval === 0 ? {} : {
        repeat: true,
        period: interval
    };

    const data = {
        name: selectedTraining as string,
        date,
        exercises: Object.values(exerciseFormFields),
        parameters
    };

    const params = {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    };

    const action = isEdit
        ? axios.put(`${API}/training/${trainingId}`, { ...data, isImplementation }, params)
        : axios.post(`${API}/training`, data, params);

    return action.then(() => {
        dispatch(changeModalType(ECalendarModalType.default));
        dispatch(changeResultType(EStatus.success));
        dispatch(getTraining());
    })
        .catch(() => dispatch(changeResultType(EStatus.errorSaveTraining)))
        .finally(() => dispatch(toggleLoader(false)));
};
