import React from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeEditTraining, changeSelectedTraining, selectCalendarModalData, toggleIsEdit } from '@redux/calendar-modal-slice';
import { selectTraining } from '@redux/training-slice';
import { findAllTraining } from '@utils/calendar-utils/find-all-training';
import { getTrainingSelectOptions } from '@utils/calendar-utils/get-training-select-options';
import { Select } from 'antd';

import 'antd/dist/antd.css';
import styles from './training-select.module.css';

type TProps = {
    date?: Date
}

export const TrainingSelect: React.FC<TProps> = ({ date }) => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const { selectedTraining, editTraining } = useAppSelector(selectCalendarModalData);
    const trainingNames = findAllTraining(training, date).map(el => el.name);
    const selectOptions = dispatch(getTrainingSelectOptions(date));

    function handleSelect(value: string) {
        if (trainingNames.includes(value) && date !== undefined) {
            dispatch(toggleIsEdit(true));
            dispatch(changeEditTraining(value));
        } else {
            dispatch(toggleIsEdit(false));
        }
        dispatch(changeSelectedTraining(value));
    }

    return (
        <Select
            placeholder="Выбор типа тренировки"
            value={selectedTraining}
            defaultValue={editTraining}
            onSelect={value => handleSelect(value)}
            options={selectOptions}
            bordered={false}
            className={styles.modal__input}
            popupClassName={styles.modal__dropdown}
            data-test-id="modal-create-exercise-select"
        />
    );
};
