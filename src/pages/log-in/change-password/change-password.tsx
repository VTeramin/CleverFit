import React, { ChangeEvent, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import '../modal.css';
import styles from './change-password.module.css';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { changePasswords } from '@redux/loginSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { checkDisabledChangePassword, checkValidChangePassword } from '@utils/auth-utils/check-valid-status';
import { validChange } from '@constants/types';
import { changePassword } from '@utils/requests/change-password';

export const ChangePassword: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [passwords, setPasswords] = useState({
        password: "",
        password2: ""
    });

    const [validStatus, setValidStatus] = useState<validChange>({
        password: "success",
        password2: "success"
    });

    useEffect(() => {
        dispatch(changePasswords(passwords));
        setValidStatus(prev => checkValidChangePassword(passwords, prev));
    }, [dispatch, passwords]);

    function handlePassword(event: ChangeEvent<HTMLInputElement>) {
        setPasswords(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    function handleSubmit() {
        dispatch(changePassword()).then(navigate);
    }

    const eyeIcon = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />);

    return (
        <div className="modal-wrapper">
            <div className={`${styles["change-modal"]} modal`}>
                <p className={styles["change-modal__title"]}>Восстановление аккаунта</p>
                <Form
                    name="normal_login"
                    className={styles["change-modal__form"]}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        help="Пароль не менее 8 символов, с заглавной буквой и цифрой"
                        validateStatus={validStatus.password}
                    >
                        <Input.Password
                            className={styles["change-modal__input"]}
                            iconRender={eyeIcon}
                            type="password"
                            name="password"
                            placeholder="Новый пароль"
                            value={passwords.password}
                            onChange={handlePassword}
                            data-test-id="change-password"
                        />
                    </Form.Item>
                    <Form.Item
                        help={validStatus.password2 === "error" && "Пароли не совпадают"}
                        validateStatus={validStatus.password2}
                    >
                        <Input.Password
                            className={styles["change-modal__input"]}
                            iconRender={eyeIcon}
                            type="password"
                            name="password2"
                            placeholder="Повторите пароль"
                            value={passwords.password2}
                            onChange={handlePassword}
                            data-test-id="change-confirm-password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className={styles["change-modal__button"]}
                            type="primary"
                            htmlType="submit"
                            disabled={checkDisabledChangePassword(passwords, validStatus)}
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
