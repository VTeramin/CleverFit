import React from 'react';
import 'antd/dist/antd.css';
import styles from './main-header.module.css';
import { Layout } from 'antd';
const { Header } = Layout;
import { SettingOutlined } from '@ant-design/icons';

export const MainHeader: React.FC = () => {
    return (
        <Header className={styles["header"]}>
            <h1 className={styles["header__title"]}>Приветствуем тебя в&nbsp;CleverFit — приложении,<br />которое поможет тебе добиться своей мечты!</h1>
            <div className={styles["header__settings"]}>
                {React.createElement(SettingOutlined, { className: styles["settings__icon"] })}
                <p className={styles["settings__line"]}>Настройки</p>
            </div>
        </Header>
    );
};
