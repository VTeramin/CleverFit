import React, { useState } from 'react';
import '../modal.css';
import styles from './confirm-email.module.css';
import VerificationInput from 'react-verification-input';
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { confirmEmail } from '../../../requests';
import { useNavigate } from 'react-router-dom';
import { store } from '@redux/configure-store';

export const ConfirmEmail: React.FC = () => {
    const navigate = useNavigate();
    const { email } = store.getState().login;
    const [code, setCode] = useState("");
    const [isError, setIsError] = useState(false);

    return (
        <div className="modal-wrapper">
            <div className={`${styles["confirm-modal"]} modal`}>
                <div className={styles["confirm-modal__icon-wrapper"]}>
                    {isError
                        ? <CloseCircleFilled className={styles["confirm-modal__icon"]} style={{ color: "var(--character-light-error)" }} />
                        : <ExclamationCircleFilled className={styles["confirm-modal__icon"]} style={{ color: "var(--primary-light-6)" }} />}
                </div>
                <p className={styles["confirm-modal__title"]}>
                    {isError
                        ? "Неверный код. Введите код\u000Aдля восстановления аккаунта"
                        : "Введите код\u000Aдля восстановления аккаунта"}
                </p>
                <p className={styles["confirm-modal__subtitle"]}>Мы отправили вам на e-mail <b>{email}</b><br />шестизначный код. Введите его в поле ниже.</p>
                <VerificationInput
                    validChars="z0-9"
                    placeholder=""
                    classNames={{
                        container: styles["verif-input"],
                        character: `${styles["verif-input__char"]} ${styles[isError ? "valid-error" : ""]}`,
                        characterInactive: styles["verif-input__char--inactive"],
                        characterSelected: styles["verif-input__char--selected"]
                    }}
                    value={code}
                    autoFocus
                    onChange={(value) => setCode(value)}
                    onComplete={(value) => confirmEmail(email, value).then((resp) => {
                        if (resp === "error") {
                            setIsError(true);
                            confirmEmail(email, code).then((resp) => {
                                if (resp !== "error") navigate(resp);
                            })
                            setCode("");
                        } else {
                            navigate(resp);
                        }
                    })}
                    inputProps={{ "data-test-id": "verification-input" }}
                />
                <p className={styles["confirm-modal__desc"]}>Не пришло письмо? Проверьте папку Спам.</p>
            </div>
        </div>
    );
};
