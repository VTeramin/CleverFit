import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './feedbacks-page.module.css';
import { Button, Layout } from 'antd';
import { FeedbackCards } from './components/feeback-cards/feedback-cards';
import { FeedbackModal } from './components/feedback-modal/feedback-modal';
import { FeedbackResult } from './components/feedback-result/feedback-result';
import { getFeedbacks } from '../../requests';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectFeedback } from '@redux/feedbackSlice';

export const FeedbacksPage: React.FC = () => {
    const navigate = useNavigate();
    const feedbackData = useAppSelector(selectFeedback);
    const [isShowAll, setIsShowAll] = useState(false);
    const cardsData = isShowAll ? feedbackData : feedbackData.slice(0, 4);
    const isNoCards = cardsData.length === 0;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resultType, setResultType] = useState("");

    useEffect(() => {
        getFeedbacks().then(response => {
            if (response === "redirect") navigate("/auth");
            if (response === "no token" || response === "error") setResultType("noToken");
        });
    }, [navigate]);

    const firstFeedback = (
        <div className={styles["firstFeedback"]}>
            <h2 className={styles["firstFeedback__title"]}>Оставьте свой отзыв первым</h2>
            <p className={styles["firstFeedback__subtitle"]}>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.<br />Поделитесь своим мнением и опытом с другими пользователями,<br />и помогите им сделать правильный выбор.</p>
        </div>
    );

    return (
        <Layout className={`${styles["page"]} ${styles[isNoCards ? "no-feedback" : ""]}`}>
            {isNoCards ? firstFeedback : <FeedbackCards cardsData={cardsData} />}
            <div className={styles["page__buttons"]}>
                <Button
                    className={`${styles["conf-button"]} ${styles[isNoCards ? "no-feedback" : ""]}`}
                    onClick={() => setIsModalOpen(true)}
                    data-test-id="write-review"
                >
                    Написать отзыв
                </Button>
                {!isNoCards && <Button
                    type="text"
                    className={styles["text-button"]}
                    onClick={() => setIsShowAll(prev => !prev)}
                    data-test-id="all-reviews-button"
                >
                    {isShowAll ? "Свернуть все отзывы" : "Разернуть все отзывы"}
                </Button>}
            </div>
            <FeedbackModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setResultType={setResultType}
            />
            {(resultType === "success" || resultType === "error" || resultType === "noToken") && <FeedbackResult
                resultType={resultType}
                setResultType={setResultType}
                setIsModalOpen={setIsModalOpen}
            />}
        </Layout>
    );
};
