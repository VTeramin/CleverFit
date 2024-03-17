import React, { useState } from 'react';
import '../modal.css';
import styles from './confirm-email.module.css';
import VerificationInput from 'react-verification-input';
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectLogin } from '@redux/loginSlice';
import { confirmEmail } from '@utils/requests/confirm-email';
import { status } from '@constants/enums';

export const ConfirmEmail: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { email } = useAppSelector(selectLogin);
    const [code, setCode] = useState("");
    const [isError, setIsError] = useState(false);

    function handleVerifInputComplete(value: string) {
        if(!email) return;
        dispatch(confirmEmail(value)).then((resp) => {
            if (resp !== status.error) navigate(resp);
            setIsError(true);
            setCode("");
            dispatch(confirmEmail(value)).then((resp) => {
                if (resp !== status.error) navigate(resp);
            });
        });
    }

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
                    onComplete={handleVerifInputComplete}
                    inputProps={{ "data-test-id": "verification-input" }}
                />
                <p className={styles["confirm-modal__desc"]}>Не пришло письмо? Проверьте папку Спам.</p>
            </div>
        </div>
    );
};
