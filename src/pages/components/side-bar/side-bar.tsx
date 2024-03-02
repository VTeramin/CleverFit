import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './side-bar.module.css';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Sider } = Layout;
import { CalendarTwoTone, HeartTwoTone, TrophyTwoTone, IdcardTwoTone, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { toggleIsAuthorized } from '@redux/userDataSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

type props = {
    innerLayout: React.ReactElement
}

export const SideBar: React.FC<props> = ({ innerLayout }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const isFullWidth = width > 800;

    useEffect(() => {
        function updateWidth() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const menuItems = [CalendarTwoTone, HeartTwoTone, TrophyTwoTone, IdcardTwoTone].map((icon, index) => ({
        key: index,
        icon: React.createElement(icon, {
            twoToneColor: "var(--primary-light-9)",
            className: styles["menu__icon"]
        }),
        label: ["Календарь", "Тренировки", "Достижения", "Профиль"][index],
        style: collapsed ? {} : { paddingLeft: isFullWidth ? "16px" : "0" },
        className: styles["menu__item"]
    }));

    function handleExit() {
        localStorage.clear();
        dispatch(toggleIsAuthorized(false));
        navigate("/auth");
    }

    return (
        <Layout className={styles["page"]}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={isFullWidth ? "208" : "106"}
                collapsedWidth={isFullWidth ? "64" : "1"}
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
                    <Breadcrumb.Item onClick={() => navigate("/main")}>Главная</Breadcrumb.Item>
                    {location.pathname === "/feedbacks" && <Breadcrumb.Item>Отзывы пользователей</Breadcrumb.Item>}
                </Breadcrumb>
                {innerLayout}
                <div
                    className={`${styles["trigger"]} ${styles[collapsed ? "trigger-collapsed" : "trigger-not-collapsed"]}`}
                    data-test-id={isFullWidth ? "sider-switch" : "sider-switch-mobile"}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </div>
            </Layout>
        </Layout>
    );
};
