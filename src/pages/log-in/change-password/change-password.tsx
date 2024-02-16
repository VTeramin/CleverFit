import React, { useEffect, useState } from 'react';
import "./change-password.css";
import 'antd/dist/antd.css';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { changePassword } from '../../../requests';
import { useNavigate } from 'react-router-dom';
import { store } from '@redux/configure-store';
import { changeFormData } from '@redux/formDataSlice';

export const ChangePassword: React.FC = () => {
    const navigate = useNavigate();

    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: "",
        isPassValid: false,
        isConfPassValid: false
    });
    useEffect(() => {
        store.dispatch(changeFormData({
            ...store.getState().form,
            password: passwords.password,
            password2: passwords.confirmPassword
        }));
    }, [passwords]);

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
            <div className="change-modal modal">
                <p className="change-modal__title">Восстановление аккаунта</p>
                <Form
                    name="normal_login"
                    className="change-modal__form"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="password"
                        help="Пароль не менее 8 символов, с заглавной буквой и цифрой"
                        validateStatus={validStatus.password ? "success" : "error"}
                    >
                        <Input.Password
                            className="change-modal__input"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Новый пароль"
                            value={passwords.password}
                            onChange={event => setPasswords(prev => ({
                                ...prev,
                                password: event.target.value,
                                isPassValid: validPassword(event.target.value)
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password-repeat"
                        help={!validStatus.confirmPassword && "Пароли не совпадают"}
                        validateStatus={validStatus.confirmPassword ? "success" : "error"}
                    >
                        <Input.Password
                            className="change-modal__input"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Повторите пароль"
                            value={passwords.confirmPassword}
                            onChange={event => setPasswords(prev => ({
                                ...prev,
                                confirmPassword: event.target.value,
                                isConfPassValid: passwords.password === event.target.value
                            }))}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className="change-modal__button conf-button"
                            type="primary"
                            htmlType="submit"
                            disabled={!Object.values(validStatus).every(el => el === true) || passwords.password === "" || passwords.confirmPassword === ""}
                            onClick={() => { changePassword(passwords.password, passwords.confirmPassword).then(navigate) }}
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
