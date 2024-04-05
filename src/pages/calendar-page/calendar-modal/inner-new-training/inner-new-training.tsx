import React from 'react';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { ECalendarModalType, EStatus } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { TrainingSelect } from '@pages/calendar-page/calendar-modal/inner-new-training/training-select/training-select';
import { changeModalType, changeResultType, selectCalendarModalData, toggleIsDrawer } from '@redux/calendar-modal-slice';
import { getNamesInForm } from '@utils/calendar-utils/get-names-in-form';
import { saveTraining } from '@utils/requests/save-training';
import { Button, Divider, Empty } from 'antd';

import emptyIcon from '../../../../assets/icon/empty.svg';

import 'antd/dist/antd.css';
import styles from './inner-new-training.module.css';

type TProps = {
    date: Date
}

export const InnerNewTraining: React.FC<TProps> = ({ date }) => {
    const dispatch = useAppDispatch();
    const { selectedTraining, isEdit } = useAppSelector(selectCalendarModalData);
    const exerciseNames = dispatch(getNamesInForm());
    const isNoExercise = exerciseNames.length === 0;
    const isSaveDisabled = !isEdit && exerciseNames.length === 0;

    function handleAddTraining() {
        dispatch(toggleIsDrawer(true));
    }

    function handleSaveTraining() {
        dispatch(saveTraining(date)).then(() => dispatch(changeResultType(EStatus.empty)));
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
                <TrainingSelect date={date} />
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
