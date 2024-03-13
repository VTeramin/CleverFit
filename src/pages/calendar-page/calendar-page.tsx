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
import { changeTrainingData, selectTraining } from '@redux/trainingSlice';

moment.updateLocale("ru", {
    week: { dow: 1 },
    weekdaysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthsShort: ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"],
});

export const CalendarPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const [resultType, setResultType] = useState(status.empty);
    const [trainingList, setTrainingList] = useState([]);
    const [date, setDate] = useState(moment());
    const [isModal, setIsModal] = useState(false);
    const [ref, { width }] = useMeasure();
    const pageWidth = width;

    useEffect(() => {
        dispatch(getTraining()).then(resp => {
            if (resp === status.noToken) {
                setResultType(resp);
            } else {
                dispatch(changeTrainingData(resp));
                return dispatch(getTrainingList());
            }
        }).then(resp => {
            if (resp === status.errorTrainingList) {
                dispatch(changeTrainingData([]));
                setResultType(resp);
            } else {
                setTrainingList(resp);
            }
        });
    }, [dispatch]);

    function handleDateSelect(target: moment.Moment) {
        setDate(target);
        setIsModal(true);
    }

    function isDateDisabled(currentDate: moment.Moment) {
        return currentDate.toDate().getMonth() !== date.toDate().getMonth();
    }

    function dateCellRender(moment: moment.Moment) {
        const listData = filterTrainingByDay(training, moment.toDate());
        return <CalendarTrainingList listData={listData} />
    }

    return (
        <Layout className={styles["page"]} ref={ref}>
            <ConfigProvider locale={locale}>
                <Calendar
                    className={styles["calendar"]}
                    value={date}
                    disabledDate={isDateDisabled}
                    onSelect={handleDateSelect}
                    onPanelChange={() => setIsModal(false)}
                    dateCellRender={dateCellRender}
                />
            </ConfigProvider>
            {isModal && date && <CalendarModal
                date={date.toDate()}
                setIsModal={setIsModal}
                pageWidth={pageWidth || 0}
                trainingList={trainingList}
                setResultType={setResultType}
            />}
            {resultType === status.noToken
                ? <ResultModal
                    resultType={resultType}
                    setResultType={setResultType}
                />
                : <CalendarResult
                    resultType={resultType}
                    setResultType={setResultType}
                    setTrainingList={setTrainingList}
                    setIsModal={setIsModal}
                />}
        </Layout>
    );
};
