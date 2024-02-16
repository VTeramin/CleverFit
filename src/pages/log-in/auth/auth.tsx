import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import "./auth.css"
import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { checkEmail, login, register } from '../../../requests';
import { useNavigate } from 'react-router-dom';
import { store } from '@redux/configure-store';
import { changeFormData } from '@redux/formDataSlice';

interface props {
    isRegistration: boolean
}

export const Auth: React.FC<props> = ({ isRegistration }) => {
    const navigate = useNavigate();

    const [isReg, setIsReg] = useState(isRegistration);

    const [formData, setFormData] = useState(store.getState().form);
    useEffect(() => {
        store.dispatch(changeFormData(formData));
    }, [formData]);

    function validEmail(email: string): boolean {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    function validPassword(password: string): boolean {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return pattern.test(password);
    }

    return (
        <div className="modal-wrapper">
            <div className="auth-modal modal">
                <div className="auth-modal__logo"></div>
                <Form
                    name="normal_login"
                    className={`auth-modal__login-form ${isReg ? "registration" : ""}`}
                    initialValues={{ remember: true }}
                    validateMessages={{ required: "" }}
                >
                    <Form.Item className="login-form__form-select-buttons" style={{ marginBottom: `${isReg ? "32px" : "24px"}` }}>
                        <Button
                            type="text"
                            onClick={() => {
                                navigate("/auth");
                                setIsReg(!isReg);
                            }}
                            className={`text-button ${!isReg && "active"}`}
                        >
                            Вход
                        </Button>
                        <Button
                            type="text"
                            onClick={() => {
                                navigate("/auth/registration");
                                setIsReg(!isReg);
                            }}
                            className={`text-button ${isReg && "active"}`}
                        >
                            Регистрация
                        </Button>
                    </Form.Item>
                    <Form.Item name="email" rules={[{ required: true }]}>
                        <Input
                            className={`login-form__input ${formData.isEmailValid ? "" : "warning"}`}
                            addonBefore="e-mail:"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                email: e.target.value,
                                isEmailValid: validEmail(e.target.value)
                            }))}
                            status={formData.isEmailValid ? "" : "error"}
                        />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true }]}>
                        <Input.Password
                            className={`login-form__input ${formData.isPasswordValid ? "" : "warning"}`}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                password: e.target.value,
                                isPasswordValid: validPassword(e.target.value)
                            }))}
                        />
                    </Form.Item>
                    {isReg && <p className="login-form__password-desc">Пароль не менее 8 символов, с заглавной буквой и цифрой</p>}
                    {isReg && <Form.Item name="password-repeat" rules={[{ required: true }]}>
                        <Input.Password
                            className={`login-form__input ${formData.isPassword2Valid ? "" : "warning"}`}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Повторите пароль"
                            style={{ marginBottom: `${isReg ? "62px" : "32px"}` }}
                            value={formData.password2}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                password2: e.target.value,
                                isPassword2Valid: formData.password === e.target.value
                            }))}
                        />
                    </Form.Item>}
                    {!isReg && <Form.Item className="login-form__remember-group">
                        <Form.Item className="remember-group__checkbox" name="remember" valuePropName="checked" noStyle>
                            <Checkbox className="checkbox__label">Запомнить меня</Checkbox>
                        </Form.Item>
                        <Button
                            className="remember-group__link text-button"
                            type="text"
                            htmlType="button"
                            disabled={!formData.isEmailValid}
                            onClick={() => checkEmail(formData.email).then(navigate)}
                        >
                            Забыли пароль?
                        </Button>
                    </Form.Item>}
                    <Form.Item>
                        <Button className="login-form__button conf-button" type="primary" htmlType="submit" onClick={
                            isReg ? () => register(formData.email, formData.password).then(navigate)
                                : () => login(formData.email, formData.password).then(navigate)
                        }>
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button className="login-form__button" type="ghost" htmlType="button">
                            <GooglePlusOutlined className="login-form__button-icon" />{isReg ? "Регистрация" : "Войти"} через Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
