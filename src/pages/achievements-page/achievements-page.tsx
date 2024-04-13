import React from 'react';
import { Layout } from 'antd';

import 'antd/dist/antd.css';
import styles from './achievements.module.css';

export const AchievementsPage: React.FC = () => (
    <Layout className={styles.page}>
        <h1>Achievements</h1>
    </Layout>
);
