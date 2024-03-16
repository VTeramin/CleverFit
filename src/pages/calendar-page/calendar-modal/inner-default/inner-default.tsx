import React from 'react';
import 'antd/dist/antd.css';
import styles from './inner-default.module.css';
import { Button, Divider, Empty } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { getDayFromDate } from '@utils/get-day-from-date';
import emptyIcon from '../../../../assets/icon/empty.svg';
import { filterTrainingByDay } from '@utils/filter-training-by-day';
import { CalendarTrainingList } from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTraining } from '@redux/trainingSlice';
import { selectTrainingList } from '@redux/trainingListSlice';
import { changeModalType, toggleIsEdit, toggleIsModal } from '@redux/calendarModalSlice';
import { calendarModalType } from '@constants/enums';

type props = {
    date: Date
}

export const InnerDefault: React.FC<props> = ({ date }) => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const trainingList = useAppSelector(selectTrainingList);
    const trainingOnSelDate = filterTrainingByDay(training, date);
    const isNoTrainings = trainingOnSelDate.length === 0;

    function handleAddTraining() {
        dispatch(toggleIsEdit(false));
        dispatch(changeModalType(calendarModalType.newTraining));
    }
    const isAddTrainingDisabled = trainingOnSelDate.length === trainingList.length || date < new Date(Date.now());

    const trainings = isNoTrainings
        ? <Empty
            image={emptyIcon}
            description=""
            className={styles["modal__empty"]}
        />
        : <div className={styles["modal__list-wrapper"]}>
            <CalendarTrainingList date={date} listData={trainingOnSelDate} edit={true} />
        </div>;

    return (
        <div data-test-id="modal-create-training">
            <div className={styles["modal__header"]}>
                <p className={styles["modal__title"]}>Тренировки на {getDayFromDate(date)}</p>
                {isNoTrainings && <p className={styles["modal__subtitle"]}>Нет активных тренировок</p>}
            </div>
            <div className={styles["modal__body"]}>
                {trainings}
            </div>
            <Divider className={styles["modal__divider"]} />
            <div className={styles["modal__button-wrapper"]}>
                <Button
                    onClick={handleAddTraining}
                    disabled={isAddTrainingDisabled}
                    className={styles["modal__button"]}
                >Создать тренировку</Button>
            </div>
            <CloseOutlined
                onClick={() => dispatch(toggleIsModal(false))}
                className={styles["modal__close"]}
                data-test-id="modal-create-training-button-close"
            />
        </div>
    );
};
