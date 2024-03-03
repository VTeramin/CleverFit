import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import '../modal.css';
import styles from './change-password.module.css';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { changePassword } from '@utils/requests';
import { useNavigate } from 'react-router-dom';
import { changePasswords } from '@redux/loginSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

export const ChangePassword: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: "",
        isPassValid: false,
        isConfPassValid: false
    });
    useEffect(() => {
        dispatch(changePasswords({
            password: passwords.password,
            password2: passwords.confirmPassword
        }));
    }, [dispatch, passwords]);

    const [validStatus, setValidStatus] = useState({
        password: true,
        confirmPassword: true
    });
    useEffect(() => {
        setValidStatus(() => {
                return {
                    password: passwords.isPassValid || passwords.password === "",
                    confirmPassword: passwords.isConfPassValid || (!passwords.isPassValid && passwords.confirmPassword === "")
                }
            })
    }, [passwords])

    function validPassword(password: string): boolean {
        const pattern = /^(?=.*[A-ZА-ЯЁ])(?=.*\d)[а-яА-ЯёЁa-zA-Z\d\W]{8,}$/;
        return pattern.test(password);
    }

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
                        name="password"
                        help="Пароль не менее 8 символов, с заглавной буквой и цифрой"
                        validateStatus={validStatus.password ? "success" : "error"}
                    >
                        <Input.Password
                            className={styles["change-modal__input"]}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Новый пароль"
                            value={passwords.password}
                            onChange={event => setPasswords(prev => ({
                                ...prev,
                                password: event.target.value,
                                isPassValid: validPassword(event.target.value)
                            }))}
                            data-test-id="change-password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password-repeat"
                        help={!validStatus.confirmPassword && "Пароли не совпадают"}
                        validateStatus={validStatus.confirmPassword ? "success" : "error"}
                    >
                        <Input.Password
                            className={styles["change-modal__input"]}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Повторите пароль"
                            value={passwords.confirmPassword}
                            onChange={event => setPasswords(prev => ({
                                ...prev,
                                confirmPassword: event.target.value,
                                isConfPassValid: passwords.password === event.target.value
                            }))}
                            data-test-id="change-confirm-password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className={styles["change-modal__button"]}
                            type="primary"
                            htmlType="submit"
                            disabled={!Object.values(validStatus).every(el => el === true) || passwords.password === "" || passwords.confirmPassword === ""}
                            onClick={() => dispatch(changePassword()).then(navigate)}
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
