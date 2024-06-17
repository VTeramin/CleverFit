import React from 'react';
import { StarTwoTone, UserOutlined } from '@ant-design/icons';
import { TFeedback } from '@constants/types';
import { convertDate } from '@utils/convert-date';
import { Avatar, Card, Comment, Rate } from 'antd';
import classNames from 'classnames';

import 'antd/dist/antd.css';
import styles from './feedback-cards.module.css';

type TProps = {
    cardsData: TFeedback[]
}

export const FeedbackCards: React.FC<TProps> = ({ cardsData }) => (
        <section className={styles.page__cards}>
            {cardsData.map(cardData => (
                <Card key={cardData.id} className={styles.card}>
                    <Comment
                        avatar={<div className={styles.card__person}>
                            <Avatar
                                src={cardData.imageSrc}
                                icon={<UserOutlined />}
                                alt={cardData.fullName}
                                size={42}
                                className={styles.person__img}
                            />
                            <p className={styles.person__name}>{cardData.fullName || 'Пользователь'}</p>
                        </div>}
                        author={<Rate
                            disabled={true}
                            value={cardData.rating}
                            character={<StarTwoTone twoToneColor="var(--character-light-warning)" className={styles.rate__star} />}
                            className={classNames(styles.card__rate, styles.rate)}
                        />}
                        datetime={<span className={styles.card__time}>
                            {convertDate(new Date(cardData.createdAt))}
                        </span>}
                        content={<p>{cardData.message}</p>}
                        className={styles.card__comment}
                    />
                </Card>
            ))}
        </section>
    );
