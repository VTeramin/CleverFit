import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { EValid } from '@constants/enums';
import { TValidChange } from '@constants/types';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { changePasswords, changeValidStatus } from '@redux/login-slice';
import { checkValidChangePassword } from '@utils/auth-utils/check-valid-status';
import { Form, Input } from 'antd';

import 'antd/dist/antd.css';
import styles from './passwords.module.css';

export const Passwords: React.FC = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });

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

    function handlePassword(event: ChangeEvent<HTMLInputElement>) {
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
                    onChange={event => handlePassword(event)}
                    data-test-id="change-password"
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
                    onChange={event => handlePassword(event)}
                    data-test-id="change-confirm-password"
                />
            </Form.Item>
        </div>
    );
};
