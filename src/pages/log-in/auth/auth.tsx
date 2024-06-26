import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { EROUTE, EValid } from '@constants/enums';
import { TValidAuth } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeLoginData, selectLogin } from '@redux/login-slice';
import { checkDisabledAuth, checkValidAuth, checkValidRegistraion } from '@utils/auth-utils/check-valid-status';
import { validEmail } from '@utils/auth-utils/valid-email';
import { validPassword } from '@utils/auth-utils/valid-password';
import { checkEmail } from '@utils/requests/auth/check-email';
import { googleAuth } from '@utils/requests/auth/google-auth';
import { login } from '@utils/requests/auth/login';
import { register } from '@utils/requests/auth/register';
import { Button, Checkbox, Form, Input } from 'antd';
import classNames from 'classnames';

import 'antd/dist/antd.css';
import '../modal.css';
import styles from './auth.module.css';

type TProps = {
    isRegistration: boolean
}

export const Auth: React.FC<TProps> = ({ isRegistration }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const formData = useAppSelector(selectLogin);

    const [isValid, setIsValid] = useState({
        email: true,
        password: true,
        confirmPassword: true
    });
    const [validStatus, setValidStatus] = useState<TValidAuth>({
        email: EValid.success,
        password: EValid.success,
        confirmPassword: EValid.success,
        passwordHelp: EValid.normal,
        confirmPasswordHelp: EValid.normal
    });
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setValidStatus(isRegistration ? checkValidAuth(isValid, formData) : checkValidRegistraion(isValid, formData));
        setIsDisabled(checkDisabledAuth(isRegistration, isValid, formData));
    }, [isRegistration, isValid, formData]);

    const handleEmailChange = (event: { target: HTMLInputElement }) => {
        dispatch(changeLoginData({ email: event.target.value }));
        setIsValid(prev => ({ ...prev, email: validEmail(event.target.value) }));
    }

    const handlePasswordChange = (event: { target: HTMLInputElement }) => {
        dispatch(changeLoginData({ password: event.target.value }));
        setIsValid(prev => ({
            ...prev,
            password: validPassword(event.target.value),
            pasword2: formData.confirmPassword === event.target.value
        }));
    }

    const handleConfirmPasswordChange = (event: { target: HTMLInputElement }) => {
        dispatch(changeLoginData({ confirmPassword: event.target.value }));
        setIsValid(prev => ({ ...prev, pasword2: formData.password === event.target.value }))
    }

    const handleCheckboxChange = (event: { target: { checked: boolean } }) => {
        dispatch(changeLoginData({ isRemember: event.target.checked }));
    }

    const handleForgetClick = () => {
        if (isValid.email && formData.email !== '') dispatch(checkEmail()).then(navigate);
    }

    const handleLoginButton = () => {
        if (isRegistration) {
            dispatch(register()).then(navigate);
        } else if (isValid.email && isValid.password) dispatch(login()).then(navigate);
    }

    const eyeRender = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />);

    const help = {
        password: isRegistration && <p className={styles[validStatus.passwordHelp]}>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>,
        confirmPassword: validStatus.confirmPasswordHelp === EValid.error && <p className={styles[validStatus.confirmPasswordHelp]}>Пароли не совпадают</p>
    }

    return (
        <div className="modal-wrapper">
            <div className={classNames(styles['auth-modal'], 'modal')}>
                <div className={styles['auth-modal__logo']} />
                <Form
                    name="normal_login"
                    className={classNames(styles['auth-modal__login-form'], { [styles.registration]: isRegistration })}
                    validateMessages={{ required: '' }}
                >
                    <Form.Item className={styles['login-form__form-select-buttons']}>
                        <Button
                            type="text"
                            onClick={() => navigate(EROUTE.AUTH)}
                            className={classNames(styles['text-button'], { [styles.active]: !isRegistration })}
                        >
                            Вход
                        </Button>
                        <Button
                            type="text"
                            onClick={() => navigate(EROUTE.REGISTRATION)}
                            className={classNames(styles['text-button'], { [styles.active]: isRegistration })}
                        >
                            Регистрация
                        </Button>
                    </Form.Item>
                    <Form.Item name="email" validateStatus={validStatus.email}>
                        <Input
                            className={styles['login-form__input']}
                            addonBefore="e-mail:"
                            type="email"
                            value={formData.email}
                            onChange={handleEmailChange}
                            data-test-id={isRegistration ? 'registration-email' : 'login-email'}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        validateStatus={validStatus.password}
                        help={help.password}
                    >
                        <Input.Password
                            className={styles['login-form__input']}
                            iconRender={eyeRender}
                            type="password"
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={handlePasswordChange}
                            data-test-id={isRegistration ? 'registration-password' : 'login-password'}
                        />
                    </Form.Item>
                    {isRegistration &&
                        <Form.Item
                            name="password-repeat"
                            validateStatus={validStatus.confirmPassword}
                            help={help.confirmPassword}
                        >
                            <Input.Password
                                className={styles['login-form__input']}
                                iconRender={eyeRender}
                                type="password"
                                placeholder="Повторите пароль"
                                value={formData.confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                data-test-id="registration-confirm-password"
                            />
                        </Form.Item>}
                    {!isRegistration &&
                        <Form.Item className={styles['login-form__remember-group']}>
                            <Form.Item className={styles['remember-group__checkbox']} name="remember" valuePropName="checked" noStyle={true}>
                                <Checkbox
                                    className={styles.checkbox__label}
                                    defaultChecked={formData.isRemember}
                                    checked={formData.isRemember}
                                    onChange={handleCheckboxChange}
                                    data-test-id="login-remember"
                                >
                                    Запомнить меня
                                </Checkbox>
                            </Form.Item>
                            <Button
                                className={styles['remember-group__link']}
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
                            className={classNames(styles['login-form__button'], styles['conf-button'])}
                            type="primary"
                            htmlType="submit"
                            disabled={isDisabled}
                            onClick={handleLoginButton}
                            data-test-id={isRegistration ? 'registration-submit-button' : 'login-submit-button'}
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className={styles['login-form__button']}
                            type="ghost"
                            htmlType="button"
                            onClick={() => dispatch(googleAuth())}
                        >
                            <GooglePlusOutlined className={styles['login-form__button-icon']} />{isRegistration ? 'Регистрация' : 'Войти'} через Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
