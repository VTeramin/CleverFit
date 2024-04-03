import React from 'react';
import { DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { EBadgeColors } from '@constants/enums';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingList } from '@redux/training-list-slice';
import { selectTraining } from '@redux/training-slice';
import { Badge, Button, Layout, Select } from 'antd';

import 'antd/dist/antd.css';
import styles from './my-training.module.css';

export const MyTraining: React.FC = () => {
    const training = useAppSelector(selectTraining);
    const trainingList = useAppSelector(selectTrainingList);
    const isTraingListEmpty = trainingList.length === 0;

    return (
        <Layout className={styles.training}>
            <div className={styles.training__header}>
                <div className={styles['header__training-type']}>Тип тренировки</div>
                <Select
                    defaultValue='Периодичность'
                    options={[
                        {
                            value: 'Периодичность',
                            label: 'Периодичность',
                        }
                    ]}
                    className={styles['header__training-sort']}
                />
            </div>
            {training.map(el => (
                // eslint-disable-next-line no-underscore-dangle
                <div key={el._id} className={styles.training__row}>
                    <div className={styles['row__select-wrapper']}>
                        <Badge color={EBadgeColors[el.name as keyof typeof EBadgeColors]} />
                        <div className={styles.row__select}>
                            <p>{el.name}</p>
                            <Button
                                type='text'
                                className={styles.row__dropdown}
                            >
                                <DownOutlined />
                            </Button>
                        </div>
                    </div>
                    <p className={styles.row__frequency}>
                        Через 1 день
                    </p>
                    <EditOutlined />
                </div>
            ))}
            {!isTraingListEmpty && <Button className={styles['training__conf-button']}>
                <PlusOutlined />Новая тренировка
            </Button>}
        </Layout>
    );
};
