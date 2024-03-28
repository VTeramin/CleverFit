import React, { useState } from 'react';
import { CheckCircleFilled, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { tariffsInfo } from '@constants/tariffs-info';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTariffList } from '@redux/tariff-list-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { changeTariff } from '@utils/requests/change-tariff';
import { Button, Divider, Drawer } from 'antd';

import 'antd/dist/antd.css';
import styles from './settings-drawer.module.css';

type TProps = {
    isDrawer: boolean,
    setIsDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingsDrawer: React.FC<TProps> = ({ isDrawer, setIsDrawer }) => {
    const dispatch = useAppDispatch();
    const browserWidth = useWindowSize().width || 0;
    const isMobile = browserWidth <= 800;
    const tariffList = useAppSelector(selectTariffList);
    const proTariff = tariffList.find(el => el.name === 'Pro');
    const periods = proTariff ? Object.values(proTariff.periods) : undefined;
    const [selectedTariff, setSelectedTariff] = useState(0);

    function handleSubmit() {
        // eslint-disable-next-line no-underscore-dangle
        dispatch(changeTariff(proTariff?._id as string, selectedTariff));
    }

    return (
        <Drawer
            open={isDrawer}
            width={408}
            height={555}
            headerStyle={{ display: 'none' }}
            maskStyle={{ background: 'transparent' }}
            maskClosable={true}
            onClose={() => setIsDrawer(false)}
            destroyOnClose={true}
            placement={isMobile ? 'bottom' : 'right'}
            className={styles.drawer}
        >
            <p className={styles.drawer__title}>Сравнить тарифы</p>
            <div className={styles['drawer__tariffs-info']}>
                <div className={styles['tariffs-info__header']}>
                    <p>FREE</p>
                    <p>PRO</p>
                </div>
                {Object.keys(tariffsInfo).map(el => (
                    <div key={el} className={styles['tariffs-info__info-row']}>
                        <p className={styles['tariffs-info__name']}>{el}</p>
                        <div className={styles['tariffs-info__icons']}>
                            {tariffsInfo[el].free
                                ? <CheckCircleFilled />
                                : <CloseCircleOutlined style={{ color: 'var(--character-light-disable-25)' }} />}
                            {tariffsInfo[el].pro
                                ? <CheckCircleFilled />
                                : <CloseCircleOutlined style={{ color: 'var(--character-light-disable-25)' }} />}
                        </div>
                    </div>
                ))}
            </div>
            <p className={styles.drawer__subtitle}>Стоимость тарифа</p>
            <div className={styles['drawer__tariff-selector']}>
                {periods?.map(period => (
                    <div key={period.text} className={styles['tariff-selector__row']}>
                        <p>{period.text}</p>
                        <div className={styles['tariff-selector__radio-wrapper']}>
                            <p>{String(period.cost).replace('.', ',')} $</p>
                            <input
                                type='radio'
                                name='tariff'
                                value={period.days}
                                onClick={() => setSelectedTariff(period.days)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Divider />
            <Button
                className={styles['drawer__conf-button']}
                disabled={selectedTariff === 0}
                onClick={() => handleSubmit()}
            >
                Выбрать и оплатить
            </Button>
            <Button
                type="text"
                className={styles.drawer__close}
                onClick={() => setIsDrawer(false)}
            >
                <CloseOutlined />
            </Button>
        </Drawer>
    );
};
