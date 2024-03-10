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
import { ResultCalendar } from './reult-calendar/result-calendar';

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

    return (
        <Layout className={styles["page"]}>
            <ConfigProvider locale={locale}>
                <Calendar
                    className={styles["calendar"]}
                />
            </ConfigProvider>
            {resultType === status.noToken
                ? <ResultModal
                    resultType={resultType}
                    setResultType={setResultType}
                />
                : <ResultCalendar
                    resultType={resultType}
                    setResultType={setResultType}
                    setTrainingList={setTrainingList}
                />}
        </Layout>
    );
};


