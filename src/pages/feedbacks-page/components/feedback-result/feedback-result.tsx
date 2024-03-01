import React from 'react';
import 'antd/dist/antd.css';
import styles from './feedback-result.module.css';
import { Button, Modal, Result } from 'antd';

type props = {
    resultType: "success" | "error",
    setResultType: (a: string) => void,
    setIsModalOpen: (a: boolean) => void
}

export const FeedbackResult: React.FC<props> = ({ resultType, setResultType, setIsModalOpen }) => {
    const result: { success: JSX.Element, error: JSX.Element } = {
        error: <Result
            status="error"
            title="Данные не сохранились"
            subTitle="Что-то пошло не так. Попробуйте еще раз"
            extra={[
                <Button
                    className={styles["conf-button"]}
                    onClick={() => {
                        setIsModalOpen(true);
                        setResultType("");
                    }}
                >
                    Написать отзыв
                </Button>,
                <Button
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
                    className={`${styles["conf-button"]}`}
                    onClick={() => setResultType("")}
                >
                    Отлично
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
            {resultType === "success" && result["success"]}
            {resultType === "error" && result["error"]}
        </Modal>
    );
};
