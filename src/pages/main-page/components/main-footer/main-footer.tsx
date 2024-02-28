import React from 'react';
import 'antd/dist/antd.css';
import styles from './main-footer.module.css';
import { Layout } from 'antd';
const { Footer } = Layout;
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

export const MainFooter: React.FC = () => {
    return (
        <Footer className={styles["footer"]}>
            <a className={styles["footer__reviews"]}>Смотреть отзывы</a>
            <div className={styles["footer__download-block"]}>
                <div className={styles["download-block__title-wrapper"]}>
                    <p className={styles["download-block__title"]}>Скачать на телефон</p>
                    <p className={styles["download-block__subtitle"]}>Доступно в PRO-тарифе</p>
                </div>
                <div className={styles["download-block__content-wrapper"]}>
                    {[AndroidFilled, AppleFilled].map((icon, index) => {
                        return (
                            <div key={index + 1} className={styles["download-block__content"]}>
                                {React.createElement(icon, { className: styles["download-block__icon"] })}
                                <p className={styles["download-block__content-title"]}>{["Android OS", "Apple iOS"][index]}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Footer>
    );
};
