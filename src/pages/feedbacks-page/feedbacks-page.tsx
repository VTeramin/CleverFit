import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './feedbacks-page.module.css';
import { Avatar, Button, Card, Comment, Form, Input, Layout, Modal, Rate, Result } from 'antd';
import { StarTwoTone, UserOutlined } from '@ant-design/icons';
import { store } from '@redux/configure-store';
import { sendFeedback } from '../../requests';

export const FeedbacksPage: React.FC = () => {
    const [cardsData, setCardsData] = useState(() => store.getState().feedback);
    const [isNoFeedback, setIsNoFeedback] = useState(cardsData.length === 0);
    const [isShowAll, setIsShowAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedback, setFeedback] = useState({
        message: "",
        rating: 0
    });

    useEffect(() => {
        setCardsData(prev => isShowAll ? [...new Set([...prev, ...store.getState().feedback])] : prev.slice(0, 4));
    }, [isShowAll, isModalOpen]);

    const firstFeedback = (
        <div className={styles["firstFeedback"]}>
            <h2 className={styles["firstFeedback__title"]}>Оставьте свой отзыв первым</h2>
            <p className={styles["firstFeedback__subtitle"]}>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.<br />Поделитесь своим мнением и опытом с другими пользователями,<br />и помогите им сделать правильный выбор.</p>
        </div>
    );

    const cards = cardsData.map((cardData, ind) => (
        <Card key={ind} className={styles["card"]}>
            <Comment
                avatar={<div className={styles["card__person"]}>
                    <Avatar
                        src={cardData.imageSrc || <UserOutlined />}
                        alt={cardData.fullName}
                        size={42}
                        className={styles["person__img"]}
                    />
                    <p className={styles["person__name"]}>{cardData.fullName || "Пользователь"}</p>
                </div>}
                author={<Rate
                    disabled
                    value={cardData.rating}
                    character={<StarTwoTone twoToneColor="var(--character-light-warning)" className={styles["rate__star"]} />}
                    className={`${styles["card__rate"]} ${styles["rate"]}`}
                />}
                datetime={<span className={styles["card__time"]}>{cardData.createdAt.substring(0, 10).split("-").reverse().join(".")}</span>}
                content={<p>{cardData.message}</p>}
                className={styles["card__comment"]}
            />
        </Card>
    ));

    function handleFeedback() {
        sendFeedback(feedback.message, feedback.rating).then((response) => {
            if (response === "error") {
                Modal.confirm({
                    content: <Result
                        status="error"
                        title="Данные не сохранились"
                        subTitle="Что-то пошло не так. Попробуйте еще раз"
                    />,
                    centered: true,
                    okText: "Закрыть",
                    cancelText: "Написать отзыв",
                    onCancel: () => setIsModalOpen(true),
                    maskStyle: { backdropFilter: "blur(6px)", background: "rgba(121, 156, 212, 0.5)" },
                    width: window.innerWidth > 833 ? "539px" : "328px",
                    className: styles["result"]
                });
            }
            if (response === "success") {
                Modal.success({
                    content: <Result
                        status="success"
                        title="Отзыв успешно опубликован"
                    />,
                    centered: true,
                    okText: "Отлично",
                    maskStyle: { backdropFilter: "blur(6px)", background: "rgba(121, 156, 212, 0.5)" },
                    width: window.innerWidth > 833 ? "539px" : "328px",
                    className: styles["result"]
                });
                setCardsData(prev => [
                    {
                        imageSrc: "",
                        fullName: "",
                        rating: feedback.rating,
                        createdAt: new Date(Date.now()).toISOString(),
                        message: feedback.message
                    },
                    ...prev
                ]);
                setIsNoFeedback(false);
            }
        }).finally(() => setIsModalOpen(false))
    }

    return (
        <Layout className={`${styles["page"]} ${styles[isNoFeedback ? "no-feedback" : ""]}`}>
            {isNoFeedback ? firstFeedback : <section className={styles["page__cards"]}>{cards}</section>}
            <div className={styles["page__buttons"]}>
                <Button
                    className={`${styles["conf-button"]} ${styles[isNoFeedback ? "no-feedback" : ""]}`}
                    onClick={() => setIsModalOpen(true)}
                >
                    Написать отзыв
                </Button>
                {!isNoFeedback && <Button
                    type="text"
                    className={styles["text-button"]}
                    onClick={() => setIsShowAll(prev => !prev)}
                >
                    {isShowAll ? "Свернуть все отзывы" : "Разернуть все отзывы"}
                </Button>}
            </div>
            <Modal
                title="Ваш отзыв"
                open={isModalOpen}
                centered={true}
                footer={<Button
                    className={`${styles["conf-button"]} ${styles["modal__button"]}`}
                    onClick={handleFeedback}
                    disabled={feedback.rating === 0}
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
        </Layout>
    );
};
