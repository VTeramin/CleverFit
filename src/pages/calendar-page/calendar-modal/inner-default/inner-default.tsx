import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './inner-default.module.css';
import { Button, Divider, Empty } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { getDayFromDate } from '@utils/get-day-from-date';
import emptyIcon from '../../../../assets/icon/empty.svg';
import { calendarModalType } from '@constants/enums';
import { filterTrainingByDay } from '@utils/filter-training-by-day';
import { CalendarTrainingList } from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTraining } from '@redux/trainingSlice';

type trainingListEl = {
    "name": "string",
    "key": "string"
}

type props = {
    date: Date,
    trainingList: trainingListEl[],
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<calendarModalType>>
}

export const InnerDefault: React.FC<props> = ({ date, trainingList, setIsModal, setModalType }) => {
    const training = useAppSelector(selectTraining);
    const [trainingOnSelDate, setTrainingOnSelDate] = useState(filterTrainingByDay(training, date));
    useEffect(() => {
        setTrainingOnSelDate(filterTrainingByDay(training, date));
    }, [training, date]);
    const isNoTrainings = trainingOnSelDate.length === 0;

    function handleAddTraining() {
        setModalType(calendarModalType.newTraining);
    }

    return (
        <>
            <div className={styles["modal__header"]}>
                <p className={styles["modal__title"]}>Тренировки на {getDayFromDate(date)}</p>
                {isNoTrainings && <p className={styles["modal__subtitle"]}>Нет активных тренировок</p>}
            </div>
            <div className={styles["modal__body"]}>
                {isNoTrainings
                    ? <Empty
                        image={emptyIcon}
                        description=""
                        className={styles["modal__empty"]}
                    ></Empty>
                    : <div className={styles["modal__list-wrapper"]}>
                        <CalendarTrainingList listData={trainingOnSelDate} edit={handleAddTraining} />
                    </div>}
            </div>
            <Divider className={styles["modal__divider"]} />
            <div className={styles["modal__button-wrapper"]}>
                <Button
                    onClick={handleAddTraining}
                    disabled={trainingOnSelDate.length === trainingList.length}
                    className={styles["modal__button"]}
                >{isNoTrainings ? "Создать тренировку" : "Добавить тренировку"}</Button>
            </div>
            <CloseOutlined
                onClick={() => setIsModal(false)}
                className={styles["modal__close"]}
            />
        </>
    );
};
