import React from 'react';
import { Column } from '@ant-design/plots';
import { daysOfTheWeek } from '@constants/calendar-config';
import { TTraining } from '@constants/types';
import { getColumnChartData } from '@utils/achievements-utils/get-column-chart-data';
import { getDay } from '@utils/achievements-utils/get-day';
import { convertDate } from '@utils/convert-date';
import { Badge } from 'antd';
import classNames from 'classnames';

import 'antd/dist/antd.css';
import styles from '../achievements.module.css';

type TProps = {
    trainingData: TTraining[]
}

export const AchievementsLoad: React.FC<TProps> = ({ trainingData }) => {
    const columnChartData = getColumnChartData(trainingData);

    const listData = [...columnChartData].sort((a, b) => getDay(a.date) - getDay(b.date));

    const columnConfig = {
        data: columnChartData,
        xField: 'date',
        yField: 'weight',
        legend: false,
        width: 520,
        height: 374,
        colorField: '#85a5ff',
        sizeField: 30,
        autoFit: true,
        margin: 16,
        marginTop: 24,
        marginBottom: 0,
        tooltip: false,
        axis: {
            x: {
                tick: false,
                labelFormatter: (date: string) => convertDate(new Date(date)).slice(0, 5),
                title: 'Нагрузка, кг',
                titleFontSize: 14,
                titleSpacing: 16,
                labelSpacing: 16,
                line: true,
                lineExtension: [-18, 4],
                lineLineDash: [2, 4]
            },
            y: {
                tick: false,
                labelFormatter: (label: number) => `${label} кг`,
                labelSpacing: 0,
                tickCount: 7
            },
        }
    };

    return (
        <section className={styles['achievements__load-section']}>
            <Column {...columnConfig} className={styles['load-section__chart']} />
            <div className={styles['load-section__load']}>
                <p className={styles.load__label}>Средняя нагрузка по дням недели</p>
                <div className={styles.load__list}>
                    {listData.map((el, ind) => (
                        <div
                            key={`${el} ${ind + 1}`}
                            className={styles['load__list-item']}
                        >
                            <Badge
                                count={ind + 1}
                                className={classNames(styles.load__badge, { [styles.empty]: el.weight === 0 })}
                            />
                            <p className={styles.load__day}>{daysOfTheWeek[ind]}</p>
                            <p className={styles.load__weight}>{el.weight === 0 ? '' : `${el.weight} кг`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
