import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { ECalendarModalType } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarTrainingList } from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { changeModalType, toggleIsEdit, toggleIsModal } from '@redux/calendar-modal-slice';
import { selectTrainingList } from '@redux/training-list-slice';
import { selectTraining } from '@redux/training-slice';
import { getListData } from '@utils/calendar-utils/get-list-data';
import { convertDate } from '@utils/convert-date';
import { Button, Divider, Empty } from 'antd';

import emptyIcon from '../../../../assets/icon/empty.svg';

import 'antd/dist/antd.css';
import styles from './inner-default.module.css';

type TProps = {
    date: Date
}

export const InnerDefault: React.FC<TProps> = ({ date }) => {
    const dispatch = useAppDispatch();
    const trainingList = useAppSelector(selectTrainingList);
    const training = useAppSelector(selectTraining);
    const trainingNames = getListData(training, date);
    const isNoTrainings = trainingNames.length === 0;

    function handleAddTraining() {
        dispatch(toggleIsEdit(false));
        dispatch(changeModalType(ECalendarModalType.newTraining));
    }
    const isAddTrainingDisabled = trainingNames.length === trainingList.length || date < new Date(Date.now());

    const trainings = isNoTrainings
        ? <Empty
            image={emptyIcon}
            description=""
            className={styles.modal__empty}
        />
        : <div className={styles['modal__list-wrapper']}>
            <CalendarTrainingList date={date} listData={trainingNames} edit={true} />
        </div>;

    return (
        <div data-test-id="modal-create-training">
            <div className={styles.modal__header}>
                <p className={styles.modal__title}>Тренировки на {convertDate(date)}</p>
                {isNoTrainings && <p className={styles.modal__subtitle}>Нет активных тренировок</p>}
            </div>
            <div className={styles.modal__body}>
                {trainings}
            </div>
            <Divider className={styles.modal__divider} />
            <div className={styles['modal__button-wrapper']}>
                <Button
                    onClick={() => handleAddTraining()}
                    disabled={isAddTrainingDisabled}
                    className={styles.modal__button}
                >Создать тренировку</Button>
            </div>
            <CloseOutlined
                onClick={() => dispatch(toggleIsModal(false))}
                className={styles.modal__close}
                data-test-id="modal-create-training-button-close"
            />
        </div>
    );
};
