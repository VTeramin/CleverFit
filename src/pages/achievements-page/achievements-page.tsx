import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EROUTE, EStatus } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeResultType } from '@redux/calendar-modal-slice';
import { selectTraining } from '@redux/training-slice';
import { getTrainingList } from '@utils/requests/catalogs/get-training-list';
import { getTraining } from '@utils/requests/training/get-training';
import { Layout, Tabs } from 'antd';

import { Achievements } from './achievements/achievements';

import 'antd/dist/antd.css';
import styles from './achievements-page.module.css';

export const AchievementsPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const isTraining = training.length !== 0;

    useEffect(() => {
        dispatch(getTraining())
            .then(resp => {
                if (resp === EStatus.noToken) navigate(EROUTE.MAIN);
                if (resp !== EStatus.noToken) dispatch(getTrainingList()).then(() => dispatch(changeResultType(EStatus.empty)));
            });
    }, [dispatch, navigate]);

    const tabItems = [
        {
            label: 'За неделю',
            key: 'item-1',
            children: <Achievements achievementsType='week' />
        },
        {
            label: 'За месяц',
            key: 'item-2',
            children: <Achievements achievementsType='month' />
        },
        {
            label: 'За всё время (PRO)',
            key: 'item-3',
            disabled: true
        }
    ];

    return (
        <Layout className={styles.page}>
            <div className={styles.page__inner}>
                {isTraining && <Tabs
                    defaultActiveKey="1"
                    size='large'
                    destroyInactiveTabPane={true}
                    className={styles.tablist}
                    items={tabItems}
                />}
            </div>
        </Layout>
    );
};
