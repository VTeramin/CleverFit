import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeEditTraining, changeExerciseFormFields, changeSelectedTraining, selectCalendarModalData, toggleIsEdit } from '@redux/calendar-modal-slice';
import { selectTraining } from '@redux/training-slice';
import { findAllTraining } from '@utils/calendar-utils/find-all-training';
import { findExercises } from '@utils/calendar-utils/find-exercises';
import { getTrainingSelectOptions } from '@utils/calendar-utils/get-training-select-options';
import { getFixedDate } from '@utils/get-fixed-date';
import { Select } from 'antd';

import 'antd/dist/antd.css';
import styles from './training-select.module.css';

type TProps = {
    date?: Date
}

export const TrainingSelect: React.FC<TProps> = ({ date }) => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const { pathname } = useLocation();
    const isMyTrainingPage = pathname === '/training';
    const { selectedTraining, editTraining } = useAppSelector(selectCalendarModalData);
    const trainingNames = findAllTraining(training, date).map(el => el.name);
    const selectOptions = dispatch(getTrainingSelectOptions(date));
    const [isOpen, setIsOpen] = useState(false);

    function handleSelect(value: string) {
        if (!isMyTrainingPage) {
            if (trainingNames.includes(value)) {
                dispatch(toggleIsEdit(true));
                dispatch(changeEditTraining(value));
            } else {
                dispatch(toggleIsEdit(false));
            }
        }
        dispatch(changeSelectedTraining(value));
        if (date) {
            const exercises = dispatch(findExercises(getFixedDate(date), value));

            if (Object.values(exercises).length > 0) {
                dispatch(toggleIsEdit(true));
            }

            dispatch(changeExerciseFormFields(exercises));
        }
    }

    return (
        <Select
            showSearch={isMyTrainingPage}
            placeholder="Выбор типа тренировки"
            value={selectedTraining}
            defaultValue={editTraining}
            getPopupContainer={triggerNode => triggerNode.parentElement}
            open={isOpen}
            options={selectOptions}
            bordered={false}
            defaultOpen={true}
            className={styles.modal__input}
            onSelect={value => handleSelect(value)}
            popupClassName={styles.modal__dropdown}
            onFocus={() => setIsOpen(true)}
            onDropdownVisibleChange={(visible) => setIsOpen(visible)}
            id='select-training'
        />
    );
};
