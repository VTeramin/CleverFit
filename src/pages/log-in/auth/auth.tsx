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

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password2: "",
        isEmailValid: false,
        isPasswordValid: false,
        isPassword2Valid: false,
        isRemember: true
    });
    useEffect(() => {
        store.dispatch(changeFormData(formData));
    }, [formData]);

    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {
        isReg ? setIsDisabled(!Object.values(formData).every(el => el))
            : setIsDisabled(![
                formData.email,
                formData.isEmailValid,
                formData.password,
                formData.isPasswordValid
            ].every(el => el))
    }, [formData, isReg]);

    const [validStatus, setValidStatus] = useState({
        email: true,
        password: true,
        password2: true,
        passwordHelp: true,
        password2Help: true
    });
    useEffect(() => {
        setValidStatus(() => {
            if (isReg) {
                return {
                    email: (!formData.isEmailValid && formData.email !== "") || (formData.isPassword2Valid && !formData.email),
                    password: (!formData.isPasswordValid && formData.password !== "") || (formData.isEmailValid && !formData.password),
                    password2: (!formData.isPassword2Valid && formData.password2 !== "") || (formData.isPasswordValid && !formData.isPassword2Valid) || (formData.isEmailValid && !formData.password2),
                    passwordHelp: (!formData.isPasswordValid && formData.password !== ""),
                    password2Help: (!formData.isPassword2Valid && formData.password2 !== "")
                }
            } else {
                return {
                    email: (!formData.isEmailValid && formData.email !== "") || (formData.isPasswordValid && formData.password !== "" && formData.email === ""),
                    password: !formData.isPasswordValid && formData.password !== "",
                    password2: true,
                    passwordHelp: true,
                    password2Help: true
                }
            }
        })
    }, [formData, isReg])

    function validEmail(email: string): boolean {
        const pattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
        return pattern.test(email);
    }
    function validPassword(password: string): boolean {
        const pattern = /^(?=.*[A-ZА-ЯЁ])(?=.*\d)[а-яА-ЯёЁa-zA-Z\d\W]{8,}$/;
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
                                setIsReg(false);
                            }}
                            className={`text-button ${!isReg && "active"}`}
                        >
                            Вход
                        </Button>
                        <Button
                            type="text"
                            onClick={() => {
                                navigate("/auth/registration");
                                setIsReg(true);
                            }}
                            className={`text-button ${isReg && "active"}`}
                        >
                            Регистрация
                        </Button>
                    </Form.Item>
                    <Form.Item name="email" validateStatus={!validStatus.email ? "success" : "error"}>
                        <Input
                            className="login-form__input"
                            addonBefore="e-mail:"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                email: e.target.value,
                                isEmailValid: validEmail(e.target.value)
                            }))}
                            data-test-id={isReg ? "registration-email" : "login-email"}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        validateStatus={!validStatus.password ? "success" : "error"}
                        help={isReg && <p className={!validStatus.passwordHelp ? "normal" : "error"}>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>}
                    >
                        <Input.Password
                            className="login-form__input"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                password: e.target.value,
                                isPasswordValid: validPassword(e.target.value),
                                isPassword2Valid: formData.password2 === e.target.value
                            }))}
                            data-test-id={isReg ? "registration-password" : "login-password"}
                        />
                    </Form.Item>
                    {isReg && <Form.Item
                        name="password-repeat"
                        validateStatus={!validStatus.password2 ? "success" : "error"}
                        help={validStatus.password2Help && <p className={!validStatus.password2Help ? "normal" : "error"}>Пароли не совпадают</p>}
                    >
                        <Input.Password
                            className="login-form__input"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Повторите пароль"
                            value={formData.password2}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                password2: e.target.value,
                                isPassword2Valid: formData.password === e.target.value
                            }))}
                            data-test-id="registration-confirm-password"
                        />
                    </Form.Item>}
                    {!isReg && <Form.Item className="login-form__remember-group">
                        <Form.Item className="remember-group__checkbox" name="remember" valuePropName="checked" noStyle>
                            <Checkbox
                                className="checkbox__label"
                                value={formData.isRemember}
                                onClick={() => setFormData(prev => ({ ...prev, isRemember: !prev.isRemember }))}
                                data-test-id="login-remember"
                            >
                                Запомнить меня
                            </Checkbox>
                        </Form.Item>
                        <Button
                            className="remember-group__link text-button"
                            type="text"
                            htmlType="button"
                            disabled={!formData.isEmailValid}
                            onClick={() => checkEmail(formData.email).then(navigate)}
                            data-test-id="login-forgot-button"
                        >
                            Забыли пароль?
                        </Button>
                    </Form.Item>}
                    <Form.Item>
                        <Button
                            className="login-form__button conf-button"
                            type="primary"
                            htmlType="submit"
                            disabled={isDisabled}
                            onClick={
                                isReg ? () => register(formData.email, formData.password).then(navigate)
                                    : () => login(formData.email, formData.password).then(navigate)}
                            data-test-id={isReg ? "registration-submit-button" : "login-submit-button"}
                        >
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
