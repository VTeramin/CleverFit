import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/plots';
import { daysOfTheWeek } from '@constants/calendar-config';
import { TTraining } from '@constants/types';
import { useWindowSize } from '@uidotdev/usehooks';
import { getColumnChartData } from '@utils/achievements-utils/get-column-chart-data';
import { getDay } from '@utils/achievements-utils/get-day';
import { convertDate } from '@utils/convert-date';
import { Badge, Button } from 'antd';
import classNames from 'classnames';

import 'antd/dist/antd.css';
import styles from './achievements-load.module.css';

type TProps = {
    trainingData: TTraining[],
    achievementsType: string
}

export const AchievementsLoad: React.FC<TProps> = ({ trainingData, achievementsType }) => {
    const columnChartData = getColumnChartData(trainingData);
    const isMonth = achievementsType === 'month';
    const isWeek = achievementsType === 'week';
    const width = useWindowSize().width || 0;
    const isMobile = width < 800;
    const isFullWidth = width > 1100;

    const listData = [...columnChartData].sort((a, b) => getDay(a.date) - getDay(b.date));
    const monthListData = [
        [...columnChartData].splice(0, 7),
        [...columnChartData].splice(7, 7),
        [...columnChartData].splice(14, 7),
        [...columnChartData].splice(21, 7)
    ];
    const [isListVissible, setIsListVissible] = useState(monthListData.map(() => false));

    useEffect(() => {
        if (isFullWidth) setIsListVissible(prev => prev.map(() => true));
        if (!isFullWidth) setIsListVissible(prev => prev.map(() => false));
    }, [isFullWidth]);

    const handleDropownClick = (weekInd: number) => setIsListVissible(prev => prev.map((el, ind) => ind === weekInd ? !el : el));

    const getChartDate = (date: string) => convertDate(new Date(date)).slice(0, 5);

    const columnConfig = {
        data: columnChartData,
        xField: 'date',
        yField: 'weight',
        colorField: '#85a5ff',
        sizeField: isMobile ? 19 : 30,
        margin: isMobile ? 10 : 16,
        marginTop: isMobile ? 10 : 24,
        marginBottom: 10,
        tooltip: false,
        animate: false,
        axis: {
            x: {
                tick: false,
                labelFormatter: getChartDate,
                labelFontSize: isMobile ? 7 : 13,
                labelSpacing: isMobile ? 10 : 16,
                title: 'Нагрузка, кг',
                titleFontWeight: 400,
                titleFontSize: isMobile ? 8 : 14,
                titleSpacing: isMobile ? 10 : 18,
                line: true,
                lineLineDash: [2, 4],
                lineExtension: [-20, 0]
            },
            y: {
                tick: false,
                labelFormatter: (label: number) => `${label} кг`,
                labelFontSize: isMobile ? 7 : 13,
                labelSpacing: isMobile ? -8 : -12,
                tickCount: 7,
                textAlign: 'left'
            },
        },
        scrollbar: isMonth
            ? {
                x: {
                    ratio: width / (isMobile ? 1440 : 2100),
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
                {monthListData.map((week, weekInd) => (
                    <div key={week[0].date} className={styles.load__list}>
                        <p className={styles.load__label}>
                            {`Неделя ${getChartDate(week[0].date)}-${getChartDate(week[6].date)}`}
                            {!isFullWidth && <Button
                                type='text'
                                onClick={() => handleDropownClick(weekInd)}
                                className={styles.load__dropown}
                            >
                                <DownOutlined style={isListVissible[weekInd] ? { transform: 'rotate(180deg)' } : {}} />
                            </Button>}
                        </p>
                        {isListVissible[weekInd] && week.map((el, ind) => (
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
