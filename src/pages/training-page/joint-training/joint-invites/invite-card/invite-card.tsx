/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { trainingInviteMessage } from '@constants/training-invite-mesage';
import { TInvite } from '@constants/types';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { convertDate } from '@utils/convert-date';
import { handleInvite } from '@utils/requests/invite/handle-invite';
import { Avatar, Button } from 'antd';

import { ViewTrainingModal } from '../../view-training-modal/view-training-modal';

import 'antd/dist/antd.css';
import styles from './invite-card.module.css';

type TProps = {
    invite: TInvite,
    setHide: React.Dispatch<React.SetStateAction<boolean>>
}

export const InviteCard: React.FC<TProps> = ({ invite, setHide }) => {
    const dispatch = useAppDispatch();
    const [isView, setIsView] = useState(false);

    function handleAcceptInvite(id: string) {
        setHide(true);
        dispatch(handleInvite(id, 'accepted'));
    }

    function handleRejectInvite(id: string) {
        setHide(true);
        dispatch(handleInvite(id, 'rejected'));
    }

    return (
        <div key={invite.from._id} className={styles['invites-section__invite-card']}>
            <div className={styles['invite-card__user-info']}>
                <Avatar
                    src={invite.from.imageSrc || <UserOutlined />}
                    alt={invite.from.firstName || ''}
                    size={42}
                    className={styles['invite-card__avatar']}
                />
                <p>{invite.from.firstName}<br />{invite.from.lastName}</p>
            </div>
            <div className={styles['invite-card__invite-info']}>
                <p className={styles['invite-card__date']}>{convertDate(new Date(invite.createdAt))}</p>
                <p className={styles['invite-card__message']}>
                    Привет, я ищу партнёра для совместных {trainingInviteMessage[invite.training.name as string]}. Ты хочешь присоединиться ко мне на следующих тренировках?
                </p>
                <Button
                    type='text'
                    className={styles['invite-card__details-btn']}
                    onClick={() => setIsView(true)}
                >
                    Посмотреть детали тренировки
                </Button>
            </div>
            <div className={styles['invite-card__btns-wrapper']}>
                <Button
                    className={`${styles['invite-card__conf-btn']} ${styles['conf-button']}`}
                    onClick={() => handleAcceptInvite(invite._id)}
                    onMouseOver={() => setIsView(false)}
                >
                    Тренироваться вместе
                </Button>
                <Button
                    className={styles['invite-card__default-btn']}
                    onClick={() => handleRejectInvite(invite._id)}
                    onMouseOver={() => setIsView(false)}
                >
                    Отклонить запрос
                </Button>
            </div>
            {isView && <ViewTrainingModal
                trainingData={invite.training}
                setIsView={setIsView}
            />}
        </div>
    )
}
