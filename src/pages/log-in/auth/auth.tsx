import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import '../modal.css';
import styles from './auth.module.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { checkEmail, googleAuth, login, register } from '../../../requests';
import { useNavigate } from 'react-router-dom';
import { changeLoginData, selectLogin } from '@redux/loginSlice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ROUTE } from '@route/routes';

type props = {
    isRegistration: boolean
}

export const Auth: React.FC<props> = ({ isRegistration }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isReg, setIsReg] = useState(isRegistration);
    const [formData, setFormData] = useState({
        isEmailValid: false,
        isPasswordValid: false,
        isPassword2Valid: false,
        ...useAppSelector(selectLogin)
    });
    useEffect(() => {
        dispatch(changeLoginData({
            email: formData.email,
            password: formData.password,
            password2: formData.password2,
            isRemember: formData.isRemember
        }));
    }, [dispatch, formData]);

    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {
        isReg ? setIsDisabled(!Object.values({...formData, isRemember: true}).every(el => el))
            : setIsDisabled(![formData.email, formData.password].every(el => el))
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
    }, [formData, isReg]);

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
            <div className={`${styles["auth-modal"]} modal`}>
                <div className={styles["auth-modal__logo"]}></div>
                <Form
                    name="normal_login"
                    className={`${styles["auth-modal__login-form"]} ${styles[isReg ? "registration" : ""]}`}
                    validateMessages={{ required: "" }}
                >
                    <Form.Item className={styles["login-form__form-select-buttons"]}>
                        <Button
                            type="text"
                            onClick={() => {
                                navigate(ROUTE.AUTH);
                                setIsReg(false);
                            }}
                            className={`${styles["text-button"]} ${styles[isReg ? "" : "active"]}`}
                        >
                            Вход
                        </Button>
                        <Button
                            type="text"
                            onClick={() => {
                                navigate(ROUTE.REGISTRATION);
                                setIsReg(true);
                            }}
                            className={`${styles["text-button"]} ${styles[isReg ? "active" : ""]}`}
                        >
                            Регистрация
                        </Button>
                    </Form.Item>
                    <Form.Item name="email" validateStatus={!validStatus.email ? "success" : "error"}>
                        <Input
                            className={styles["login-form__input"]}
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
                        help={isReg && <p className={styles[!validStatus.passwordHelp ? "normal" : "error"]}>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>}
                    >
                        <Input.Password
                            className={styles["login-form__input"]}
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
                        help={validStatus.password2Help && <p className={styles[!validStatus.password2Help ? "normal" : "error"]}>Пароли не совпадают</p>}
                    >
                        <Input.Password
                            className={styles["login-form__input"]}
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
                    {!isReg && <Form.Item className={styles["login-form__remember-group"]}>
                        <Form.Item className={styles["remember-group__checkbox"]} name="remember" valuePropName="checked" noStyle>
                            <Checkbox
                                className={styles["checkbox__label"]}
                                checked={formData.isRemember}
                                onChange={() => setFormData(prev => ({ ...prev, isRemember: !prev.isRemember }))}
                                data-test-id="login-remember"
                            >
                                Запомнить меня
                            </Checkbox>
                        </Form.Item>
                        <Button
                            className={styles["remember-group__link"]}
                            type="text"
                            htmlType="button"
                            onClick={() => formData.isEmailValid ? checkEmail(formData.email).then(navigate) : ""}
                            data-test-id="login-forgot-button"
                        >
                            Забыли пароль?
                        </Button>
                    </Form.Item>}
                    <Form.Item>
                        <Button
                            className={`${styles["login-form__button"]} ${styles["conf-button"]}`}
                            type="primary"
                            htmlType="submit"
                            disabled={isDisabled}
                            onClick={
                                isReg ? () => register(formData.email, formData.password).then(navigate)
                                    : () => {
                                        if (formData.isEmailValid && formData.isPasswordValid) login(formData.email, formData.password).then(navigate);
                                    }}
                            data-test-id={isReg ? "registration-submit-button" : "login-submit-button"}
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className={styles["login-form__button"]}
                            type="ghost"
                            htmlType="button"
                            onClick={() => googleAuth().then()}
                        >
                            <GooglePlusOutlined className={styles["login-form__button-icon"]} />{isReg ? "Регистрация" : "Войти"} через Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
