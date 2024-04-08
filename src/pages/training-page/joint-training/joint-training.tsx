import React from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { Button, Divider, Layout } from 'antd';

import 'antd/dist/antd.css';
import styles from './joint-training.module.css';

export const JointTraining: React.FC = () => {
    const dispatch = useAppDispatch();

    return (
        <Layout className={styles['joint-training']}>
            <div className={styles['joint-training__no-training-card']}>
                <h3 className={styles['no-training-card__title']}>Хочешь тренироваться с тем, кто разделяет твои цели и темп?<br />Можешь найти друга для совместных тренировок среди других пользователей.</h3>
                <p className={styles['no-training-card__subtitle']}>Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.</p>
                <Divider className={styles['no-training-card__divider']} />
                <div className={styles['no-training-card__buttons-wrapper']}>
                    <Button
                        type='text'
                    >
                        Случайный выбор
                    </Button>
                    <Button
                        type='text'
                    >
                        Выбор друга по моим видам тренировок
                    </Button>
                </div>
            </div>
            <div className={styles['joint-training__participants-section']}>
                <p className={styles['participants-section__title']}>Мои партнёры по тренировкам</p>
                <p className={styles['participants-section__subtitle']}>У вас пока нет партнёров для совместных тренировок</p>
            </div>
        </Layout>
    );
};
