import React from 'react';
import { Layout } from 'antd';

import { MainContent } from './main-content/main-content';
import { MainFooter } from './main-footer/main-footer';

import 'antd/dist/antd.css';

export const MainPage: React.FC = () => (
        <Layout style={{ background: 'transparent' }}>
            <MainContent />
            <MainFooter />
        </Layout>
    );
