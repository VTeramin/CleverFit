import React, { useEffect } from 'react';
import { ECalendarModalType } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeModalCoord, selectCalendarModalData } from '@redux/calendar-modal-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { getCalendarModalCoords } from '@utils/calendar-utils/get-calendar-modal-coords';

import { CalendarDrawer } from '../calendar-drawer/calendar-drawer';

import { InnerDefault } from './inner-default/inner-default';
import { InnerNewTraining } from './inner-new-training/inner-new-training';

import 'antd/dist/antd.css';
import styles from './calendar-modal.module.css';

type TProps = {
    date: Date,
    pageWidth: number
}

type TModalInner = {
    [type: string]: React.ReactElement
}

export const CalendarModal: React.FC<TProps> = ({ date, pageWidth }) => {
    const dispatch = useAppDispatch();
    const { modalType, modalCoord } = useAppSelector(selectCalendarModalData);
    const width = useWindowSize().width || 0;

    useEffect(() => {
        const coordinates = getCalendarModalCoords(width);

        dispatch(changeModalCoord(coordinates));
    }, [date, width, pageWidth, dispatch]);

    const modalInner: TModalInner = {
        [ECalendarModalType.default]: <InnerDefault
            date={date}
        />,
        [ECalendarModalType.newTraining]: <InnerNewTraining
            date={date}
        />
    };

    return (
        <div
            className={styles.modal}
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
