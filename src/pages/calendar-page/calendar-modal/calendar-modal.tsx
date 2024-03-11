import React from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-modal.module.css';
import { Button, Divider, Empty } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { dateToString } from '@utils/get-day-from-date';
import emptyIcon from '../../../assets/icon/empty.svg';

type props = {
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
    modalCoord: { x: number, y: number }
}

export const CalendarModal: React.FC<props> = ({ date, setDate, modalCoord }) => {

    return (
        <div className={styles["modal"]} style={{transform: `translate(${modalCoord.x}px, ${modalCoord.y}px)`}}>
            <p className={styles["modal__title"]}>Тренировки на {dateToString(date)}</p>
            <p className={styles["modal__subtitle"]}>Нет активных тренировок</p>
            <div className={styles["modal__body"]}>
                <Empty image={emptyIcon} description="" className={styles["modal__empty"]}></Empty>
            </div>
            <Divider className={styles["modal__divider"]} />
            <Button className={styles["modal__button"]} >Создать тренировку</Button>
            <CloseOutlined onClick={() => setDate(undefined)} className={styles["modal__close"]} />
        </div>
    );
};
