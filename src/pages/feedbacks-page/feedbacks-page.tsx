import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResultModal } from '@components/result-modal/result-modal';
import { EROUTE, EStatus } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectFeedback } from '@redux/feedback-slice';
import { getFeedbacks } from '@utils/requests/feedback/get-feedbacks';
import { Button, Layout } from 'antd';
import classNames from 'classnames';

import { FeedbackCards } from './feeback-cards/feedback-cards';
import { FeedbackModal } from './feedback-modal/feedback-modal';

import 'antd/dist/antd.css';
import styles from './feedbacks-page.module.css';

export const FeedbacksPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const feedbackData = useAppSelector(selectFeedback);
    const [isShowAll, setIsShowAll] = useState(false);
    const cardsData = isShowAll ? feedbackData : feedbackData.slice(0, 4);
    const isNoCards = cardsData.length === 0;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resultType, setResultType] = useState(EStatus.empty);

    useEffect(() => {
        dispatch(getFeedbacks()).then(response => {
            if (response === EStatus.redirect) navigate(EROUTE.AUTH);
            if (response === EStatus.noToken || response === EStatus.errorFeedback) setResultType(EStatus.noToken);
        });
    }, [dispatch, navigate]);

    const firstFeedback = (
        <div className={styles['first-feedback']}>
            <h2 className={styles['first-feedback__title']}>Оставьте свой отзыв первым</h2>
            <p className={styles['first-feedback__subtitle']}>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.<br />Поделитесь своим мнением и опытом с другими пользователями,<br />и помогите им сделать правильный выбор.</p>
        </div>
    );

    return (
        <Layout className={classNames(styles.page, { [styles['no-feedback']]: isNoCards })}>
            {isNoCards
                ? firstFeedback
                : <FeedbackCards cardsData={cardsData} />}
            <div className={styles.page__buttons}>
                <Button
                    className={styles['conf-button']}
                    onClick={() => setIsModalOpen(true)}
                    data-test-id="write-review"
                >
                    Написать отзыв
                </Button>
                {!isNoCards && <Button
                    type="text"
                    className={styles['text-button']}
                    onClick={() => setIsShowAll(prev => !prev)}
                    data-test-id="all-reviews-button"
                >
                    {isShowAll ? 'Свернуть все отзывы' : 'Разернуть все отзывы'}
                </Button>}
            </div>
            <FeedbackModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setResultType={setResultType}
            />
            {resultType !== EStatus.empty && <ResultModal
                resultType={resultType}
                setResultType={setResultType}
                setIsModalOpen={setIsModalOpen}
            />}
        </Layout>
    );
};
