import React from 'react';
import 'antd/dist/antd.css';
import styles from './result-modal.module.css';
import { Button, Modal, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from '@uidotdev/usehooks';
import { changeResultType } from '@redux/calendarModalSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { ROUTE, status } from '@constants/enums';

type props = {
    resultType: status,
    setResultType: React.Dispatch<React.SetStateAction<status>>,
    setIsModalOpen?: (a: boolean) => void
}

export const ResultModal: React.FC<props> = ({ resultType, setResultType, setIsModalOpen }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const width = useWindowSize().width || 0;
    const resultWidth = width > 800 ? 539 : 328;

    function handleWriteReview() {
        if (setIsModalOpen) setIsModalOpen(true);
        setResultType(status.empty);
    }

    const result: { [name: string]: JSX.Element } = {
        [status.errorFeedback]: <Result
            status="error"
            title="Данные не сохранились"
            subTitle="Что-то пошло не так. Попробуйте еще раз."
            extra={[
                <Button
                    key="Написать отзыв"
                    className={styles["conf-button"]}
                    onClick={handleWriteReview}
                    data-test-id="write-review-not-saved-modal"
                >
                    Написать отзыв
                </Button>,
                <Button
                    key="Закрыть"
                    className={`${styles["conf-button"]} ${styles["conf-button-white"]}`}
                    onClick={() => setResultType(status.empty)}
                >
                    Закрыть
                </Button>
            ]}
        />,
        [status.successFeedback]: <Result
            status="success"
            title="Отзыв успешно опубликован"
            extra={[
                <Button
                    key="Отлично"
                    className={`${styles["conf-button"]}`}
                    onClick={() => setResultType(status.empty)}
                >
                    Отлично
                </Button>
            ]}
        />,
        [status.noToken]: <Result
            status="500"
            title="Что-то пошло не так"
            subTitle="Произошла ошибка, попробуйте ещё раз."
            className={styles["no-token"]}
            extra={[
                <Button
                    key="Назад"
                    className={`${styles["conf-button"]}`}
                    onClick={() => {
                        navigate(ROUTE.HOME);
                        dispatch(changeResultType(status.empty));
                    }}
                >
                    Назад
                </Button>
            ]}
        />
    };

    return (
        <Modal
            centered={true}
            maskStyle={{
                backdropFilter: "var(--background-blur-filter)",
                background: "var(--background-blur-color)"
            }}
            width={resultWidth}
            className={styles["result"]}
            open={true}
            maskClosable={false}
            closable={false}
            footer={null}
            data-test-id="modal-no-review"
        >
            {result[resultType]}
        </Modal>
    );
};
