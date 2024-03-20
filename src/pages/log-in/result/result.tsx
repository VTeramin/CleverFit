import React, { ReactElement } from 'react';
import { Button } from 'antd';
import styles from './result.module.css';
import '../modal.css';
import { WarningFilled, CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { EROUTE } from '@constants/enums';
import { register } from '@utils/requests/register';
import { changePassword } from '@utils/requests/change-password';
import { checkEmail } from '@utils/requests/check-email';

type resultData = {
    [key: string]: {
        icon: ReactElement,
        title: string,
        subtitle: string,
        button: ReactElement
    }
}

export const Result: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { result } = useParams();
    const resultType = result ? result : "";

    const resultData: resultData = {
        "error-login": {
            icon: <div className={styles["result-modal__icon-wrapper"]}>
                <WarningFilled className={styles["result-modal__icon"]} style={{ color: "var(--character-light-warning)" }} />
            </div>,
            title: "Вход не выполнен",
            subtitle: "Что-то пошло не так. Попробуйте еще раз",
            button: <Button
                className={`${styles["result-modal__button"]}`}
                onClick={() => navigate(EROUTE.AUTH)}
                data-test-id="login-retry-button"
            >Повторить</Button>
        },
        "error-user-exist": {
            icon: <div className={styles["result-modal__icon-wrapper"]}>
                <CloseCircleFilled className={styles["result-modal__icon"]} style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Данные не сохранились",
            subtitle: "Такой e-mail уже записан в системе. Попробуйте\u000Aзарегистрироваться по другому e\u2011mail.",
            button: <Button
                className={styles["result-modal__button"]}
                onClick={() => navigate(EROUTE.REGISTRATION)}
                data-test-id="registration-back-button"
            >Назад к регистрации</Button>
        },
        "error": {
            icon: <div className={styles["result-modal__icon-wrapper"]}>
                <CloseCircleFilled className={styles["result-modal__icon"]} style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Данные не сохранились",
            subtitle: "Что-то пошло не так и ваша регистрация не\u00A0завершилась. Попробуйте ещё раз.",
            button: <Button
                className={styles["result-modal__button"]}
                onClick={() => {
                    navigate(EROUTE.REGISTRATION);
                    dispatch(register()).then(navigate);
                }}
                data-test-id="registration-retry-button"
            >Повторить</Button>
        },
        "success": {
            icon: <div className={styles["result-modal__icon-wrapper"]}>
                <CheckCircleFilled className={styles["result-modal__icon"]} style={{ color: "var(--character-light-success)" }} />
            </div>,
            title: "Регистрация успешна",
            subtitle: "Регистрация прошла успешно. Зайдите\u000Aв приложение, используя свои e\u2011mail и пароль.",
            button: <Button
                className={styles["result-modal__button"]}
                onClick={() => navigate(EROUTE.MAIN)}
                data-test-id="registration-enter-button"
            >Войти</Button>
        },
        "error-check-email-no-exist": {
            icon: <div className={styles["result-modal__icon-wrapper"]} style={{ marginTop: "32px" }}>
                <CloseCircleFilled className={styles["result-modal__icon"]} style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Такой e-mail не зарегистрирован",
            subtitle: "Мы не нашли в базе вашего e-mail. Попробуйте\u000Aвойти с другим e-mail.",
            button: <Button
                className={`${styles["result-modal__button"]} ${styles["medium"]} ${styles["margin"]}`}
                onClick={() => navigate(EROUTE.AUTH)}
                data-test-id="check-retry-button"
            >Попробовать снова</Button>
        },
        "success-change-password": {
            icon: <div className={styles["result-modal__icon-wrapper"]}>
                <CheckCircleFilled className={styles["result-modal__icon"]} style={{ color: "var(--character-light-success)" }} />
            </div>,
            title: "Пароль успешно изменен",
            subtitle: "Теперь можно войти в аккаунт, используя\u000Aсвой логин и новый пароль",
            button: <Button
                className={`${styles["result-modal__button"]} ${styles["margin-shrink"]} ${styles["margin"]}`}
                onClick={() => navigate(EROUTE.AUTH)}
                data-test-id="change-entry-button"
            >Вход</Button>
        },
        "error-change-password": {
            icon: <div className={styles["result-modal__icon-wrapper"]}>
                <CloseCircleFilled className={styles["result-modal__icon"]} style={{ color: "var(--character-light-error)" }} />
            </div>,
            title: "Данные не сохранились",
            subtitle: "Что-то пошло не так. Попробуйте еще раз",
            button: <Button
                className={`${styles["result-modal__button"]} ${styles["margin-shrink"]} ${styles["margin"]}`}
                onClick={() => {
                    navigate(EROUTE.CHANGE_PASSWORD);
                    dispatch(changePassword()).then(navigate);
                }}
                data-test-id="change-retry-button"
            >Повторить</Button>
        },
        "error-check-email": {
            icon: <div className={styles["result-modal__image"]}></div>,
            title: "Что-то пошло не так",
            subtitle: "Произошла ошибка, попробуйте отправить форму ещё раз.",
            button: <Button
                className={`${styles["result-modal__button"]} ${styles["margin-shrink"]} ${styles["margin"]} ${styles["small"]}`}
                onClick={() => {
                    navigate(EROUTE.AUTH);
                    dispatch(checkEmail()).then(navigate);
                }}
                data-test-id="check-back-button"
            >Назад</Button>
        }
    };

    return (
        <div className="modal-wrapper">
            <div className={`${styles["result-modal"]} modal`}>
                {resultData[resultType].icon}
                <div className={styles["result-modal__text-wrapper"]}>
                    <p className={styles["result-modal__title"]}>{resultData[resultType].title}</p>
                    <p className={styles["result-modal__subtitle"]}>{resultData[resultType].subtitle}</p>
                </div>
                {resultData[resultType].button}
            </div>
        </div>
    );
};
