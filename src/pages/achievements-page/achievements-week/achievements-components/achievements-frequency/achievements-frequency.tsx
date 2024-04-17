import React from 'react';
import { Pie } from '@ant-design/plots';
import { daysOfTheWeek } from '@constants/calendar-config';
import { pieColors } from '@constants/pie-colors';
import { TTraining } from '@constants/types';
import { useWindowSize } from '@uidotdev/usehooks';
import { getMostFrequentExerciseByDay } from '@utils/achievements-utils/get-most-frequent-exercie-by-day';
import { getPieChartData } from '@utils/achievements-utils/get-pie-chart-data';
import { Badge } from 'antd';

import 'antd/dist/antd.css';
import styles from './achievements-frequency.module.css';

type TProps = {
    trainingData: TTraining[],
    achievementsType: string
}

function shuffle(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
}

export const AchievementsFrequency: React.FC<TProps> = ({ trainingData, achievementsType }) => {
    const pieData = getPieChartData([...trainingData]);
    const isMonth = achievementsType === 'month';
    const width = useWindowSize().width || 0;
    const isFullWidth = width > 1200;

    const pieConfig = {
        data: pieData,
        angleField: 'value',
        colorField: 'exerciseName',
        radius: isFullWidth ? 0.515 : 0.87,
        innerRadius: isFullWidth ? 0.35 : 0.6,
        autoFit: true,
        legend: false,
        tooltip: false,
        animate: false,
        position: 'surround',
        label: {
            text: 'exerciseName',
            position: 'outside',
            connector: false,
            style: {
                fontSize: 12,
                opacity: 2,
                fontWeight: 100
            },
            transform: [{ type: 'overlapDodgeY', padding: -4 }]
        },
        style: {
            fill: ({ key }: { key: number }) => shuffle(pieColors)[key],
            stroke: '#fff',
            inset: 0.1
        }
    };

    return (
        <section className={styles['achievements__frequency-section']}>
            <div className={styles['frequency-section__chart-wrapper']}>
                <Pie {...pieConfig} />
            </div>
            <div className={styles['frequency-section__frequency']}>
                <p className={styles.frequency__label}>
                    {`Самые частые упражнения по дням недели${isMonth ? ' за месяц' : ''}`}
                </p>
                <div className={styles.frequency__list}>
                    {daysOfTheWeek.map((el, ind) => (
                        <div
                            key={`${el} ${ind + 1}`}
                            className={styles['frequency__list-item']}
                        >
                            <Badge
                                count={ind + 1}
                                className={styles.frequency__badge}
                            />
                            <p className={styles.frequency__day}>{el}</p>
                            <p className={styles.frequency__exercise}>{getMostFrequentExerciseByDay(trainingData, ind)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
