import React, { ReactElement } from 'react';
import "./result.css"
import { WarningFilled, CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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
            button: <button className="result-modal__button conf-button" onClick={() => navigate("/auth")}>Повторить</button>
        },
        errorUserExist: {
            icon: <div className="result-modal__icon-wrapper">
                <CloseCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Данные не сохранились",
            subtitle: "Такой e-mail уже записан в системе. Попробуйте\u000Aзарегистрироваться по другому e\u2011mail.",
            button: <button className="result-modal__button conf-button" onClick={() => navigate("/auth/registration")}>Назад к регистрации</button>
        },
        error: {
            icon: <div className="result-modal__icon-wrapper">
                <CloseCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Данные не сохранились",
            subtitle: "Что-то пошло не так и ваша регистрация не\u00A0завершилась. Попробуйте ещё раз.",
            button: <button className="result-modal__button conf-button" onClick={() => navigate("/auth/registration")}>Повторить</button>
        },
        success: {
            icon: <div className="result-modal__icon-wrapper">
                <CheckCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-success)" }} />
            </div>,
            title: "Регистрация успешна",
            subtitle: "Регистрация прошла успешно. Зайдите\u000Aв приложение, используя свои e\u2011mail и пароль.",
            button: <button className="result-modal__button conf-button" onClick={() => navigate("/main")}>Войти</button>
        },
        errorCheckEmailNoExist: {
            icon: <div className="result-modal__icon-wrapper" style={{ marginTop: "32px" }}>
                <CloseCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Такой e-mail не зарегистрирован",
            subtitle: "Мы не нашли в базе вашего e-mail. Попробуйте\u000Aвойти с другим e-mail.",
            button: <button className="result-modal__button conf-button medium margin" onClick={() => navigate("/auth")}>Попробовать снова</button>
        },
        successChangePassword: {
            icon: <div className="result-modal__icon-wrapper">
                <CheckCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-success)" }} />
            </div>,
            title: "Пароль успешно изменен",
            subtitle: "Теперь можно войти в аккаунт, используя\u000Aсвой логин и новый пароль",
            button: <button className="result-modal__button conf-button margin margin-shrink" onClick={() => navigate("/auth")}>Вход</button>
        },
        errorChangePassword: {
            icon: <div className="result-modal__icon-wrapper">
                <CloseCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Данные не сохранились",
            subtitle: "Что-то пошло не так. Попробуйте еще раз",
            button: <button className="result-modal__button conf-button margin margin-shrink" onClick={() => navigate("/auth/change-password")}>Повторить</button>
        },
        errorCheckEmail: {
            icon: <div className="result-modal__image"></div>,
            title: "Что-то пошло не так",
            subtitle: "Произошла ошибка, попробуйте отправить форму ещё раз.",
            button: <button className="result-modal__button conf-button small margin margin-shrink" onClick={() => navigate("/auth")}>Назад</button>
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
