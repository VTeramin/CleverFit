import React from 'react';
import 'antd/dist/antd.css';
import styles from './main-footer.module.css';
import { Button, Layout, Modal, Result } from 'antd';
const { Footer } = Layout;
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { getFeedbacks } from '../../../../requests';
import { useNavigate } from 'react-router-dom';
import { changeFeedbackData } from '@redux/feedbackSlice';
import { store } from '@redux/configure-store';
import { toggleIsAuthorized } from '@redux/userDataSlice';

export const MainFooter: React.FC = () => {
    const navigate = useNavigate();

    function handleFeedback() {
        getFeedbacks().then(response => {
            if (response === "redirect") {
                localStorage.clear();
                store.dispatch(toggleIsAuthorized(false));
                navigate("/auth");
                console.log(response);
                return;
            }
            if (response === "no token" || response === "error") {
                Modal.error({
                    content: <Result
                        status="500"
                        title="Что-то пошло не так"
                        subTitle="Произошла ошибка, попробуйте еще раз"
                    />,
                    centered: true,
                    okText: "Назад",
                    maskStyle: { backdropFilter: "blur(6px)", background: "rgba(121, 156, 212, 0.5)" },
                    width: window.innerWidth > 833 ? "539px" : "328px",
                    className: styles["modal"]
                });
                return;
            }
            store.dispatch(changeFeedbackData(response));
            navigate("/feedbacks");
        })
    }

    return (
        <Footer className={styles["footer"]}>
            <Button
                type="text"
                className={styles["footer__reviews"]}
                onClick={handleFeedback}
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
