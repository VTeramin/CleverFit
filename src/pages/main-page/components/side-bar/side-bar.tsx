import React from 'react';
import './side-bar.css';
import 'antd/dist/antd.css';

import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import { CalendarOutlined, HeartFilled, TrophyFilled, IdcardOutlined } from '@ant-design/icons';

interface props {
    collapsed: boolean
}

export const SideBar: React.FC<props> = ({ collapsed }) => {
    const menuItems = [CalendarOutlined, HeartFilled, TrophyFilled, IdcardOutlined].map((icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon, {
            style: { color: "var(--primary-light-9)", fontSize: "14px" },
            className: "menu__icon"
        }),
        label: ["Календарь", "Тренировки", "Достижения", "Профиль"][index],
        style: collapsed ? {} : { paddingLeft: "16px" },
        className: "menu__item"
    }));

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} width="208" collapsedWidth="64" theme="light" className="main-page__sider sider">
            <div
                className={`sider__logo ${collapsed ? "logo-collapsed" : "logo"}`}
            />
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['4']}
                className="sider__menu"
                items={menuItems}
            />
            <div className="sider__exit">
                <div className="exit__icon"></div>
                {!collapsed && <p className="exit__line">Выход</p>}
            </div>
        </Sider>
    );
};
