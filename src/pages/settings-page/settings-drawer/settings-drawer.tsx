import React, { useState } from 'react';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { EStatus } from '@constants/enums';
import { tariffsInfo } from '@constants/tariffs-info';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTariffList } from '@redux/tariff-list-slice';
import { selectUserData } from '@redux/user-data-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { convertDate } from '@utils/convert-date';
import { changeTariff } from '@utils/requests/tariff/change-tariff';
import { Button, Divider, Drawer } from 'antd';

import 'antd/dist/antd.css';
import styles from './settings-drawer.module.css';

type TProps = {
    isDrawer: boolean,
    setIsDrawer: React.Dispatch<React.SetStateAction<boolean>>,
    setResultType: React.Dispatch<React.SetStateAction<EStatus>>
}

export const SettingsDrawer: React.FC<TProps> = ({ isDrawer, setIsDrawer, setResultType }) => {
    const dispatch = useAppDispatch();
    const browserWidth = useWindowSize().width || 0;
    const isMobile = browserWidth <= 800;
    const tariffList = useAppSelector(selectTariffList);
    const proTariff = tariffList.find(el => el.name === 'Pro');
    const periods = proTariff ? Object.values(proTariff.periods) : undefined;
    const [selectedTariff, setSelectedTariff] = useState(0);
    const { userInfo } = useAppSelector(selectUserData);
    const isTariffFree = !Object.keys(userInfo).includes('tariff');
    const expirationDate = userInfo.tariff?.expired
        ? convertDate(new Date(userInfo.tariff.expired)).slice(0, 5)
        : '';

    function handleSubmit() {
        // eslint-disable-next-line no-underscore-dangle
        dispatch(changeTariff(proTariff?._id as string, selectedTariff))
            .then(response => setResultType(response));
        setIsDrawer(false);
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
            data-test-id='tariff-sider'
        >
            <p className={styles.drawer__title}>Сравнить тарифы</p>
            <div className={styles.drawer__expiration}>
                {!isTariffFree && <div className={styles.expiration__wrapper}>
                    <p>Ваш PRO tarif активен до {expirationDate}</p>
                </div>}
            </div>
            <div className={styles['drawer__tariffs-info']}>
                <div className={styles['tariffs-info__header']}>
                    <p>FREE</p>
                    <p>PRO {!isTariffFree && <CheckCircleOutlined />}</p>
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
            {isTariffFree && <React.Fragment>
                <p className={styles.drawer__subtitle}>Стоимость тарифа</p>
                <div className={styles['drawer__tariff-selector']} data-test-id='tariff-cost'>
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
                                    data-test-id={`tariff-${period.cost}`}
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
                    data-test-id='tariff-submit'
                >
                    Выбрать и оплатить
                </Button>
            </React.Fragment>}
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
