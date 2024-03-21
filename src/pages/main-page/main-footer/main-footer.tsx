import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { EROUTE } from '@constants/enums';
import { Button, Layout } from 'antd';

import 'antd/dist/antd.css';
import styles from './main-footer.module.css';

const { Footer } = Layout;

export const MainFooter: React.FC = () => {
    const navigate = useNavigate();
    const phoneIcons = [AndroidFilled, AppleFilled].map((icon, index) => (
            <div key={index + 1} className={styles['download-block__content']}>
                {React.createElement(icon, { className: styles['download-block__icon'] })}
                <p className={styles['download-block__content-title']}>{['Android OS', 'Apple iOS'][index]}</p>
            </div>
        ))

    return (
        <Footer className={styles.footer}>
            <Button
                type="text"
                className={styles.footer__reviews}
                onClick={() => navigate(EROUTE.FEEDBACKS)}
                data-test-id="see-reviews"
            >
                Смотреть отзывы
            </Button>
            <div className={styles['footer__download-block']}>
                <div className={styles['download-block__title-wrapper']}>
                    <p className={styles['download-block__title']}>Скачать на телефон</p>
                    <p className={styles['download-block__subtitle']}>Доступно в PRO-тарифе</p>
                </div>
                <div className={styles['download-block__content-wrapper']}>
                    {phoneIcons}
                </div>
            </div>
        </Footer>
    );
};
