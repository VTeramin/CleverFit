import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-modal.module.css';
import { useWindowSize } from '@uidotdev/usehooks';
import { getCalendarModalCoords } from '@utils/get-calendar-modal-coords';
import { InnerEmpty } from './inner-empty/inner-empty';
import { calendarModalType } from '@constants/enums';
import { InnerNewTraining } from './inner-new-training/inner-new-training';
import { status } from '@utils/requests';

type props = {
    date: Date,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>,
    pageWidth: number,
    trainingList: { "name": "string", "key": "string" }[],
    setResultType: React.Dispatch<React.SetStateAction<status>>
}

type modalInner = {
    [type: string]: React.ReactElement
}

export const CalendarModal: React.FC<props> = ({ date, setIsModal, pageWidth, trainingList, setResultType }) => {
    const width = useWindowSize().width || 0;
    const [modalCoord, setModalCoord] = useState(getCalendarModalCoords(width));
    useEffect(() => {
        const coordinates = getCalendarModalCoords(width);
        if (coordinates.x === 0 && coordinates.y === 0) setIsModal(false);
        setModalCoord(coordinates);
    }, [date, width, pageWidth, setIsModal]);

    const [modalType, setModalType] = useState(calendarModalType.empty);
    useEffect(() => {
        setModalType(calendarModalType.empty);
    }, [date]);
    const modalInner: modalInner = {
        [calendarModalType.empty]: <InnerEmpty
            date={date}
            setIsModal={setIsModal}
            setModalType={setModalType}
        />,
        [calendarModalType.newTraining]: <InnerNewTraining
            date={date}
            trainingList={trainingList}
            setModalType={setModalType}
            setResultType={setResultType}
        />
    };

    return (
        <div className={styles["modal"]} style={{ left: `${modalCoord.x}px`, top: `${modalCoord.y}px` }}>
            {modalInner[modalType]}
        </div>
    );
};
