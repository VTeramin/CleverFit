import React, { useState } from 'react';
import './main-page.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { SideBar } from './components/side-bar/side-bar';

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="main-page">
            <SideBar collapsed={collapsed}/>
            <Layout className="main-page__wrapper">
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: "trigger",
                        style: { color: "var(--neutral-gray-7)" },
                        onClick: () => setCollapsed(!collapsed)
                    })}
                </Header>
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
