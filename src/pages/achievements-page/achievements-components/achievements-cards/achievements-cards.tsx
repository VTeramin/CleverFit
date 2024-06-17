import React from 'react';
import { TTraining } from '@constants/types';
import { getTotalApproaches } from '@utils/achievements-utils/get-total-approaches';
import { getTotalLoad } from '@utils/achievements-utils/get-total-load';
import { getTotalReplays } from '@utils/achievements-utils/get-total-replays';

import 'antd/dist/antd.css';
import styles from './achievements-cards.module.css';

type TProps = {
    trainingData: TTraining[],
    achievementsType: string
}

export const AchievementsCards: React.FC<TProps> = ({ trainingData, achievementsType }) => {
    const totalLoad = getTotalLoad(trainingData);
    const loadPerDay = (totalLoad / (achievementsType === 'week' ? 7 : 28)).toFixed(1).split('.').join(',');
    const totalReplays = getTotalReplays(trainingData);
    const totalApproaches = getTotalApproaches(trainingData);

    const cardsData = [
        {
            value: totalLoad,
            label: 'Общая нагрузка, кг'
        },
        {
            value: loadPerDay,
            label: 'Нагрузка в день, кг'
        },
        {
            value: totalReplays,
            label: 'Количество повторений, раз'
        },
        {
            value: totalApproaches,
            label: 'Подходы, раз'
        }
    ];

    return (
        <section className={styles['achievements__cards-section']}>
            {cardsData.map(card => (
                <div
                    key={card.label}
                    className={styles['cards-section__card']}
                >
                    <p className={styles.card__value}>{card.value}</p>
                    <p className={styles.card__label}>{card.label}</p>
                </div>
            ))}
        </section>
    )
}
