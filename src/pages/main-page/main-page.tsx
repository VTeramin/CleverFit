import React, { useState } from 'react';
import './main-page.css';
import 'antd/dist/antd.css';

import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined, CalendarOutlined, HeartFilled, TrophyFilled, IdcardOutlined } from '@ant-design/icons';

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="main-page">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width="208"
                collapsedWidth="64"
                theme="light"
                className="main-page__sider sider"
            >
                <div
                    className={`sider__logo ${collapsed ? "logo-collapsed" : "logo"}`}
                    style={{ backgroundImage: `url(../../public/assets/logo/${collapsed ? "logoCollapsed" : "logo"}.svg)` }}
                />
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    className="sider__menu"
                    items={[CalendarOutlined, HeartFilled, TrophyFilled, IdcardOutlined].map((icon, index) => ({
                        key: String(index + 1),
                        icon: React.createElement(icon, {
                            style: { color: "var(--primary-light-9)", fontSize: "14px" },
                            className: "menu__icon"
                        }),
                        label: ["Календарь", "Тренировки", "Достижения", "Профиль"][index],
                        style: collapsed ? {} : { paddingLeft: "16px" },
                        className: "menu__item"
                    })
                    )}
                />
                <div className="sider__exit">
                    <div className="exit__icon"></div>
                    {!collapsed && <p className="exit__line">Выход</p>}
                </div>
            </Sider>
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
