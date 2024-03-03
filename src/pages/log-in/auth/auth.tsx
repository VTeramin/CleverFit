import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import '../modal.css';
import styles from './auth.module.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { checkEmail, googleAuth, login, register } from '@utils/requests';
import { useNavigate } from 'react-router-dom';
import { changeLoginData, selectLogin } from '@redux/loginSlice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ROUTE } from '@route/routes';

type props = {
    isRegistration: boolean
}

type valid = {
    email: "error" | "success",
    password: "error" | "success",
    password2: "error" | "success",
    passwordHelp: "error" | "normal",
    password2Help: "error" | "normal"
}

export const Auth: React.FC<props> = ({ isRegistration }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const formData = useAppSelector(selectLogin);

    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {
        isRegistration ? setIsDisabled(!Object.values({ ...formData, isRemember: true }).every(el => el))
            : setIsDisabled(![formData.email, formData.password].every(el => el))
    }, [formData, isRegistration]);

    const [isValid, setIsValid] = useState({
        email: false,
        password: false,
        pasword2: false
    });
    const [validStatus, setValidStatus] = useState<valid>({
        email: "success",
        password: "success",
        password2: "success",
        passwordHelp: "normal",
        password2Help: "normal"
    });
    useEffect(() => {
        setValidStatus(() => {
            if (isRegistration) {
                return {
                    email: (!isValid.email && formData.email !== "") || (isValid.pasword2 && !formData.email) ? "error" : "success",
                    password: (!isValid.password && formData.password !== "") || (isValid.email && !formData.password) ? "error" : "success",
                    password2: (!isValid.pasword2 && formData.password2 !== "") || (isValid.password && !isValid.pasword2) || (isValid.email && !formData.password2) ? "error" : "success",
                    passwordHelp: (!isValid.password && formData.password !== "") ? "error" : "normal",
                    password2Help: (!isValid.pasword2 && formData.password2 !== "") ? "error" : "normal"
                }
            } else {
                return {
                    email: (!isValid.email && formData.email !== "") || (isValid.password && formData.password !== "" && formData.email === "") ? "error" : "success",
                    password: !isValid.password && formData.password !== "" ? "error" : "success",
                    password2: "success",
                    passwordHelp: "normal",
                    password2Help: "normal"
                }
            }
        });
    }, [isValid, formData, isRegistration]);

    function handleEmailChange(event: { target: HTMLInputElement }) {
        function validEmail(email: string): boolean {
            const pattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
            return pattern.test(email);
        }
        dispatch(changeLoginData({ email: event.target.value }));
        setIsValid(prev => ({ ...prev, email: validEmail(event.target.value) }));
    }

    function handlePasswordChange(event: { target: HTMLInputElement }) {
        function validPassword(password: string): boolean {
            const pattern = /^(?=.*[A-ZА-ЯЁ])(?=.*\d)[а-яА-ЯёЁa-zA-Z\d\W]{8,}$/;
            return pattern.test(password);
        }
        dispatch(changeLoginData({ password: event.target.value }));
        setIsValid(prev => ({
            ...prev,
            password: validPassword(event.target.value),
            pasword2: formData.password2 === event.target.value
        }));
    }

    function handlePassword2Change(event: { target: HTMLInputElement }) {
        dispatch(changeLoginData({ password2: event.target.value }));
        setIsValid(prev => ({ ...prev, pasword2: formData.password === event.target.value }))
    }

    function handleCheckboxChange() {
        dispatch(changeLoginData({ isRemember: !formData.isRemember }));
    }

    function handleForgetClick() {
        if (isValid.email) dispatch(checkEmail()).then(navigate);
    }

    function handleLogin() {
        if (isRegistration) {
            dispatch(register()).then(navigate);
        } else {
            if (isValid.email && isValid.password) dispatch(login()).then(navigate);
        }
    }

    const eyeRender = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />);

    const help = {
        password: isRegistration && <p className={styles[validStatus.passwordHelp]}>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>,
        password2: validStatus.password2Help === "error" && <p className={styles[validStatus.password2Help]}>Пароли не совпадают</p>
    }

    return (
        <div className="modal-wrapper">
            <div className={`${styles["auth-modal"]} modal`}>
                <div className={styles["auth-modal__logo"]}></div>
                <Form
                    name="normal_login"
                    className={`${styles["auth-modal__login-form"]} ${isRegistration && styles["registration"]}`}
                    validateMessages={{ required: "" }}
                >
                    <Form.Item className={styles["login-form__form-select-buttons"]}>
                        <Button
                            type="text"
                            onClick={() => navigate(ROUTE.AUTH)}
                            className={`${styles["text-button"]} ${!isRegistration && styles["active"]}`}
                        >
                            Вход
                        </Button>
                        <Button
                            type="text"
                            onClick={() => navigate(ROUTE.REGISTRATION)}
                            className={`${styles["text-button"]} ${isRegistration && styles["active"]}`}
                        >
                            Регистрация
                        </Button>
                    </Form.Item>
                    <Form.Item name="email" validateStatus={validStatus.email}>
                        <Input
                            className={styles["login-form__input"]}
                            addonBefore="e-mail:"
                            type="email"
                            value={formData.email}
                            onChange={handleEmailChange}
                            data-test-id={isRegistration ? "registration-email" : "login-email"}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        validateStatus={validStatus.password}
                        help={help.password}
                    >
                        <Input.Password
                            className={styles["login-form__input"]}
                            iconRender={eyeRender}
                            type="password"
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={handlePasswordChange}
                            data-test-id={isRegistration ? "registration-password" : "login-password"}
                        />
                    </Form.Item>
                    {isRegistration &&
                        <Form.Item
                            name="password-repeat"
                            validateStatus={validStatus.password2}
                            help={help.password2}
                        >
                            <Input.Password
                                className={styles["login-form__input"]}
                                iconRender={eyeRender}
                                type="password"
                                placeholder="Повторите пароль"
                                value={formData.password2}
                                onChange={handlePassword2Change}
                                data-test-id="registration-confirm-password"
                            />
                        </Form.Item>}
                    {!isRegistration &&
                        <Form.Item className={styles["login-form__remember-group"]}>
                            <Form.Item className={styles["remember-group__checkbox"]} name="remember" valuePropName="checked" noStyle>
                                <Checkbox
                                    className={styles["checkbox__label"]}
                                    checked={formData.isRemember}
                                    onChange={handleCheckboxChange}
                                    data-test-id="login-remember"
                                >
                                    Запомнить меня
                                </Checkbox>
                            </Form.Item>
                            <Button
                                className={styles["remember-group__link"]}
                                type="text"
                                htmlType="button"
                                onClick={handleForgetClick}
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
                            onClick={handleLogin}
                            data-test-id={isRegistration ? "registration-submit-button" : "login-submit-button"}
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className={styles["login-form__button"]}
                            type="ghost"
                            htmlType="button"
                            onClick={() => dispatch(googleAuth())}
                        >
                            <GooglePlusOutlined className={styles["login-form__button-icon"]} />{isRegistration ? "Регистрация" : "Войти"} через Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
