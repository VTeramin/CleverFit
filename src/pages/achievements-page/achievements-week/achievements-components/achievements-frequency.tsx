import React from 'react';
import { Pie } from '@ant-design/plots';
import { daysOfTheWeek } from '@constants/calendar-config';
import { pieColors } from '@constants/pie-colors';
import { TTraining } from '@constants/types';
import { getMostFrequentExerciseByDay } from '@utils/achievements-utils/get-most-frequent-exercie-by-day';
import { getPieChartData } from '@utils/achievements-utils/get-pie-chart-data';
import { Badge } from 'antd';

import 'antd/dist/antd.css';
import styles from '../achievements.module.css';

type TProps = {
    trainingData: TTraining[]
}

function shuffle(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
}

export const AchievementsFrequency: React.FC<TProps> = ({ trainingData }) => {
    const pieData = getPieChartData([...trainingData]);

    const pieConfig = {
        data: pieData,
        angleField: 'value',
        colorField: 'exerciseName',
        radius: 0.5,
        innerRadius: 0.35,
        legend: false,
        width: 520,
        height: 334,
        tooltip: false,
        animate: false,
        label: {
            text: 'exerciseName',
            position: 'outside',
            fontSize: 14,
            connector: false,
            fontWeight: 500,
            fill: '#262626'
        },
        style: {
            fill: ({ key }: { key: number }) => shuffle(pieColors)[key],
            stroke: '#fff',
            inset: 0.1
        }
    };

    return (
        <section className={styles['achievements__frequency-section']}>
            <Pie {...pieConfig} className={styles['requency-section__chart']}/>
            <div className={styles['frequency-section__frequency']}>
                <p className={styles.frequency__label}>Самые частые упражнения по дням недели</p>
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
