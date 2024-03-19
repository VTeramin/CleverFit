import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-page.module.css';
import { Calendar, ConfigProvider, Layout } from 'antd';
import locale from 'antd/es/locale/ru_RU';
import 'moment/locale/ru';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarModal } from './calendar-modal/calendar-modal';
import { useMeasure, useWindowSize } from '@uidotdev/usehooks';
import { CalendarTrainingList } from './calendar-training-list/calendar-training-list';
import { changeModalType, selectCalendarModalData, toggleIsModal } from '@redux/calendarModalSlice';
import { ROUTE, calendarModalType, status } from '@constants/enums';
import { useNavigate } from 'react-router-dom';
import { getTraining } from '@utils/requests/get-training';
import { getTrainingList } from '@utils/requests/get-training-list';
import { findAllTraining } from '@utils/calendar-utils/find-all-training';
import { selectTraining } from '@redux/trainingSlice';

moment.updateLocale("ru", {
    week: { dow: 1 },
    weekdaysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthsShort: ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"],
});

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
            if (resp === status.noToken) {
                navigate(ROUTE.MAIN);
            } else {
                return dispatch(getTrainingList());
            }
        });
        dispatch(toggleIsModal(false));
    }, [dispatch, navigate]);

    function handleDateSelect(target: moment.Moment) {
        setDate(target);
        const isCurrentMonth = date.toDate().getMonth() !== target.toDate().getMonth();
        if (isMobile && isCurrentMonth) return;
        dispatch(changeModalType(calendarModalType.default));
        dispatch(toggleIsModal(true));
    }

    function dateCellRender(moment: moment.Moment) {
        const trainingNames = findAllTraining(training, moment.toDate()).map(el => el.name);
        if(isMobile && trainingNames.length !== 0) {
            return <div className={styles["no-empty"]}></div>;
        }
        if(!isMobile) {
            return <CalendarTrainingList date={moment.toDate()} listData={trainingNames} />;
        }
    }

    return (
        <Layout className={styles["page"]} ref={ref}>
            <ConfigProvider locale={locale}>
                <Calendar
                    className={styles["calendar"]}
                    fullscreen={!isMobile}
                    value={date}
                    onSelect={handleDateSelect}
                    onPanelChange={() => dispatch(toggleIsModal(false))}
                    dateCellRender={dateCellRender}
                />
            </ConfigProvider>
            {isModal && <CalendarModal
                date={date.toDate()}
                pageWidth={width || 0}
            />}
        </Layout>
    );
};
