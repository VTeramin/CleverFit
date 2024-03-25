import React from 'react';
import { CheckOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { TSettingsSwitchesData } from '@constants/types';
import { useWindowSize } from '@uidotdev/usehooks';
import { Button, Layout, Switch, Tooltip } from 'antd';

import freeTarif from '../../assets/img/tarif-free.png';
import proTarif from '../../assets/img/tarif-pro.png'

import 'antd/dist/antd.css';
import styles from './settings-page.module.css';

export const SettingsPage: React.FC = () => {
    const width = useWindowSize().width || 0;
    const isMobile = width <= 800;

    const tarifs = ['FREE', 'PRO'].map(tarif => (
        <div key={tarif} className={styles['tarifs-card']}>
            <div className={styles['tarifs-card__header']}>
                <p className={styles['tarifs-card__title']}>{`${tarif} tarif`}</p>
                <Button
                    className={styles['text-button']}
                    type='text'
                >
                    Подробнее
                </Button>
            </div>
            <div className={styles['tarifs-card__img-wrapper']}>
                <img
                    src={tarif === 'FREE' ? freeTarif : proTarif}
                    alt='tarif'
                    className={styles['tarifs-card__img']}
                />
            </div>
            <div className={styles['tarifs-card__footer']}>
                {tarif === 'FREE'
                    ? <p className={styles['tarifs-card__status']}>aктивен <CheckOutlined /></p>
                    : <Button
                        className={styles['conf-button']}
                    >
                        Активировать
                    </Button>}
            </div>
        </div>
    ));

    const switches = ['тренировки', 'уведомления', 'тема'].map((switchItem: string) => {
        const switchesData: TSettingsSwitchesData = {
            'тренировки': {
                text: 'Открыт для совместных тренировок',
                title: 'включеная функция позволит участвовать в совместных тренировках'
            },
            'уведомления': {
                text: 'Уведомления',
                title: 'включеная функция позволит получать уведомления об активностях'
            },
            'тема': {
                text: 'Тёмная тема',
                title: 'темная тема доступна для PRO tarif'
            }
        };

        return (
            <div key={switchItem} className={styles['settings-page__switch']}>
                <p>
                    {switchesData[switchItem].text}
                </p>
                <Tooltip
                    title={switchesData[switchItem].title}
                    color='var(--neutral-gray-13)'
                    arrowPointAtCenter={true}
                    placement='bottomLeft'
                >
                    <InfoCircleOutlined />
                </Tooltip>
                <Switch size={isMobile ? 'small' : 'default'}/>
            </div>
        )
    });

    return (
        <Layout className={styles['settings-page']}>
            <div className={styles['settings-page__inner']}>
                <h2 className={styles['settings-page__title']}>Мой тариф</h2>
                <div className={styles['settings-page__tarifs-cards-wrapper']}>
                    {tarifs}
                </div>
                <div className={styles['settings-page__switches-wrapper']}>
                    {switches}
                </div>
                <Button
                    className={styles['conf-button']}
                >
                    Написать отзыв
                </Button>
                <Button
                    className={styles['text-button']}
                    type='text'
                >
                    Смотреть все отзывы
                </Button>
            </div>
        </Layout>
    );
};
