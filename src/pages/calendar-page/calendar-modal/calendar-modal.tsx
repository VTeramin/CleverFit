import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-modal.module.css';
import { useWindowSize } from '@uidotdev/usehooks';
import { getCalendarModalCoords } from '@utils/calendar-utils/get-calendar-modal-coords';
import { InnerDefault } from './inner-default/inner-default';
import { ECalendarModalType } from '@constants/enums';
import { InnerNewTraining } from './inner-new-training/inner-new-training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeModalCoord, selectCalendarModalData } from '@redux/calendarModalSlice';
import { CalendarDrawer } from '../calendar-drawer/calendar-drawer';

type props = {
    date: Date,
    pageWidth: number
}

type modalInner = {
    [type: string]: React.ReactElement
}

export const CalendarModal: React.FC<props> = ({ date, pageWidth }) => {
    const dispatch = useAppDispatch();
    const { modalType, modalCoord } = useAppSelector(selectCalendarModalData);
    const width = useWindowSize().width || 0;
    useEffect(() => {
        const coordinates = getCalendarModalCoords(width);
        dispatch(changeModalCoord(coordinates));
    }, [date, width, pageWidth, dispatch]);

    const modalInner: modalInner = {
        [ECalendarModalType.default]: <InnerDefault
            date={date}
        />,
        [ECalendarModalType.newTraining]: <InnerNewTraining
            date={date}
        />
    };

    return (
        <div
            className={styles["modal"]}
            style={{
                left: `${modalCoord.x}px`,
                top: `${modalCoord.y}px`
            }}
        >
            {modalInner[modalType]}
            <CalendarDrawer
                date={date}
            />
        </div>
    );
};
