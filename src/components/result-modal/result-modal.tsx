import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EROUTE, EStatus } from '@constants/enums';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { changeResultType } from '@redux/calendar-modal-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { Button, Modal, Result } from 'antd';

import 'antd/dist/antd.css';
import styles from './result-modal.module.css';

type TProps = {
    resultType: EStatus,
    setResultType: React.Dispatch<React.SetStateAction<EStatus>>,
    setIsModalOpen?: (a: boolean) => void
}

export const ResultModal: React.FC<TProps> = ({ resultType, setResultType, setIsModalOpen }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const width = useWindowSize().width || 0;
    const resultWidth = width > 800 ? 539 : 328;

    const handleWriteReview = () => {
        if (setIsModalOpen) setIsModalOpen(true);
        setResultType(EStatus.empty);
    }

    const handleBackToHomePage = () => {
        navigate(EROUTE.HOME);
        dispatch(changeResultType(EStatus.empty));
    }

    const close = () => {
        setResultType(EStatus.empty);
    }

    const result: { [name: string]: JSX.Element } = {
        [EStatus.errorFeedback]: <Result
            status="error"
            title="Данные не сохранились"
            subTitle="Что-то пошло не так. Попробуйте еще раз."
            extra={[
                <Button
                    key="Написать отзыв"
                    className={styles['conf-button']}
                    onClick={handleWriteReview}
                    data-test-id="write-review-not-saved-modal"
                >
                    Написать отзыв
                </Button>,
                <Button
                    key="Закрыть"
                    className={`${styles['conf-button']} ${styles['conf-button-white']}`}
                    onClick={close}
                >
                    Закрыть
                </Button>
            ]}
        />,
        [EStatus.successFeedback]: <Result
            status="success"
            title="Отзыв успешно опубликован"
            extra={[
                <Button
                    key="Отлично"
                    className={`${styles['conf-button']}`}
                    onClick={close}
                >
                    Отлично
                </Button>
            ]}
        />,
        [EStatus.noToken]: <Result
            status="500"
            title="Что-то пошло не так"
            subTitle="Произошла ошибка, попробуйте ещё раз."
            className={styles['no-token']}
            extra={[
                <Button
                    key="Назад"
                    className={`${styles['conf-button']}`}
                    onClick={handleBackToHomePage}
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
                backdropFilter: 'var(--background-blur-filter)',
                background: 'var(--background-blur-color)'
            }}
            width={resultWidth}
            className={styles.result}
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
