import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EROUTE, EStatus } from '@constants/enums';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getTraining } from '@utils/requests/training/get-training';
import { getTrainingList } from '@utils/requests/catalogs/get-training-list';
import { Layout, Tabs } from 'antd';

import { JointTraining } from './joint-training/joint-training';
import { MyTraining } from './my-training/my-training';

import 'antd/dist/antd.css';
import styles from './training-page.module.css';

export const TrainingPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTraining()).then(resp => {
            if (resp === EStatus.noToken) {
                navigate(EROUTE.MAIN);
            }

            return dispatch(getTrainingList());
        });
    }, [dispatch, navigate]);

    return (
        <Layout className={styles.page}>
            <div className={styles.page__inner}>
                <Tabs
                    defaultActiveKey="1"
                    size='large'
                    destroyInactiveTabPane={true}
                    className={styles.tablist}
                    items={[
                        { label: 'Мои тренировки', key: 'item-1', children: <MyTraining /> },
                        { label: 'Соместные тренировки', key: 'item-2', children: <JointTraining /> },
                        { label: 'Марафоны', key: 'item-3' }
                    ]}
                />
            </div>
        </Layout>
    );
};
