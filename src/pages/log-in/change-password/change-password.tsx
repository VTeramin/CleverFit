import React from 'react';
import "./change-password.css";
import 'antd/dist/antd.css';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export const ChangePassword: React.FC = () => {
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
                        rules={[{ required: true }]}
                    >
                        <Input.Password
                            className="change-modal__input"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Новый пароль"
                        />
                    </Form.Item>
                    <p className="change-modal__password-desc">Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
                    <Form.Item
                        name="password-repeat"
                        rules={[{ required: true }]}
                    >
                        <Input.Password
                            className="change-modal__input"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder="Повторите пароль"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button className="change-modal__button conf-button" type="primary" htmlType="submit">Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
