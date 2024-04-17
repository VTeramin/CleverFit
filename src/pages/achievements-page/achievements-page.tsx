import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EROUTE, EStatus } from '@constants/enums';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { changeResultType } from '@redux/calendar-modal-slice';
import { getTrainingList } from '@utils/requests/catalogs/get-training-list';
import { getTraining } from '@utils/requests/training/get-training';
import { Layout, Tabs } from 'antd';

import { Achievements } from './achievements-week/achievements';

import 'antd/dist/antd.css';
import styles from './achievements-page.module.css';

export const AchievementsPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTraining()).then(resp => {
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
                <Tabs
                    defaultActiveKey="1"
                    size='large'
                    destroyInactiveTabPane={true}
                    className={styles.tablist}
                    items={tabItems}
                />
            </div>
        </Layout>
    );
};
