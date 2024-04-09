/* eslint-disable no-underscore-dangle */
import { API } from '@constants/api';
import { ECalendarModalType, EStatus } from '@constants/enums';
import { TTraining } from '@constants/types';
import { changeModalType, changeResultType } from '@redux/calendar-modal-slice';
import { AppDispatch, GetState } from '@redux/configure-store';
import { toggleLoader } from '@redux/loader-slice';
import { findTrainingId } from '@utils/calendar-utils/find-training-id';
import { checkIsFuture } from '@utils/check-is-future';
import axios, { AxiosResponse } from 'axios';

import { getTraining } from './get-training';
import { sendInvite } from './send-invite';

axios.defaults.withCredentials = true;

export const saveTraining = (date: Date) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { sessionToken } = getState().userData;
    const { selectedTraining, exerciseFormFields, isEdit, isJoint, interval } = getState().calendarModal;

    const trainingId = dispatch(findTrainingId(date, selectedTraining as string));
    const isImplementation = !checkIsFuture(date);

    const parameters = interval === null ? {} : {
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

    const action = isEdit && !isJoint
        ? axios.put(`${API}/training/${trainingId}`, { ...data, isImplementation }, params)
        : axios.post(`${API}/training`, data, params);

    return action.then((response: AxiosResponse<TTraining>) => {
        dispatch(changeModalType(ECalendarModalType.default));
        dispatch(changeResultType(isEdit ? EStatus.successEdit : EStatus.success));
        dispatch(getTraining());
        if (isJoint) dispatch(sendInvite(response.data._id as string));
    })
        .catch(() => dispatch(changeResultType(EStatus.errorSaveTraining)))
        .finally(() => dispatch(toggleLoader(false)));
};
