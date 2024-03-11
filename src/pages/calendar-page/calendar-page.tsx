import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-page.module.css';
import { Calendar, ConfigProvider, Layout } from 'antd';
import locale from 'antd/es/locale/ru_RU';
import 'moment/locale/ru';
import moment from 'moment';
import { ResultModal } from '@pages/components/result-modal/result-modal';
import { getTraining, getTrainingList, status } from '@utils/requests';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { CalendarResult } from './calendar-result/calendar-result';
import { CalendarModal } from './calendar-modal/calendar-modal';
import { useWindowSize } from '@uidotdev/usehooks';
import { getCalendarModalCoords } from '@utils/get-calendar-modal-coords';

moment.updateLocale("ru", {
    week: { dow: 1 },
    weekdaysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthsShort: ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"],
});

export const CalendarPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [resultType, setResultType] = useState(status.empty);
    const [training, setTraining] = useState([]);
    const [trainingList, setTrainingList] = useState([]);
    const [date, setDate] = useState<Date>();
    const [modalCoord, setModalCoord] = useState({ x: 0, y: 0 })
    const width = useWindowSize().width || 0;

    useEffect(() => {
        dispatch(getTraining()).then(resp => {
            if (resp === status.noToken) {
                setResultType(resp)
            } else {
                setTraining(resp)
                return resp;
            }
        }).then(resp => {
            if (resp) dispatch(getTrainingList()).then(resp => {
                resp === status.errorTrainingList ? setResultType(resp) : setTrainingList(resp);
            });
        });
    }, [dispatch]);

    useEffect(() => {
        setModalCoord(getCalendarModalCoords(width));
    }, [date, width]);

    function handleDateSelect(target: moment.Moment) {

        setDate(undefined);
        setDate(target.toDate());
    }

    function handlePanelChange() {
        setDate(undefined);
    }

    return (
        <Layout className={styles["page"]}>
            <ConfigProvider locale={locale}>
                <Calendar
                    className={styles["calendar"]}
                    onSelect={(target) => handleDateSelect(target)}
                    onPanelChange={() => handlePanelChange()}
                />
            </ConfigProvider>
            {date && <CalendarModal
                date={date}
                setDate={setDate}
                modalCoord={modalCoord}
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
                />}
        </Layout>
    );
};


