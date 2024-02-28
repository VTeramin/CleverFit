import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styles from './main-page.module.css';
import { Layout } from 'antd';
import { SideBar } from './components/side-bar/side-bar';
import { MainHeader } from './components/main-header/main-header';
import { MainContent } from './components/main-content/main-content';
import { MainFooter } from './components/main-footer/main-footer';

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={styles["main-page"]}>
            <SideBar collapsed={collapsed}/>
            <Layout className={styles["main-page__layout"]}>
                <MainHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                <MainContent />
                <MainFooter />
            </Layout>
        </Layout>
    );
};
