import React, { ChangeEvent, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './feedback-modal.module.css';
import { Button, Form, Input, Modal, Rate } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
import { sendFeedback, status } from '@utils/requests';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useWindowSize } from '@uidotdev/usehooks';

type props = {
    isModalOpen: boolean,
    setResultType: React.Dispatch<React.SetStateAction<status>>,
    setIsModalOpen: (a: boolean) => void
}

export const FeedbackModal: React.FC<props> = ({ isModalOpen, setIsModalOpen, setResultType }) => {
    const dispatch = useAppDispatch();
    const width = useWindowSize().width || 0;
    const isFullWidth = width > 833;
    const [feedback, setFeedback] = useState({
        message: "",
        rating: 0
    });

    function handleFeedback() {
        dispatch(sendFeedback(feedback.message, feedback.rating))
            .then((response) => {
                setResultType(response);
                setIsModalOpen(false);
            })
    }

    function handleRating(value: number) {
        setFeedback(prev => ({ ...prev, rating: value }));
    }

    function handleTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
        setFeedback(prev => ({ ...prev, message: event.target.value }));
    }

    return (
        <Modal
            title="Ваш отзыв"
            open={isModalOpen}
            centered={true}
            width={isFullWidth ? 539 : 328}
            onCancel={() => setIsModalOpen(false)}
            maskClosable={false}
            maskStyle={{ backdropFilter: "blur(6px)", background: "rgba(121, 156, 212, 0.5)" }}
            className={styles["modal"]}
            footer={<Button
                className={`${styles["conf-button"]} ${styles["modal__button"]}`}
                onClick={handleFeedback}
                disabled={feedback.rating === 0}
                data-test-id="new-review-submit-button"
            >
                Опубликовать
            </Button>}
        >
            <Form initialValues={feedback}>
                <Form.Item required name="rating">
                    <Rate
                        value={feedback.rating}
                        character={<StarTwoTone twoToneColor="var(--character-light-warning)" className={styles["rate__star"]} />}
                        onChange={handleRating}
                        className={`${styles["modal__rate"]} ${styles["rate"]}`}
                    />
                </Form.Item>
                <Form.Item name="message">
                    <Input.TextArea
                        value={feedback.message}
                        placeholder="Autosize height based on content lines"
                        style={{ resize: "vertical" }}
                        autoSize={{ minRows: 1.64 }}
                        onChange={handleTextArea}
                        className={styles["modal__textarea"]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
