import React, { ReactElement } from 'react';
import "./result.css"
import { WarningFilled, CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';

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
    const inputs: inputs = {
        errorLogin: {
            icon: <div className="result-modal__icon-wrapper">
                <WarningFilled className="result-modal__icon" style={{ color: "var(--character-light-warning)" }} />
            </div>,
            title: "Вход не выполнен",
            subtitle: "Что-то пошло не так. Попробуйте еще раз",
            button: <button className="result-modal__button conf-button">Повторить</button>
        },
        errorUserExit: {
            icon: <div className="result-modal__icon-wrapper">
                <CloseCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Данные не сохранились",
            subtitle: "Что-то пошло не так и ваша регистрация\u000Aне завершилась. Попробуйте еще раз.",
            button: <button className="result-modal__button conf-button">Повторить</button>
        },
        success: {
            icon: <div className="result-modal__icon-wrapper">
                <CheckCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-success)" }} />
            </div>,
            title: "Регистрация успешна",
            subtitle: "Регистрация прошла успешно. Зайдите\u000Aв приложение, используя свои e-mail и пароль.",
            button: <button className="result-modal__button conf-button">Войти</button>
        },
        emailNoExist: {
            icon: <div className="result-modal__icon-wrapper">
                <CloseCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Такой e-mail не зарегистрирован",
            subtitle: "Мы не нашли в базе вашего e-mail. Попробуйте\u000Aвойти с другим e-mail.",
            button: <button className="result-modal__button conf-button medium margin">Попробовать снова</button>
        },
        changeSuccess: {
            icon: <div className="result-modal__icon-wrapper">
                <CheckCircleFilled className="result-modal__icon" style={{ color: "var(--character-light-success)" }} />
            </div>,
            title: "Пароль успешно изменен",
            subtitle: "Теперь можно войти в аккаунт, используя\u000Aсвой логин и новый пароль",
            button: <button className="result-modal__button conf-button margin">Вход</button>
        },
        errorCheck: {
            icon: <div className="result-modal__image"></div>,
            title: "Что-то пошло не так",
            subtitle: "Произошла ошибка, попробуйте отправить форму ещё раз.",
            button: <button className="result-modal__button conf-button small margin">Назад</button>
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
