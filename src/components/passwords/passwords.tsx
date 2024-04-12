import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { EValid } from '@constants/enums';
import { TValidChange } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changePasswords, changeValidStatus, selectLogin } from '@redux/login-slice';
import { checkValidChangePassword } from '@utils/auth-utils/check-valid-status';
import { Form, Input } from 'antd';

import 'antd/dist/antd.css';
import styles from './passwords.module.css';

export const Passwords: React.FC = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { password, confirmPassword } = useAppSelector(selectLogin);

    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (password === '' && confirmPassword === '') {
            setPasswords({
                password: '',
                confirmPassword: ''
            });
        }
    }, [password, confirmPassword]);

    const [validStatus, setValidStatus] = useState<TValidChange>({
        password: EValid.success,
        confirmPassword: EValid.success
    });

    useEffect(() => {
        dispatch(changePasswords(passwords));
        setValidStatus(prev => checkValidChangePassword(passwords, prev));
    }, [dispatch, passwords]);

    useEffect(() => {
        dispatch(changeValidStatus(validStatus));
    }, [dispatch, validStatus]);

    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswords(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const eyeIcon = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />);

    return (
        <div>
            <Form.Item
                help="Пароль не менее 8 символов, с заглавной буквой и цифрой"
                validateStatus={validStatus.password}
            >
                <Input.Password
                    className={styles['password-input']}
                    iconRender={eyeIcon}
                    type="password"
                    name="password"
                    placeholder={pathname === '/profile' ? 'Пароль' : 'Новый пароль'}
                    value={passwords.password}
                    onChange={handlePassword}
                    aria-invalid={validStatus.password === EValid.error ? true : undefined}
                    data-test-id={pathname === '/profile' ? 'profile-password' : 'change-password'}
                />
            </Form.Item>
            <Form.Item
                help={validStatus.confirmPassword === EValid.error && 'Пароли не совпадают'}
                validateStatus={validStatus.confirmPassword}
            >
                <Input.Password
                    className={styles['password-input']}
                    iconRender={eyeIcon}
                    type="password"
                    name="confirmPassword"
                    placeholder="Повторите пароль"
                    value={passwords.confirmPassword}
                    onChange={handlePassword}
                    aria-invalid={validStatus.confirmPassword === EValid.error ? true : undefined}
                    data-test-id={pathname === '/profile' ? 'profile-repeat-password' : 'change-confirm-password'}
                />
            </Form.Item>
        </div>
    );
};
