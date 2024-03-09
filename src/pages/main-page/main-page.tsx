import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { MainContent } from './components/main-content/main-content';
import { MainFooter } from './components/main-footer/main-footer';

export const MainPage: React.FC = () => {
    return (
        <Layout style={{ background: "transparent" }}>
            <MainContent />
            <MainFooter />
        </Layout>
    );
};
