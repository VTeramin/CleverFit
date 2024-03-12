import React from 'react';
import 'antd/dist/antd.css';
import styles from './inner-empty.module.css';
import { Button, Divider, Empty } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { getDayFromDate } from '@utils/get-day-from-date';
import emptyIcon from '../../../../assets/icon/empty.svg';
import { calendarModalType } from '@constants/enums';

type props = {
    date: Date,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<calendarModalType>>
}

export const InnerEmpty: React.FC<props> = ({ date, setIsModal, setModalType }) => {
    return (
        <>
            <p className={styles["modal__title"]}>Тренировки на {getDayFromDate(date)}</p>
            <p className={styles["modal__subtitle"]}>Нет активных тренировок</p>
            <div className={styles["modal__body"]}>
                <Empty image={emptyIcon} description="" className={styles["modal__empty"]}></Empty>
            </div>
            <Divider className={styles["modal__divider"]} />
            <div className={styles["modal__button-wrapper"]}>
                <Button
                    onClick={() => setModalType(calendarModalType.newTraining)}
                    className={styles["modal__button"]}
                >Создать тренировку</Button>
            </div>
            <CloseOutlined
                onClick={() => setIsModal(false)}
                className={styles["modal__close"]}
            />
        </>
    );
};
