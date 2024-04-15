import React from 'react';
import { TTraining } from '@constants/types';
import { getMostFrequentExercise } from '@utils/achievements-utils/get-most-frequent-exercise';
import { getMostFrequentTraining } from '@utils/achievements-utils/get-most-frequent-training';

import 'antd/dist/antd.css';
import styles from '../achievements.module.css';

type TProps = {
    trainingData: TTraining[],
    selectedFilter: string
}

export const AchievementsPlain: React.FC<TProps> = ({ trainingData, selectedFilter }) => {
    const plainData = [
        {
            value: getMostFrequentTraining(trainingData),
            label: 'Самая частая тренировка'
        },
        {
            value: getMostFrequentExercise(trainingData),
            label: 'Самое частое упражнение'
        }
    ].slice(selectedFilter === 'Все' ? 0 : 1, 2);

    return (
        <section className={styles['achievements__plain-section']}>
            {plainData.map(el => (
                <div key={el.label} className={styles['plain-section__row']}>
                    <p>{el.label}</p>
                    <p>{el.value}</p>
                </div>
            ))}
        </section>
    )
}
