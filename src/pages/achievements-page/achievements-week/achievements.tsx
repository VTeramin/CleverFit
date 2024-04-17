import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { TTraining } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingList } from '@redux/training-list-slice';
import { getEmptyTraining } from '@utils/achievements-utils/get-empty-training';
import { getMonthTrainingData } from '@utils/achievements-utils/get-month-training-data';
import { getWeekTrainingData } from '@utils/achievements-utils/get-week-training-data';
import { Layout } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';

import { AchievementsCards } from './achievements-components/achievements-cards/achievements-cards';
import { AchievementsFrequency } from './achievements-components/achievements-frequency/achievements-frequency';
import { AchievementsLoad } from './achievements-components/achievements-load/achievements-load';
import { AchievementsPlain } from './achievements-components/achievements-plain/achievements-plain';

import 'antd/dist/antd.css';
import styles from './achievements.module.css';

type TProps = {
    achievementsType: string;
}

export const Achievements: React.FC<TProps> = ({ achievementsType }) => {
    const dispatch = useAppDispatch();
    const trainingList = useAppSelector(selectTrainingList);
    const trainingNames = trainingList.map(el => el.name);
    const filters = ['Все', ...trainingNames];

    const [selectedFilter, setSelectedFilter] = useState('Все');
    const trainingData = dispatch(achievementsType === 'week' ? getWeekTrainingData() : getMonthTrainingData());
    const [filteredData, setFilteredData] = useState(trainingData);

    const checkIsExercises = (training: TTraining[]) => training.find(el => el.exercises.length !== 0);
    const [isExercises, setIsExercise] = useState(checkIsExercises(filteredData));

    useEffect(() => {
        setIsExercise(checkIsExercises(filteredData));
    }, [filteredData]);

    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter);
        if (filter === 'Все') {
            setFilteredData(trainingData);
        }
        if (filter !== 'Все') {
            const updatedData = trainingData.map(el => el.name === filter ? el : getEmptyTraining(new Date(el.date)));

            setFilteredData(updatedData);
        }
    }

    return (
        <Layout className={styles.achievements}>
            <section className={styles['achievements__filters-section']}>
                <p>Тип тренировки :</p>
                <div className={styles['filters-section__filters']}>
                    {filters.map(filter => (
                        <CheckableTag
                            key={filter}
                            checked={selectedFilter === filter}
                            onChange={() => handleFilterClick(filter)}
                            className={styles['filters-section__filter']}
                        >
                            {filter}{selectedFilter === filter && <CloseOutlined className={styles['filters-section__filter-close']} />}
                        </CheckableTag>
                    ))}
                </div>
            </section>
            {isExercises && (
                <div>
                    <AchievementsLoad trainingData={filteredData} achievementsType={achievementsType} />
                    <AchievementsCards trainingData={filteredData} achievementsType={achievementsType} />
                    <AchievementsPlain trainingData={filteredData} selectedFilter={selectedFilter} />
                    <AchievementsFrequency trainingData={filteredData} achievementsType={achievementsType} />
                </div>
            )}
            {!isExercises && (
                <div className={styles['achievements__not-found']}>
                    <div className={styles['not-found__image']} />
                    <p className={styles['not-found__title']}>Ой, такой тренировки на этой неделе не было.</p>
                </div>
            )}
        </Layout>
    );
};
