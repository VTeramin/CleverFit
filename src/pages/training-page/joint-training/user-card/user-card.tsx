/* eslint-disable no-underscore-dangle */
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { TPalData } from '@redux/training-pals-slice';
import { getJointUserName } from '@utils/training-utils/get-joint-user-name';
import { Avatar } from 'antd';

import 'antd/dist/antd.css';
import styles from './user-card.module.css';

type TProps = {
    user: TPalData,
    searchInputValue?: string
}

export const UserCard: React.FC<TProps> = ({ user, searchInputValue }) => (
    <React.Fragment>
        <div className={styles.card__header}>
            <Avatar
                src={user.imageSrc || <UserOutlined />}
                alt={user.name}
                size={42}
            />
            <p className={styles['card__pal-name']}>
                {getJointUserName(user.name || '', searchInputValue || '')}
            </p>
        </div>
        <div className={styles.card__info}>
            <div className={styles.card__labels}>
                <p>Тип тренировки:</p>
                <p>Средняя нагрузка:</p>
            </div>
            <div className={styles.card__data}>
                <p>{user.trainingType}</p>
                <p>{user.avgWeightInWeek} кг/нед</p>
            </div>
        </div>
    </React.Fragment>
);
