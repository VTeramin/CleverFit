import React, { useState } from 'react';
import './main-page.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';
const { Footer } = Layout;

import { SideBar } from './components/side-bar/side-bar';
import { MainHeader } from './components/mainHeader/main-header';
import { MainContent } from './components/main-content/main-content';

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="main-page">
            <SideBar collapsed={collapsed}/>
            <Layout className="main-page__container">
                <MainHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                <MainContent />
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};
