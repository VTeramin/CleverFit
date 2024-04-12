import React from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserData } from '@redux/user-data-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { Modal, Result } from 'antd';

import 'antd/dist/antd.css';
import styles from './settings-result.module.css';

export const SettingsResult: React.FC = () => {
    const width = useWindowSize().width || 0;
    const resultWidth = width > 800 ? 539 : 328;
    const { userInfo } = useAppSelector(selectUserData);

    const handleClose = () => {
        const element = document.getElementById('side-bar__exit') as HTMLElement;

        element.click();
    }

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
            maskClosable={true}
            closable={true}
            onCancel={handleClose}
            footer={null}
            wrapClassName={styles.result}
            data-test-id='tariff-modal-success'
        >
            <Result
                status="success"
                title="Чек для оплаты у вас на почте"
                subTitle={<p>
                    Мы отправили инструкцию для оплаты вам на e-mail <b>{userInfo.email}</b>. После подтверждения оплаты войдите в приложение заново.
                </p>}
                extra={
                    <p>Не пришло письмо? Проверьте папку Спам.</p>
                }
            />
        </Modal>
    );
};
