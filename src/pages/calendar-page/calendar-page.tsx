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
import { useMeasure } from '@uidotdev/usehooks';
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

    const [resultTypeCalendar, setResultTypeCalendar] = useState(resultType);
    useEffect(() => {
        dispatch(changeResultType(resultTypeCalendar));
    }, [resultTypeCalendar, dispatch]);

    const [date, setDate] = useState(moment());
    const [ref, { width }] = useMeasure();
    const pageWidth = width;

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
        dispatch(changeModalType(calendarModalType.default));
        setDate(target);
        dispatch(toggleIsModal(true));
    }

    function isDateDisabled(currentDate: moment.Moment) {
        return currentDate.toDate().getMonth() !== date.toDate().getMonth();
    }

    function dateCellRender(moment: moment.Moment) {
        const listData = filterTrainingByDay(training, moment.toDate());
        return <CalendarTrainingList date={moment.toDate()} listData={listData} />
    }

    return (
        <Layout className={styles["page"]} ref={ref}>
            <ConfigProvider locale={locale}>
                <Calendar
                    className={styles["calendar"]}
                    value={date}
                    disabledDate={isDateDisabled}
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
