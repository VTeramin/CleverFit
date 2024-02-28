import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styles from './side-bar.module.css';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Sider } = Layout;
import { CalendarTwoTone, HeartTwoTone, TrophyTwoTone, IdcardTwoTone, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { store } from '@redux/configure-store';
import { toggleIsAuthorized } from '@redux/userDataSlice';

type props = {
    innerLayout: React.ReactElement
}

export const SideBar: React.FC<props> = ({ innerLayout }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [CalendarTwoTone, HeartTwoTone, TrophyTwoTone, IdcardTwoTone].map((icon, index) => ({
        key: index,
        icon: React.createElement(icon, {
            twoToneColor: "var(--primary-light-9)",
            className: styles["menu__icon"]
        }),
        label: ["Календарь", "Тренировки", "Достижения", "Профиль"][index],
        style: collapsed ? {} : { paddingLeft: window.innerWidth > 833 ? "16px" : "0" },
        className: styles["menu__item"]
    }));

    function handleExit() {
        localStorage.clear();
        store.dispatch(toggleIsAuthorized(false));
        navigate("/auth");
    }

    return (
        <Layout className={styles["page"]}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={window.innerWidth > 833 ? "208" : "106"}
                collapsedWidth={window.innerWidth > 833 ? "64" : "1"}
                theme="light"
                className={styles["sider"]}
            >
                <div className={`${styles["sider__logo"]} ${styles[collapsed ? "logo-collapsed" : "logo"]}`} />
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    className={styles["sider__menu"]}
                    items={menuItems}
                />
                <div className={styles["sider__exit"]} onClick={handleExit}>
                    <div className={styles["exit__icon"]}></div>
                    {!collapsed && <p className={styles["exit__line"]}>Выход</p>}
                </div>
            </Sider>
            <Layout className={styles["page-layout"]}>
                <Breadcrumb className={styles["page-layout__breadcrumbs"]}>
                    <Breadcrumb.Item className={styles["breadcrumbs__item"]}>Главная</Breadcrumb.Item>
                </Breadcrumb>
                {innerLayout}
                <div
                    className={`${styles["trigger"]} ${styles[collapsed ? "trigger-collapsed" : "trigger-not-collapsed"]}`}
                    data-test-id={window.innerWidth < 833 ? "sider-switch-mobile" : "sider-switch"}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </div>
            </Layout>
        </Layout>
    );
};
