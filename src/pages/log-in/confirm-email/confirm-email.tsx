import React from 'react';
import "./confirm-email.css"
import VerificationInput from "react-verification-input";
import { ExclamationCircleFilled } from '@ant-design/icons';

export const ConfirmEmail: React.FC = () => {
    return (
        <div className="modal-wrapper">
            <div className="confirm-modal modal">
                <div className="confirm-modal__icon-wrapper">
                    <ExclamationCircleFilled className="confirm-modal__icon" style={{ color: "var(--primary-light-6)" }} />
                </div>
                <p className="confirm-modal__title">Введите код<br />для восстановления аккауанта</p>
                <p className="confirm-modal__subtitle">Мы отправили вам на e-mail <b>victorbyden@gmail.com</b><br />шестизначный код. Введите его в поле ниже.</p>
                <VerificationInput
                    validChars="z0-9"
                    placeholder=""
                    classNames={{
                        container: "confirm-modal__verif-input",
                        character: "verif-input__char",
                        characterInactive: "verif-input__char--inactive"
                    }}
                />
                <p className="confirm-modal__desc">Не пришло письмо? Проверьте папку Спам.</p>
            </div>
        </div>
    );
};
