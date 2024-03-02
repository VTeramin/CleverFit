import React from 'react';
import 'antd/dist/antd.css';
import styles from './feedback-result.module.css';
import { Button, Modal, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

type props = {
    resultType: "success" | "error" | "noToken",
    setResultType: (a: string) => void,
    setIsModalOpen: (a: boolean) => void
}

export const FeedbackResult: React.FC<props> = ({ resultType, setResultType, setIsModalOpen }) => {
    const navigate = useNavigate();
    const result: { [name: string]: JSX.Element } = {
        error: <Result
            status="error"
            title="Данные не сохранились"
            subTitle="Что-то пошло не так. Попробуйте еще раз."
            extra={[
                <Button
                    key="Написать отзыв"
                    className={styles["conf-button"]}
                    onClick={() => {
                        setIsModalOpen(true);
                        setResultType("");
                    }}
                    data-test-id="write-review-not-saved-modal"
                >
                    Написать отзыв
                </Button>,
                <Button
                    key="Закрыть"
                    className={`${styles["conf-button"]} ${styles["conf-button-white"]}`}
                    onClick={() => setResultType("")}
                >
                    Закрыть
                </Button>
            ]}
        />,
        success: <Result
            status="success"
            title="Отзыв успешно опубликован"
            extra={[
                <Button
                    key="Отлично"
                    className={`${styles["conf-button"]}`}
                    onClick={() => setResultType("")}
                >
                    Отлично
                </Button>
            ]}
        />,
        noToken: <Result
            status="500"
            title="Что-то пошло не так"
            subTitle="Произошла ошибка, попробуйте еще раз."
            className={styles["no-token"]}
            extra={[
                <Button
                    key="Назад"
                    className={`${styles["conf-button"]}`}
                    onClick={() => navigate("/")}
                >
                    Назад
                </Button>
            ]}
        />
    };

    return (
        <Modal
            centered={true}
            maskStyle={{ backdropFilter: "blur(6px)", background: "rgba(121, 156, 212, 0.5)" }}
            width={window.innerWidth > 833 ? 539 : 328}
            className={styles["result"]}
            open={true}
            maskClosable={false}
            closable={false}
            footer={null}
        >
            {result[resultType]}
        </Modal>
    );
};
