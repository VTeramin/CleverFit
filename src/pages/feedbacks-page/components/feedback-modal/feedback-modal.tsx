import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styles from './feedback-modal.module.css';
import { Button, Form, Input, Modal, Rate } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
import { sendFeedback } from '../../../../requests';

type feedback = {
    imageSrc: string,
    fullName: string,
    rating: number,
    createdAt: string,
    message: string
};

type props = {
    isModalOpen: boolean,
    setIsModalOpen: (a: boolean) => void,
    setCardsData: React.Dispatch<React.SetStateAction<feedback[]>>,
    setResultType:  (a: string) => void,
    setIsNoFeedback: (a: boolean) => void
}

export const FeedbackModal: React.FC<props> = ({ isModalOpen, setIsModalOpen, setCardsData, setResultType, setIsNoFeedback }) => {
    const [feedback, setFeedback] = useState({
        message: "",
        rating: 0
    });

    function handleFeedback() {
        sendFeedback(feedback.message, feedback.rating).then((response) => {
            if (response === "success") setCardsData(prev => [
                {
                    imageSrc: "",
                    fullName: "",
                    rating: feedback.rating,
                    createdAt: new Date(Date.now()).toISOString(),
                    message: feedback.message
                },
                ...prev
            ]);
            setResultType(response);
            setIsNoFeedback(false);
        }).finally(() => setIsModalOpen(false));
    }

    return (
        <Modal
            title="Ваш отзыв"
            open={isModalOpen}
            centered={true}
            footer={<Button
                className={`${styles["conf-button"]} ${styles["modal__button"]}`}
                onClick={handleFeedback}
                disabled={feedback.rating === 0}
                data-test-id="new-review-submit-button"
            >
                Опубликовать
            </Button>}
            width={window.innerWidth > 833 ? 539 : 328}
            onCancel={() => setIsModalOpen(false)}
            maskClosable={false}
            maskStyle={{ backdropFilter: "blur(6px)", background: "rgba(121, 156, 212, 0.5)" }}
            className={styles["modal"]}
        >
            <Form initialValues={feedback}>
                <Form.Item required name="rating">
                    <Rate
                        value={feedback.rating}
                        character={<StarTwoTone twoToneColor="var(--character-light-warning)" className={styles["rate__star"]} />}
                        onChange={(value) => setFeedback(prev => ({ ...prev, rating: value }))}
                        className={`${styles["modal__rate"]} ${styles["rate"]}`}
                    />
                </Form.Item>
                <Form.Item name="message">
                    <Input.TextArea
                        value={feedback.message}
                        placeholder="Autosize height based on content lines"
                        autoSize={{ minRows: 1.64 }}
                        onChange={(event) => setFeedback(prev => ({ ...prev, message: event.target.value }))}
                        className={styles["modal__textarea"]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
