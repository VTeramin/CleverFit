import React, { useState } from 'react';
import 'antd/dist/antd.css';
import "./auth.css"
import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

export const Auth: React.FC = () => {
    const [isReg, setIsReg] = useState(false);
    const toggleReg = () => setIsReg(!isReg);

    return (
        <div className="modal-wrapper">
            <div className="auth-modal modal">
                <div className="auth-modal__logo"></div>
                <Form
                    name="normal_login"
                    className="auth-modal__login-form"
                    initialValues={{ remember: true }}
                    style={{ marginBottom: `${isReg ? "60px" : "110px"}`}}
                >
                    <Form.Item className="login-form__form-select-buttons" style={{ marginBottom: `${isReg ? "32px" : "24px"}`}}>
                        <Button type="text" onClick={toggleReg} className={`text-button ${!isReg && "active"}`}>Вход</Button>
                        <Button type="text" onClick={toggleReg} className={`text-button ${isReg && "active"}`}>Регистрация</Button>
                    </Form.Item>
                    <Form.Item name="email" rules={[{ required: true }]}>
                        <Input className="login-form__input" addonBefore="e-mail:" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true }]}>
                        <Input.Password
                            className="login-form__input"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Пароль"
                        />
                    </Form.Item>
                    {isReg && <p className="login-form__password-desc">Пароль не менее 8 символов, с заглавной буквой и цифрой</p>}
                    {isReg && <Form.Item name="password-repeat" rules={[{ required: true }]}>
                        <Input.Password
                            className="login-form__input"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Повторите пароль"
                            style={{ marginBottom: `${isReg ? "62px" : "32px"}`}}
                        />
                    </Form.Item>}
                    {!isReg && <Form.Item className="login-form__remember-group">
                        <Form.Item className="remember-group__checkbox" name="remember" valuePropName="checked" noStyle>
                            <Checkbox className="checkbox__label">Запомнить меня</Checkbox>
                        </Form.Item>
                        <a className="remember-group__link" href="">Забыли пароль?</a>
                    </Form.Item>}
                    <Form.Item>
                        <Button className="login-form__button conf-button"  type="primary" htmlType="submit">Войти</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button className="login-form__button" type="ghost" htmlType="button"><GooglePlusOutlined />{isReg ? "Регистрация" : "Войти"} через Google</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
