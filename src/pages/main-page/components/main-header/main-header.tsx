import React from 'react';
import 'antd/dist/antd.css';
import styles from './main-header.module.css';
import { Layout } from 'antd';
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';

type props = {
    collapsed: boolean,
    setCollapsed: (a: boolean) => void
}

export const MainHeader: React.FC<props> = ({ collapsed, setCollapsed }) => {
    const trigger = React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined);

    return (
        <Header className={styles["header"]}>
            <div
                className={`${styles["trigger"]} ${styles[collapsed ? "trigger-collapsed" : "trigger-not-collapsed"]}`}
                data-test-id={window.innerWidth < 833 ? "sider-switch-mobile" : "sider-switch"}
                onClick={() => setCollapsed(!collapsed)}
            >
                {trigger}
            </div>
            <div className={styles["header__content"]}>
                <p className={styles["header__page-name"]}>Главная</p>
                <h1 className={styles["header__title"]}>Приветствуем тебя в&nbsp;CleverFit — приложении,<br />которое поможет тебе добиться своей мечты!</h1>
                <div className={styles["header__settings"]}>
                    {React.createElement(SettingOutlined, { className: styles["settings__icon"] })}
                    <p className={styles["settings__line"]}>Настройки</p>
                </div>
            </div>
        </Header>
    );
};
