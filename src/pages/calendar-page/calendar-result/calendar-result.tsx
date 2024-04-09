import React from 'react';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { EStatus } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeResultType, selectCalendarModalData, toggleIsModal } from '@redux/calendar-modal-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { getTrainingList } from '@utils/requests/catalogs/get-training-list';
import { getUserJointTrainingList } from '@utils/requests/catalogs/get-user-joint-training-list';
import { Button, Modal, Result } from 'antd';

import 'antd/dist/antd.css';
import styles from './calendar-result.module.css';

export const CalendarResult: React.FC = () => {
    const dispatch = useAppDispatch();
    const { resultType } = useAppSelector(selectCalendarModalData);
    const width = useWindowSize().width || 0;

    function handleUpdate() {
        dispatch(changeResultType(EStatus.empty));
        dispatch(getTrainingList());
    }

    function handleUpdateJoint() {
        dispatch(getUserJointTrainingList());
    }

    function handleClose() {
        dispatch(changeResultType(EStatus.empty));
    }

    function handleCloseAll() {
        dispatch(changeResultType(EStatus.empty));
        dispatch(toggleIsModal(false));
    }

    const result: { [name: string]: JSX.Element } = {
        [EStatus.errorTrainingList]:
            <Modal
                centered={true}
                maskStyle={{
                    backdropFilter: 'var(--background-blur-filter)',
                    background: 'var(--background-blur-color-light)'
                }}
                width={width > 800 ? 384 : 539}
                className={styles.result}
                open={resultType !== EStatus.empty}
                onCancel={() => handleClose()}
                maskClosable={false}
                closable={true}
                closeIcon={<CloseOutlined data-test-id="modal-error-user-training-button-close" />}
                footer={null}
            >
                <Result
                    icon={<CloseCircleOutlined style={{ color: 'var(--primary-light-6)' }} />}
                    title={<p data-test-id="modal-error-user-training-title">При открытии данных произошла ошибка</p>}
                    subTitle={<p data-test-id="modal-error-user-training-subtitle">Попробуйте еще раз.</p>}
                    className={styles['error-trining-list']}
                    extra={[
                        <Button
                            key="Обновить"
                            className={`${styles['conf-button']}`}
                            onClick={() => handleUpdate()}
                            data-test-id="modal-error-user-training-button"
                        >
                            Обновить
                        </Button>
                    ]}
                />
            </Modal>,
        [EStatus.errorUserJointTrainingList]:
            <Modal
                centered={true}
                maskStyle={{
                    backdropFilter: 'var(--background-blur-filter)',
                    background: 'var(--background-blur-color-light)'
                }}
                width={width > 800 ? 384 : 539}
                className={styles.result}
                open={resultType !== EStatus.empty}
                onCancel={() => handleClose()}
                maskClosable={false}
                closable={true}
                closeIcon={<CloseOutlined data-test-id="modal-error-user-training-button-close" />}
                footer={null}
            >
                <Result
                    icon={<CloseCircleOutlined style={{ color: 'var(--primary-light-6)' }} />}
                    title={<p data-test-id="modal-error-user-training-title">При открытии данных произошла ошибка</p>}
                    subTitle={<p data-test-id="modal-error-user-training-subtitle">Попробуйте еще раз.</p>}
                    className={styles['error-trining-list']}
                    extra={[
                        <Button
                            key="Обновить"
                            className={`${styles['conf-button']}`}
                            onClick={() => handleUpdateJoint()}
                            data-test-id="modal-error-user-training-button"
                        >
                            Обновить
                        </Button>
                    ]}
                />
            </Modal>,
        [EStatus.errorSaveTraining]:
            <Modal
                centered={true}
                maskStyle={{
                    backdropFilter: 'var(--background-blur-filter)',
                    background: 'var(--background-blur-color-light)'
                }}
                width={width > 800 ? 416 : 328}
                className={`${styles.result} ${styles['result-error-save']}`}
                open={resultType !== EStatus.empty}
                onCancel={() => handleClose()}
                maskClosable={false}
                closable={false}
                footer={null}
            >
                <Result
                    icon={<CloseCircleOutlined style={{ color: 'var(--character-light-error)' }} />}
                    title={<p data-test-id="modal-error-user-training-title">При сохранении данных произошла ошибка</p>}
                    subTitle={<p data-test-id="modal-error-user-training-subtitle">Придётся попробовать ещё раз</p>}
                    className={styles['error-trining-list']}
                    extra={[
                        <Button
                            key="Закрыть"
                            className={`${styles['conf-button']}`}
                            onClick={() => handleCloseAll()}
                            data-test-id="modal-error-user-training-button"
                        >
                            Закрыть
                        </Button>
                    ]}
                />
            </Modal>
    };

    return result[resultType];
};
