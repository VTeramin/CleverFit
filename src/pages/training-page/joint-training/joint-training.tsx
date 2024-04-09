/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Layout } from 'antd';

import { JointInvites } from './joint-invites/joint-invites';
import { JointUsers } from './joint-users/joint-users';

import 'antd/dist/antd.css';
import styles from './joint-training.module.css';

export const JointTraining: React.FC = () => {
    const [inner, setInner] = useState('invites');

    return (
        <Layout className={styles['joint-training']}>
            {inner === 'invites' && <JointInvites setInner={setInner} />}
            {inner === 'users' && <JointUsers setInner={setInner} />}
        </Layout>
    );
};
