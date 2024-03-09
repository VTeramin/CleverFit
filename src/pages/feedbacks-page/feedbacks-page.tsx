import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './feedbacks-page.module.css';
import { Button, Layout } from 'antd';
import { FeedbackCards } from './components/feeback-cards/feedback-cards';
import { FeedbackModal } from './components/feedback-modal/feedback-modal';
import { FeedbackResult } from './components/feedback-result/feedback-result';
import { getFeedbacks, status } from '@utils/requests';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectFeedback } from '@redux/feedbackSlice';
import { ROUTE } from '@route/routes';

export const FeedbacksPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const feedbackData = useAppSelector(selectFeedback);
    const [isShowAll, setIsShowAll] = useState(false);
    const cardsData = isShowAll ? feedbackData : feedbackData.slice(0, 4);
    const isNoCards = cardsData.length === 0;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resultType, setResultType] = useState(status.empty);

    useEffect(() => {
        dispatch(getFeedbacks()).then(response => {
            if (response === status.redirect) navigate(ROUTE.AUTH);
            if (response === status.noToken || response === status.error) setResultType(status.noToken);
        });
    }, [dispatch, navigate]);

    const firstFeedback = (
        <div className={styles["first-feedback"]}>
            <h2 className={styles["first-feedback__title"]}>Оставьте свой отзыв первым</h2>
            <p className={styles["first-feedback__subtitle"]}>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.<br />Поделитесь своим мнением и опытом с другими пользователями,<br />и помогите им сделать правильный выбор.</p>
        </div>
    );

    return (
        <Layout className={`${styles["page"]} ${isNoCards && styles["no-feedback"]}`}>
            {isNoCards ? firstFeedback : <FeedbackCards cardsData={cardsData} />}
            <div className={styles["page__buttons"]}>
                <Button
                    className={`${styles["conf-button"]}`}
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
            {resultType !== status.empty && <FeedbackResult
                resultType={resultType}
                setResultType={setResultType}
                setIsModalOpen={setIsModalOpen}
            />}
        </Layout>
    );
};
