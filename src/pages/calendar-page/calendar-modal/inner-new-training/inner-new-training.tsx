import React from 'react';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { ECalendarModalType } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeEditTraining, changeModalType, changeSelectedTraining, selectCalendarModalData, toggleIsDrawer, toggleIsEdit } from '@redux/calendar-modal-slice';
import { selectTraining } from '@redux/training-slice';
import { findAllTraining } from '@utils/calendar-utils/find-all-training';
import { getNamesInForm } from '@utils/calendar-utils/get-names-in-form';
import { getTrainingSelectOptions } from '@utils/calendar-utils/get-training-select-options';
import { getTraining } from '@utils/requests/get-training';
import { saveTraining } from '@utils/requests/save-training';
import { Button, Divider, Empty, Select } from 'antd';

import emptyIcon from '../../../../assets/icon/empty.svg';

import 'antd/dist/antd.css';
import styles from './inner-new-training.module.css';

type TProps = {
    date: Date
}

export const InnerNewTraining: React.FC<TProps> = ({ date }) => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const { selectedTraining, editTraining, isEdit } = useAppSelector(selectCalendarModalData);
    const trainingNames = findAllTraining(training, date).map(el => el.name);
    const exerciseNames = dispatch(getNamesInForm());
    const isNoExercise = exerciseNames.length === 0;
    const selectOptions = dispatch(getTrainingSelectOptions(date));
    const isSaveDisabled = !isEdit && exerciseNames.length === 0;

    function handleSelect(value: string) {
        if (trainingNames.includes(value)) {
            dispatch(toggleIsEdit(true));
            dispatch(changeEditTraining(value));
        } else {
            dispatch(toggleIsEdit(false));
        }
        dispatch(changeSelectedTraining(value));
    }

    function handleAddTraining() {
        dispatch(toggleIsDrawer(true));
    }

    function handleSaveTraining() {
        dispatch(saveTraining(date)).then(() => dispatch(getTraining()));
    }

    const trainings = isNoExercise
        ? <Empty image={emptyIcon} description="" className={styles.modal__empty} />
        : exerciseNames.map((el, ind) => (
            <div key={el.key} className={styles.body__trainings}>
                <p className={styles.trainings__name}>{el.name}</p>
                <EditOutlined
                    className={styles.trainings__edit}
                    onClick={() => handleAddTraining()}
                    data-test-id={`modal-update-training-edit-button${ind}`}
                />
            </div>
        ));

    return (
        <div data-test-id="modal-create-exercise">
            <div className={styles.modal__header}>
                <ArrowLeftOutlined
                    onClick={() => dispatch(changeModalType(ECalendarModalType.default))}
                    data-test-id="modal-exercise-training-button-close"
                />
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
            </div>
            <Divider className={styles.modal__divider} />
            <div className={styles.modal__body}>
                {trainings}
            </div>
            <Divider className={styles.modal__divider} />
            <div className={styles.modal__buttons}>
                <Button
                    onClick={() => handleAddTraining()}
                    disabled={selectedTraining === null}
                >
                    Добавить упражнения
                </Button>
                <Button
                    type="text"
                    disabled={isSaveDisabled}
                    onClick={() => handleSaveTraining()}
                >{date < new Date(Date.now()) ? 'Сохранить изменения' : 'Сохранить'}</Button>
            </div>
        </div>
    );
};
