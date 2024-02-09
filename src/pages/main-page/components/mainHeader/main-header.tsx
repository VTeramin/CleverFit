import React from 'react';
import './main-header.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';

interface props {
    collapsed: boolean,
    setCollapsed: (a: boolean) => void
}

export const MainHeader: React.FC<props> = ({ collapsed, setCollapsed }) => {
    const trigger = React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined);

    return (
        <Header className="header" style={{ padding: 0 }}>
            <div
                className={`trigger ${collapsed ? "trigger-collapsed" : "trigger-not-collapsed"}`}
                data-test-id={window.innerWidth < 833 ? "sider-switch-mobile" : "sider-switch"}
                onClick={() => setCollapsed(!collapsed)}
            >
                {trigger}
            </div>
            <div className="header__content">
                <p className="header__page-name">Главная</p>
                <h1 className="header__title">Приветствуем тебя в&nbsp;CleverFit — приложении,<br />которое поможет тебе добиться своей мечты!</h1>
                <div className="header__settings">
                    {React.createElement(SettingOutlined, { className: "settings__icon" })}
                    <p className="settings__line">Настройки</p>
                </div>
            </div>
        </Header>
    );
};
