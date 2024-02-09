import React, { useState } from 'react';
import './main-page.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';

import { SideBar } from './components/side-bar/side-bar';
import { MainHeader } from './components/mainHeader/main-header';
import { MainContent } from './components/main-content/main-content';
import { MainFooter } from './components/main-footer/main-footer';

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout className="main-page">
            <SideBar collapsed={collapsed}/>
            <Layout className="main-page__container">
                <MainHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                <MainContent />
                <MainFooter />
            </Layout>
        </Layout>
    );
};
