import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Passwords } from '@components/passwords/passwords';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectLogin } from '@redux/login-slice';
import { checkDisabledChangePassword } from '@utils/auth-utils/check-valid-status';
import { changePassword } from '@utils/requests/auth/change-password';
import { Button, Form } from 'antd';

import 'antd/dist/antd.css';
import '../modal.css';
import styles from './change-password.module.css';

export const ChangePassword: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { password, confirmPassword, valid } = useAppSelector(selectLogin);
    const isSubmitDisabled = checkDisabledChangePassword({ password, confirmPassword }, valid);

    const handleSubmit = () => {
        dispatch(changePassword()).then(navigate);
    }

    return (
        <div className="modal-wrapper">
            <div className={`${styles['change-modal']} modal`}>
                <p className={styles['change-modal__title']}>Восстановление аккаунта</p>
                <Form
                    name="normal_login"
                    className={styles['change-modal__form']}
                    initialValues={{ remember: true }}
                >
                    <Passwords />
                    <Form.Item>
                        <Button
                            className={styles['change-modal__button']}
                            type="primary"
                            htmlType="submit"
                            disabled={isSubmitDisabled}
                            onClick={handleSubmit}
                            data-test-id="change-submit-button"
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
