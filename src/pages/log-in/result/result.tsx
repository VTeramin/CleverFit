import React, { ReactElement } from 'react';
import "./result.css"
import { WarningFilled, CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { changePassword, checkEmail } from '../../../requests';
import { store } from '@redux/configure-store';

interface props {
    resultType: string
}

interface inputs {
    [key: string]: {
        icon: ReactElement,
        title: string,
        subtitle: string,
        button: ReactElement
    }
}

export const Result: React.FC<props> = ({ resultType }) => {
    const navigate = useNavigate();

    const inputs: inputs = {
        errorLogin: {
            icon: <div className="result-modal__icon-wrapper">
                <WarningFilled className="result-modal__icon" style={{ color: "var(--character-light-warning)" }} />
            </div>,
            title: "Вход не выполнен",
            subtitle: "Что-то пошло не так. Попробуйте еще раз",
            button: <Button className="result-modal__button conf-button" onClick={() => navigate("/auth")}>Повторить</Button>
        },
        errorUserExist: {
            icon: <div className="result-modal__icon-wrapper">
                <CloseCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Данные не сохранились",
            subtitle: "Такой e-mail уже записан в системе. Попробуйте\u000Aзарегистрироваться по другому e\u2011mail.",
            button: <Button className="result-modal__button conf-button" onClick={() => navigate("/auth/registration")}>Назад к регистрации</Button>
        },
        error: {
            icon: <div className="result-modal__icon-wrapper">
                <CloseCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Данные не сохранились",
            subtitle: "Что-то пошло не так и ваша регистрация не\u00A0завершилась. Попробуйте ещё раз.",
            button: <Button className="result-modal__button conf-button" onClick={() => {
                navigate("/auth/registration");
                checkEmail(store.getState().form.email);
            }}>Повторить</Button>
        },
        success: {
            icon: <div className="result-modal__icon-wrapper">
                <CheckCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-success)" }} />
            </div>,
            title: "Регистрация успешна",
            subtitle: "Регистрация прошла успешно. Зайдите\u000Aв приложение, используя свои e\u2011mail и пароль.",
            button: <Button className="result-modal__button conf-button" onClick={() => navigate("/main")}>Войти</Button>
        },
        errorCheckEmailNoExist: {
            icon: <div className="result-modal__icon-wrapper" style={{ marginTop: "32px" }}>
                <CloseCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Такой e-mail не зарегистрирован",
            subtitle: "Мы не нашли в базе вашего e-mail. Попробуйте\u000Aвойти с другим e-mail.",
            button: <Button className="result-modal__button conf-button medium margin" onClick={() => navigate("/auth")}>Попробовать снова</Button>
        },
        successChangePassword: {
            icon: <div className="result-modal__icon-wrapper">
                <CheckCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-success)" }} />
            </div>,
            title: "Пароль успешно изменен",
            subtitle: "Теперь можно войти в аккаунт, используя\u000Aсвой логин и новый пароль",
            button: <Button className="result-modal__button conf-button margin margin-shrink" onClick={() => navigate("/auth")}>Вход</Button>
        },
        errorChangePassword: {
            icon: <div className="result-modal__icon-wrapper">
                <CloseCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Данные не сохранились",
            subtitle: "Что-то пошло не так. Попробуйте еще раз",
            button: <Button className="result-modal__button conf-button margin margin-shrink" onClick={() => {
                navigate("/auth/change-password");
                changePassword(store.getState().form.password, store.getState().form.password2);
            }}>Повторить</Button>
        },
        errorCheckEmail: {
            icon: <div className="result-modal__image"></div>,
            title: "Что-то пошло не так",
            subtitle: "Произошла ошибка, попробуйте отправить форму ещё раз.",
            button: <Button className="result-modal__button conf-button small margin margin-shrink" onClick={() => navigate("/auth")}>Назад</Button>
        }
    };

    return (
        <div className="modal-wrapper">
            <div className="result-modal modal">
                {inputs[resultType].icon}
                <div className="result-modal__text-wrapper">
                    <p className="result-modal__title">{inputs[resultType].title}</p>
                    <p className="result-modal__subtitle">{inputs[resultType].subtitle}</p>
                </div>
                {inputs[resultType].button}
            </div>
        </div>
    );
};
