/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingPals } from '@redux/training-pals-slice';
import { selectUserData } from '@redux/user-data-slice';
import { convertDate } from '@utils/convert-date';
import { getTrainingPals } from '@utils/requests/catalogs/get-training-pals';
import { getUserJointTrainingList } from '@utils/requests/catalogs/get-user-joint-training-list';
import { handleInvite } from '@utils/requests/invite/handle-invite';
import { getMostPopularTraining } from '@utils/training-utils/get-most-popular-training';
import { Avatar, Button, Divider, } from 'antd';

import { UserCard } from '../user-card/user-card';

import 'antd/dist/antd.css';
import styles from './joint-invites.module.css';

type TProps = {
    setInner: React.Dispatch<React.SetStateAction<string>>
}

export const JointInvites: React.FC<TProps> = ({ setInner }) => {
    const dispatch = useAppDispatch();
    const { invites } = useAppSelector(selectUserData);
    const [invitesDisplayed, setInvitesDisplayed] = useState(1);
    const trainingPals = useAppSelector(selectTrainingPals);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        dispatch(getTrainingPals());
    }, [dispatch]);

    function handleRandomChoice() {
        dispatch(getUserJointTrainingList());
        setInner('users');
    }

    function handleStaticChoice() {
        const trainingName = dispatch(getMostPopularTraining());

        dispatch(getUserJointTrainingList(trainingName));
        setInner('users');
    }

    function handleAcceptInvite(id: string) {
        setHide(true);
        dispatch(handleInvite(id, 'accepted'));
    }

    function handleRejectInvite(id: string) {
        setHide(true);
        dispatch(handleInvite(id, 'rejected'));
    }

    return (
        <React.Fragment>
            {invites.length > 0 && !hide && <div className={styles['joint-training__invites-section']}>
                <p className={styles['invites-section__new-messages']}>Новое сообщение ({invites.length})</p>
                {invites.slice(0, invitesDisplayed).map(invite => (
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
                            <p className={styles['invite-card__message']}>Привет, я ищу партнёра для совместных [силовых тренировок]. Ты хочешь присоединиться ко мне на следующих тренировках?</p>
                            <Button
                                type='text'
                                className={styles['invite-card__details-btn']}
                            >
                                Посмотреть детали тренировки
                            </Button>
                        </div>
                        <div className={styles['invite-card__btns-wrapper']}>
                            <Button
                                className={`${styles['invite-card__conf-btn']} ${styles['conf-button']}`}
                                onClick={() => handleAcceptInvite(invite._id)}
                            >
                                Тренироваться вместе
                            </Button>
                            <Button
                                className={styles['invite-card__default-btn']}
                                onClick={() => handleRejectInvite(invite._id)}
                            >
                                Отклонить запрос
                            </Button>
                        </div>
                    </div>
                ))}
                {invites.length > 1 && <Button
                    type='text'
                    className={styles['invites-section__show-btn']}
                    onClick={() => setInvitesDisplayed(prev => prev === 1 ? invites.length : 1)}
                >
                    {invitesDisplayed === 1
                        ? <React.Fragment>
                            <DownOutlined />Показать все сообщения
                        </React.Fragment>
                        : <React.Fragment>
                            <UpOutlined />Скрыть все сообщения
                        </React.Fragment>}
                </Button>}
            </div>}
            {!hide && <div className={styles['joint-training__add-training-card']}>
                <h3 className={styles['add-training-card__title']}>Хочешь тренироваться с тем, кто разделяет твои цели и темп?<br />Можешь найти друга для совместных тренировок среди других пользователей.</h3>
                <p className={styles['add-training-card__subtitle']}>Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.</p>
                <Divider className={styles['add-training-card__divider']} />
                <div className={styles['add-training-card__buttons-wrapper']}>
                    <Button
                        type='text'
                        onClick={() => handleRandomChoice()}
                    >
                        Случайный выбор
                    </Button>
                    <Button
                        type='text'
                        onClick={() => handleStaticChoice()}
                    >
                        Выбор друга по моим видам тренировок
                    </Button>
                </div>
            </div>}
            <div className={styles['joint-training__participants-section']}>
                <p className={styles['participants-section__title']}>Мои партнёры по тренировкам</p>
                {trainingPals.length === 0 && <p className={styles['participants-section__subtitle']}>
                    У вас пока нет партнёров для совместных тренировок
                </p>}
                <div className={styles['participants-section__pals']}>
                    {trainingPals.length > 0 && trainingPals.map(palData => (
                        <div key={palData.id} className={styles['pals__pal-card']}>
                            <UserCard user={palData} />
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
};
