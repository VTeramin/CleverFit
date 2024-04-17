import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EROUTE, EStatus } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserData } from '@redux/user-data-slice';
import { getTrainingList } from '@utils/requests/catalogs/get-training-list';
import { getTraining } from '@utils/requests/training/get-training';
import { Badge, Layout, Tabs } from 'antd';
import classNames from 'classnames';

import { JointTraining } from './joint-training/joint-training';
import { Marathons } from './marathons/marathons';
import { MyTraining } from './my-training/my-training';

import 'antd/dist/antd.css';
import styles from './training-page.module.css';

export const TrainingPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { invites } = useAppSelector(selectUserData);

    useEffect(() => {
        dispatch(getTraining()).then(resp => {
            if (resp === EStatus.noToken) navigate(EROUTE.MAIN);
            if (resp !== EStatus.noToken) dispatch(getTrainingList());
        });
    }, [dispatch, navigate]);

    const [key, setKey] = useState('item-1');

    const tabItems = [
        {
            label: 'Мои тренировки',
            key: 'item-1',
            children: <MyTraining />
        },
        {
            label: (
                <React.Fragment>
                    Совместные тренировки<Badge count={invites.length} className={styles.tablist__badge} />
                </React.Fragment>
            ),
            key: 'item-2',
            children: <JointTraining />
        },
        {
            label: 'Марафоны',
            key: 'item-3',
            children: <Marathons />
        }
    ];

    return (
        <Layout className={classNames(styles.page, {[styles.marathons]: key === 'item-3'})}>
            <div className={styles.page__inner}>
                <Tabs
                    defaultActiveKey="1"
                    size='large'
                    destroyInactiveTabPane={true}
                    className={styles.tablist}
                    items={tabItems}
                    onChange={el => setKey(el)}
                />
            </div>
        </Layout>
    );
};
