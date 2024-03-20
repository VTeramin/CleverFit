import React from 'react';
import 'antd/dist/antd.css';
import styles from './feedback-cards.module.css';
import { Avatar, Card, Comment, Rate } from 'antd';
import { StarTwoTone, UserOutlined } from '@ant-design/icons';
import { convertDate } from '@utils/convert-date';
import { TFeedback } from '@constants/types';

type props = {
    cardsData: TFeedback[]
}

export const FeedbackCards: React.FC<props> = ({ cardsData }) => {
    return (
        <section className={styles["page__cards"]}>
            {cardsData.map((cardData, ind) => (
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
                        datetime={<span className={styles["card__time"]}>
                            {convertDate(cardData.createdAt)}
                        </span>}
                        content={<p>{cardData.message}</p>}
                        className={styles["card__comment"]}
                    />
                </Card>
            ))}
        </section>
    );
};
