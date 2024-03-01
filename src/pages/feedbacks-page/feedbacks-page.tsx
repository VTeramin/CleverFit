import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './feedbacks-page.module.css';
import { Button, Layout } from 'antd';
import { store } from '@redux/configure-store';
import { FeedbackCards } from './components/feeback-cards/feedback-cards';
import { FeedbackModal } from './components/feedback-modal/feedback-modal';
import { FeedbackResult } from './components/feedback-result/feedback-result';

export const FeedbacksPage: React.FC = () => {
    const [cardsData, setCardsData] = useState(() => store.getState().feedback);
    const [isNoFeedback, setIsNoFeedback] = useState(cardsData.length === 0);
    const [isShowAll, setIsShowAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resultType, setResultType] = useState("");

    useEffect(() => {
        setCardsData(prev => isShowAll ? [...new Set([...prev, ...store.getState().feedback])] : prev.slice(0, 4));
    }, [isShowAll, isModalOpen]);

    const firstFeedback = (
        <div className={styles["firstFeedback"]}>
            <h2 className={styles["firstFeedback__title"]}>Оставьте свой отзыв первым</h2>
            <p className={styles["firstFeedback__subtitle"]}>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.<br />Поделитесь своим мнением и опытом с другими пользователями,<br />и помогите им сделать правильный выбор.</p>
        </div>
    );

    return (
        <Layout className={`${styles["page"]} ${styles[isNoFeedback ? "no-feedback" : ""]}`}>
            {isNoFeedback ? firstFeedback : <FeedbackCards cardsData={cardsData} />}
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
            <FeedbackModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setCardsData={setCardsData}
                setResultType={setResultType}
                setIsNoFeedback={setIsNoFeedback}
            />
            {(resultType === "success" || resultType === "error") && <FeedbackResult
                resultType={resultType}
                setResultType={setResultType}
                setIsModalOpen={setIsModalOpen}
            />}
        </Layout>
    );
};
