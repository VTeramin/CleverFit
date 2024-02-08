import React, { useState } from 'react';
import './main-page.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';
const { Content, Footer } = Layout;

import { SideBar } from './components/side-bar/side-bar';
import { MainHeader } from './components/mainHeader/main-header';

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="main-page">
            <SideBar collapsed={collapsed}/>
            <Layout>
                <MainHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                <Content style={{ margin: '24px 16px 0' }} className="content">
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};
