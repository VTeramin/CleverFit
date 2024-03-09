import React from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-page.module.css';
import { Calendar, ConfigProvider, Layout } from 'antd';
import locale from 'antd/es/locale/ru_RU';
import 'moment/locale/ru';
import moment from 'moment';

moment.updateLocale("ru", {
    week: {
        dow: 1
    },
    weekdaysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthsShort: ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"],
});

export const CalendarPage: React.FC = () => {
    return (
        <Layout className={styles["page"]}>
            <ConfigProvider locale={locale}>
                <Calendar
                    className={styles["calendar"]}
                />
            </ConfigProvider>
        </Layout>
    );
};


