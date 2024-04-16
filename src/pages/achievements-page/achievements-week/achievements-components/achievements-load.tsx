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
    trainingData: TTraining[],
    achievementsType: string
}

export const AchievementsLoad: React.FC<TProps> = ({ trainingData, achievementsType }) => {
    const columnChartData = getColumnChartData(trainingData);
    const isMonth = achievementsType === 'month';
    const isWeek = achievementsType === 'week';

    const listData = [...columnChartData].sort((a, b) => getDay(a.date) - getDay(b.date));
    const monthListData = [
        [...columnChartData].splice(0, 7),
        [...columnChartData].splice(7, 7),
        [...columnChartData].splice(14, 7),
        [...columnChartData].splice(21, 7)
    ];

    const getChartDate = (date: string) => convertDate(new Date(date)).slice(0, 5);

    const columnConfig = {
        data: columnChartData,
        xField: 'date',
        yField: 'weight',
        colorField: '#85a5ff',
        sizeField: 30,
        margin: 16,
        marginTop: 24,
        marginBottom: 10,
        tooltip: false,
        axis: {
            x: {
                tick: false,
                labelFormatter: getChartDate,
                labelFontSize: 13,
                labelSpacing: 16,
                title: 'Нагрузка, кг',
                titleFontWeight: 400,
                titleFontSize: 14,
                titleSpacing: 18,
                line: true,
                lineLineDash: [2, 4],
                lineExtension: [-20, 0]
            },
            y: {
                tick: false,
                labelFormatter: (label: number) => `${label} кг`,
                labelSpacing: -12,
                tickCount: 7
            },
        },
        scrollbar: isMonth
            ? {
                x: {
                    value: 1
                }
            }
            : undefined
    };

    return (
        <section className={classNames(styles['achievements__load-section'], { [styles.month]: isMonth })}>
            <div className={styles['load-section__chart-wrapper']}>
                <Column {...columnConfig} />
            </div>
            {isWeek && <div className={styles['load-section__load']}>
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
            </div>}
            {isMonth && <div className={styles.load__lists}>
                {monthListData.map(week => (
                    <div className={styles.load__list}>
                        <p className={styles.load__label}>
                            {`Неделя ${getChartDate(week[0].date)}-${getChartDate(week[6].date)}`}
                        </p>
                        {week.map((el, ind) => (
                            <div
                                key={`${el} ${ind + 1}`}
                                className={styles['load__list-item']}
                            >
                                <Badge
                                    count={ind + 1}
                                    className={classNames(styles.load__badge, { [styles.empty]: el.weight === 0 })}
                                />
                                <p className={styles.load__day}>{convertDate(new Date(el.date))}</p>
                                <p className={styles.load__weight}>{el.weight === 0 ? '' : `${el.weight} кг`}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>}
        </section>
    )
}
