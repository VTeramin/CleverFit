import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-page.module.css';
import { Calendar, ConfigProvider, Layout } from 'antd';
import locale from 'antd/es/locale/ru_RU';
import 'moment/locale/ru';
import moment from 'moment';
import { ResultModal } from '@pages/components/result-modal/result-modal';
import { getTraining, getTrainingList, status } from '@utils/requests';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarResult } from './calendar-result/calendar-result';
import { CalendarModal } from './calendar-modal/calendar-modal';
import { useMeasure, useWindowSize } from '@uidotdev/usehooks';
import { CalendarTrainingList } from './calendar-training-list/calendar-training-list';
import { filterTrainingByDay } from '@utils/filter-training-by-day';
import { selectTraining } from '@redux/trainingSlice';
import { changeModalType, changeResultType, selectCalendarModalData, toggleIsModal } from '@redux/calendarModalSlice';
import { calendarModalType } from '@constants/enums';

moment.updateLocale("ru", {
    week: { dow: 1 },
    weekdaysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthsShort: ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"],
});

export const CalendarPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const { isModal, resultType } = useAppSelector(selectCalendarModalData);
    const [date, setDate] = useState(moment());
    const [ref, { width }] = useMeasure();
    const pageWidth = width;
    const browserWidth = useWindowSize().width || 0;
    const isMobile = browserWidth <= 800;
    const [resultTypeCalendar, setResultTypeCalendar] = useState(resultType);
    useEffect(() => {
        dispatch(changeResultType(resultTypeCalendar));
    }, [resultTypeCalendar, dispatch]);

    useEffect(() => {
        dispatch(getTraining()).then(resp => {
            if (resp === status.noToken) {
                dispatch(changeResultType(status.noToken));
            } else {
                return dispatch(getTrainingList());
            }
        }).then(resp => {
            if (resp === status.errorTrainingList) {
                dispatch(changeResultType(status.errorTrainingList));
            }
        });
        dispatch(toggleIsModal(false));
    }, [dispatch]);

    function handleDateSelect(target: moment.Moment) {
        setDate(target);
        if (isMobile && date.toDate().getMonth() !== target.toDate().getMonth()) return;
        dispatch(changeModalType(calendarModalType.default));
        dispatch(toggleIsModal(true));
    }

    function dateCellRender(moment: moment.Moment) {
        const listData = filterTrainingByDay(training, moment.toDate());
        if(isMobile && listData.length !== 0) {
            return <div className={styles["no-empty"]}></div>;
        }
        if(!isMobile) {
            return <CalendarTrainingList date={moment.toDate()} listData={listData} />;
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
                pageWidth={pageWidth || 0}
            />}
            {resultType === status.noToken
                ? <ResultModal
                    resultType={resultType}
                    setResultType={setResultTypeCalendar}
                />
                : <CalendarResult />}
        </Layout>
    );
};
