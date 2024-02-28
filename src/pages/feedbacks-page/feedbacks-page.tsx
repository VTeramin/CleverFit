import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './feedbacks-page.module.css';
import { Avatar, Button, Card, Comment, Layout, Rate } from 'antd';
import { StarTwoTone, UserOutlined } from '@ant-design/icons';
import { getFeedbacks } from '../../requests';

export const FeedbacksPage: React.FC = () => {
    function convertDate(date: string) {
        return date.substring(0, 10).split("-").reverse().join(".");
    }

    const [cardsData, setCardsData] = useState([
        {
            fullName: "",
            imageSrc: "",
            message: "",
            rating: 0,
            createdAt: ""
        }
    ]);

    useEffect(() => {
        getFeedbacks().then(data => setCardsData(data));
    }, []);

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
                    <p className={styles["person__name"]}>{cardData.fullName}</p>
                </div>}
                author={<Rate
                    disabled
                    value={cardData.rating}
                    character={<StarTwoTone twoToneColor="var(--character-light-warning)" className={styles["rate__star"]} />}
                    className={styles["card__rate"]}
                />}
                datetime={<span className={styles["card__time"]}>{convertDate(cardData.createdAt)}</span>}
                content={<p>{cardData.message}</p>}
                className={styles["card__comment"]}
            />
        </Card>
    ));

    return (
        <Layout className={styles["page"]}>
            <section className={styles["page__cards"]}>
                {cards.slice(0, 4)}
            </section>
            <div className={styles["page__buttons"]}>
                <Button className={styles["conf-button"]}>Написать отзыв</Button>
                <Button type="text" className={styles["text-button"]}>Развернуть все отзывы</Button>
            </div>
        </Layout>
    );
};
