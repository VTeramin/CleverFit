import React from 'react';
import 'antd/dist/antd.css';
import styles from './main-footer.module.css';
import { Button, Layout } from 'antd';
const { Footer } = Layout;
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toggleIsAuthorized } from '@redux/userDataSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

export const MainFooter: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <Footer className={styles["footer"]}>
            <Button
                type="text"
                className={styles["footer__reviews"]}
                onClick={() => {
                    if(localStorage.getItem("token") === "") dispatch(toggleIsAuthorized(false));
                    navigate("/feedbacks");
                }}
                data-test-id="see-reviews"
            >Смотреть отзывы</Button>
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
