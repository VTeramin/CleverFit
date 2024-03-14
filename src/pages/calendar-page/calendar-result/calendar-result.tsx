import React from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-result.module.css';
import { Button, Modal, Result } from 'antd';
import { getTrainingList, status } from '@utils/requests';
import { useWindowSize } from '@uidotdev/usehooks';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeResultType, selectCalendarModalData, toggleIsModal } from '@redux/calendarModalSlice';

export const CalendarResult: React.FC = () => {
    const dispatch = useAppDispatch();
    const { resultType } = useAppSelector(selectCalendarModalData);
    const width = useWindowSize().width || 0;

    function handleUpdate() {
        dispatch(changeResultType(status.empty));
        dispatch(getTrainingList()).then(resp => {
            if (resp === status.errorTrainingList) {
                dispatch(changeResultType(status.errorTrainingList));
            }
        });
    }

    function handleClose() {
        dispatch(changeResultType(status.empty));
    }

    function handleCloseAll() {
        dispatch(changeResultType(status.empty));
        dispatch(toggleIsModal(false));
    }

    const result: { [name: string]: JSX.Element } = {
        [status.errorTrainingList]:
            <Modal
                centered={true}
                maskStyle={{
                    backdropFilter: "var(--background-blur-filter)",
                    background: "var(--background-blur-color-light)"
                }}
                width={width > 800 ? 384 : 539}
                className={styles["result"]}
                open={resultType !== status.empty}
                onCancel={handleClose}
                maskClosable={false}
                closable={true}
                footer={null}
            >
                <Result
                    icon={<CloseCircleOutlined style={{ color: "var(--primary-light-6)" }} />}
                    title="При открытии данных произошла ошибка"
                    subTitle="Попробуйте еще раз."
                    className={styles["error-trining-list"]}
                    extra={[
                        <Button
                            key="Обновить"
                            className={`${styles["conf-button"]}`}
                            onClick={handleUpdate}
                        >
                            Обновить
                        </Button>
                    ]}
                />
            </Modal>,
        [status.errorSaveTraining]:
            <Modal
                centered={true}
                maskStyle={{
                    backdropFilter: "var(--background-blur-filter)",
                    background: "var(--background-blur-color-light)"
                }}
                width={width > 800 ? 416 : 328}
                className={`${styles["result"]} ${styles["result-error-save"]}`}
                open={resultType !== status.empty}
                onCancel={handleClose}
                maskClosable={false}
                closable={false}
                footer={null}
            >
                <Result
                    icon={<CloseCircleOutlined style={{ color: "var(--character-light-error)" }} />}
                    title="При сохранении данных произошла ошибка"
                    subTitle="Придётся попробовать ещё раз"
                    className={styles["error-trining-list"]}
                    extra={[
                        <Button
                            key="Закрыть"
                            className={`${styles["conf-button"]}`}
                            onClick={handleCloseAll}
                        >
                            Закрыть
                        </Button>
                    ]}
                />
            </Modal>
    };

    return result[resultType];
};
