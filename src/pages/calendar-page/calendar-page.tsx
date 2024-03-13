import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-page.module.css';
import { Badge, Calendar, ConfigProvider, Layout } from 'antd';
import locale from 'antd/es/locale/ru_RU';
import 'moment/locale/ru';
import moment from 'moment';
import { ResultModal } from '@pages/components/result-modal/result-modal';
import { getTraining, getTrainingList, status } from '@utils/requests';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { CalendarResult } from './calendar-result/calendar-result';
import { CalendarModal } from './calendar-modal/calendar-modal';
import { useMeasure } from '@uidotdev/usehooks';

moment.updateLocale("ru", {
    week: { dow: 1 },
    weekdaysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthsShort: ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"],
});

type training = {
    _id: string,
    name: string,
    date: Date,
    isImplementation: boolean,
    userId: string,
    parameters: {
        repeat: boolean,
        period: number,
        jointTraining: boolean,
        participants: string[]
    },
    exercises: [
        {
            _id: string,
            name: string,
            replays: number,
            weight: number,
            approaches: number,
            isImplementation: boolean
        }
    ]
}

enum badgeColors {
    "Ноги" = "volcano",
    "Силовая" = "yellow",
    "Руки" = "cyan",
    "Грудь" = "green",
    "Спина" = "orange",
    "Кардио" = "pink"
}

export const CalendarPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [resultType, setResultType] = useState(status.empty);
    const [training, setTraining] = useState<training[]>([]);
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
                setTraining(resp);
                return dispatch(getTrainingList());
            }
        }).then(resp => {
            resp === status.errorTrainingList ? setResultType(resp) : setTrainingList(resp);
        });
    }, [dispatch]);

    function handleDateSelect(target: moment.Moment) {
        setIsModal(false);
        setDate(target);
        setIsModal(true);
    }

    function isDateDisabled(currentDate: moment.Moment) {
        return currentDate.toDate().getMonth() !== date.toDate().getMonth();
    }

    function dateCellRender(moment: moment.Moment) {
        const listData = training.filter(el => {
            const elDate = String(new Date(el.date)).substring(0, 10);
            const cellDate = String(moment.toDate()).substring(0, 10);
            return elDate === cellDate;
        }).map(el => el.name);

        return (
            <ul className={styles["trainings-list"]}>
                {listData.map((name: string, ind) => (
                    <li key={ind}>
                        <Badge text={name} color={badgeColors[name as keyof typeof badgeColors]} />
                    </li>
                ))}
            </ul>
        );
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


