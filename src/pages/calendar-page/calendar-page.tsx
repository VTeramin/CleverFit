import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ECalendarModalType, EROUTE, EStatus } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeModalType, selectCalendarModalData, toggleIsModal } from '@redux/calendar-modal-slice';
import { selectTraining } from '@redux/training-slice';
import { useMeasure, useWindowSize } from '@uidotdev/usehooks';
import { getListData } from '@utils/calendar-utils/get-list-data';
import { getTraining } from '@utils/requests/get-training';
import { getTrainingList } from '@utils/requests/get-training-list';
import { Calendar, ConfigProvider, Layout } from 'antd';
import locale from 'antd/es/locale/ru_RU';
import moment, { Moment } from 'moment';

import { CalendarModal } from './calendar-modal/calendar-modal';
import { CalendarTrainingList } from './calendar-training-list/calendar-training-list';

import 'antd/dist/antd.css';
import styles from './calendar-page.module.css';

export const CalendarPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isModal } = useAppSelector(selectCalendarModalData);
    const training = useAppSelector(selectTraining);

    const [date, setDate] = useState(moment());

    const [ref, { width }] = useMeasure();
    const browserWidth = useWindowSize().width || 0;
    const isMobile = browserWidth <= 800;

    useEffect(() => {
        dispatch(getTraining()).then(resp => {
            if (resp === EStatus.noToken) {
                navigate(EROUTE.MAIN);
            }

            return dispatch(getTrainingList());
        });
        dispatch(toggleIsModal(false));
    }, [dispatch, navigate]);

    function handleDateSelect(target: Moment) {
        setDate(target);
        const isCurrentMonth = date.toDate().getMonth() !== target.toDate().getMonth();

        if (isMobile && isCurrentMonth) return;
        dispatch(changeModalType(ECalendarModalType.default));
        dispatch(toggleIsModal(true));
    }

    function dateCellRender(cellMoment: Moment) {
        const trainingList = getListData(training, cellMoment.toDate());

        if (isMobile && trainingList.length !== 0) {
            return <div className={styles['no-empty']} />;
        }
        if (!isMobile) {
            return <CalendarTrainingList date={cellMoment.toDate()} listData={trainingList} />;
        }

        return <div />;
    }

    return (
        <Layout className={styles.page} ref={ref}>
            <ConfigProvider locale={locale}>
                <Calendar
                    className={styles.calendar}
                    fullscreen={!isMobile}
                    value={date}
                    onSelect={target => handleDateSelect(target)}
                    onPanelChange={() => dispatch(toggleIsModal(false))}
                    dateCellRender={cellMoment => dateCellRender(cellMoment)}
                />
            </ConfigProvider>
            {isModal && <CalendarModal
                date={date.toDate()}
                pageWidth={width || 0}
            />}
        </Layout>
    );
};
