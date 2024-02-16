import React, { useState } from 'react';
import "./change-password.css";
import 'antd/dist/antd.css';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { changePassword } from '../../../requests';
import { useNavigate } from 'react-router-dom';

export const ChangePassword: React.FC = () => {
    const navigate = useNavigate();

    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: "",
        isPassValid: false,
        isConfPassValid: false
    });
    function validPassword(password: string): boolean {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
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
                        validateStatus={passwords.isPassValid || !passwords.password ? "success" : "error"}
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
                        validateStatus={passwords.isConfPassValid || !passwords.confirmPassword ? "success" : "error"}
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
                            onClick={() => {
                                if(Object.values(passwords).some(el => el === true)) {
                                    changePassword(passwords.password, passwords.confirmPassword).then(navigate)
                                }
                            }}
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
