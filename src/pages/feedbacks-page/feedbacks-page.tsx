import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './feedbacks-page.module.css';
import { Avatar, Button, Card, Comment, Layout, Rate } from 'antd';
import { StarTwoTone, UserOutlined } from '@ant-design/icons';
import { store } from '@redux/configure-store';

export const FeedbacksPage: React.FC = () => {
    const [cardsData, setCardsData] = useState(() => store.getState().feedback);
    const [isNoFeedback, setIsNoFeedback] = useState(cardsData.length === 0);
    const [isShowAll, setIsShowAll] = useState(false);

    useEffect(() => {
        setCardsData(prev => isShowAll ? store.getState().feedback : prev.slice(0, 4));
    }, [isShowAll]);

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
                    className={styles["card__rate"]}
                />}
                datetime={<span className={styles["card__time"]}>{cardData.createdAt.substring(0, 10).split("-").reverse().join(".")}</span>}
                content={<p>{cardData.message}</p>}
                className={styles["card__comment"]}
            />
        </Card>
    ));

    return (
        <Layout className={`${styles["page"]} ${styles[isNoFeedback ? "no-feedback" : ""]}`}>
            {isNoFeedback ? firstFeedback : <section className={styles["page__cards"]}>{cards}</section>}
            <div className={styles["page__buttons"]}>
                <Button className={`${styles["conf-button"]} ${styles[isNoFeedback ? "no-feedback" : ""]}`}>Написать отзыв</Button>
                {!isNoFeedback && <Button
                type="text"
                className={styles["text-button"]}
                onClick={() => setIsShowAll(prev => !prev)}
                >
                    {isShowAll ? "Свернуть все отзывы" : "Разернуть все отзывы"}
                </Button>}
            </div>
        </Layout>
    );
};
