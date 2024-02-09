import React from 'react';
import './side-bar.css';
import 'antd/dist/antd.css';

import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import { CalendarTwoTone, HeartTwoTone, TrophyTwoTone, IdcardTwoTone } from '@ant-design/icons';

interface props {
    collapsed: boolean
}

export const SideBar: React.FC<props> = ({ collapsed }) => {
    const menuItems = [CalendarTwoTone, HeartTwoTone, TrophyTwoTone, IdcardTwoTone].map((icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon, {
            style: { fontSize: "14px" },
            twoToneColor: "var(--primary-light-9)",
            className: "menu__icon"
        }),
        label: ["Календарь", "Тренировки", "Достижения", "Профиль"][index],
        style: collapsed ? {} : { paddingLeft: window.innerWidth > 833 ? "16px" : "0px" },
        className: "menu__item"
    }));

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={window.innerWidth > 833 ? "208" : "106"}
            collapsedWidth={window.innerWidth > 833 ? "64" : "0"}
            theme="light"
            className="main-page__sider sider"
        >
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
