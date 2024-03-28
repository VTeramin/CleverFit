import React, { useEffect, useState } from 'react';
import { CheckOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { EStatus } from '@constants/enums';
import { TSettingsSwitchesData, TSwitchesValues } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeUserInfo, selectUserData } from '@redux/user-data-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { convertDate } from '@utils/convert-date';
import { changeRemoteUserData } from '@utils/requests/change-remote-user-data';
import { getTariffList } from '@utils/requests/get-tariff-list';
import { Button, Layout, Switch, Tooltip } from 'antd';

import freeTarif from '../../assets/img/tarif-free.png';
import proTarif from '../../assets/img/tarif-pro.png'

import { SettingsDrawer } from './settings-drawer/settings-drawer';
import { SettingsResult } from './settings-result/settings-result';

import 'antd/dist/antd.css';
import styles from './settings-page.module.css';

export const SettingsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const width = useWindowSize().width || 0;
    const isMobile = width <= 800;
    const { userInfo } = useAppSelector(selectUserData);
    const isTariffFree = !Object.keys(userInfo).includes('tariff');
    const [switchValues, setSwitchValues] = useState<TSwitchesValues>({
        'тренировки': userInfo.readyForJointTraining,
        'уведомления': userInfo.sendNotification,
        'тема': false
    });
    const [isDrawer, setIsDrawer] = useState(false);
    const [resultType, setResultType] = useState(EStatus.empty);
    const expirationDate = userInfo.tariff?.expired
        ? convertDate(new Date(userInfo.tariff.expired)).slice(0, 5)
        : '';

    useEffect(() => {
        dispatch(getTariffList());
    }, [dispatch]);

    useEffect(() => {
        setSwitchValues({
            'тренировки': userInfo.readyForJointTraining,
            'уведомления': userInfo.sendNotification,
            'тема': false
        });
    }, [userInfo]);

    useEffect(() => {
        dispatch(changeUserInfo({
            readyForJointTraining: switchValues['тренировки'],
            sendNotification: switchValues['уведомления']
        }));
        dispatch(changeRemoteUserData());
    }, [dispatch, switchValues]);

    function handleSwitchChange(checked: boolean, switchItem: string) {
        setSwitchValues(prev => ({
            ...prev,
            [switchItem]: checked
        }));
    }

    const proTariffFooter = isTariffFree
        ? <Button className={styles['conf-button']}>Активировать</Button>
        : <p className={styles['tariffs-card__status']}>aктивен<br />до {expirationDate}</p>;

    return (
        <Layout className={styles['settings-page']}>
            <div className={styles['settings-page__inner']}>
                <h2 className={styles['settings-page__title']}>Мой тариф</h2>
                <div className={styles['settings-page__tariffs-cards-wrapper']}>
                    {['FREE', 'PRO'].map(tariff => (
                        <div key={tariff} className={styles['tariffs-card']}>
                            <div className={styles['tariffs-card__header']}>
                                <p className={styles['tariffs-card__title']}>{`${tariff} tarif`}</p>
                                <Button
                                    className={styles['text-button']}
                                    type='text'
                                    onClick={() => setIsDrawer(true)}
                                >
                                    Подробнее
                                </Button>
                            </div>
                            <div className={styles['tariffs-card__img-wrapper']}>
                                <img
                                    src={tariff === 'FREE' ? freeTarif : proTarif}
                                    alt='tarif'
                                    className={isTariffFree && tariff !== 'FREE'
                                        ? `${styles['tariffs-card__img--disabled']} ${styles['tariffs-card__img']}`
                                        : styles['tariffs-card__img']}
                                />
                            </div>
                            <div className={styles['tariffs-card__footer']}>
                                {tariff === 'FREE'
                                    ? <p className={styles['tariffs-card__status']}>aктивен <CheckOutlined /></p>
                                    : proTariffFooter}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles['settings-page__switches-wrapper']}>
                    {Object.keys(switchValues).map((switchItem: string) => {
                        const switchesData: TSettingsSwitchesData = {
                            'тренировки': {
                                text: 'Открыт для совместных тренировок',
                                title: 'включеная функция позволит участвовать в совместных тренировках',
                                disabled: false
                            },
                            'уведомления': {
                                text: 'Уведомления',
                                title: 'включеная функция позволит получать уведомления об активностях',
                                disabled: false
                            },
                            'тема': {
                                text: 'Тёмная тема',
                                title: 'темная тема доступна для PRO tarif',
                                disabled: isTariffFree
                            }
                        };

                        return (
                            <div key={switchItem} className={styles['settings-page__switch']}>
                                <p
                                    className={switchesData[switchItem].disabled
                                        ? styles['switch__title--disabled']
                                        : undefined}
                                >
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
                                <Switch
                                    size={isMobile ? 'small' : 'default'}
                                    disabled={switchesData[switchItem].disabled}
                                    checked={switchValues[switchItem]}
                                    onClick={checked => handleSwitchChange(checked, switchItem)}
                                />
                            </div>
                        )
                    })}
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
            <SettingsDrawer
                isDrawer={isDrawer}
                setIsDrawer={setIsDrawer}
                setResultType={setResultType}
            />
            {resultType !== EStatus.empty && <SettingsResult />}
        </Layout>
    );
};
