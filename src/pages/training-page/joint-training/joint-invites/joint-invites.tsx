/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingPals, TPalData } from '@redux/training-pals-slice';
import { selectUserData } from '@redux/user-data-slice';
import { getInvite } from '@utils/requests/invite/get-invite';
import { Button, Divider, } from 'antd';

import { UserCard } from '../user-card/user-card';
import { ViewPalModal } from '../view-pal-modal/view-pal-modal';

import { InviteCard } from './invite-card/invite-card';

import 'antd/dist/antd.css';
import styles from './joint-invites.module.css';

type TProps = {
    inner: string;
    setInner: React.Dispatch<React.SetStateAction<string>>,
    setIsRandom: React.Dispatch<React.SetStateAction<boolean>>
}

export const JointInvites: React.FC<TProps> = ({ inner, setInner, setIsRandom }) => {
    const dispatch = useAppDispatch();
    const { invites } = useAppSelector(selectUserData);
    const [invitesDisplayed, setInvitesDisplayed] = useState(1);
    const trainingPals = useAppSelector(selectTrainingPals);
    const [hide, setHide] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [modalPalData, setModalPalData] = useState<TPalData>();

    useEffect(() => {
        dispatch(getInvite());
    }, [dispatch, inner]);

    function handleRandomChoice() {
        setIsRandom(false);
        setInner('users');
    }

    function handleStaticChoice() {
        setIsRandom(true);
        setInner('users');
    }

    function openModal(palData: TPalData) {
        setModalPalData(palData);
        setIsModal(true);
    }

    return (
        <React.Fragment>
            {invites.length > 0 && !hide && <div className={styles['joint-training__invites-section']}>
                <p className={styles['invites-section__new-messages']}>Новое сообщение ({invites.length})</p>
                {invites.slice(0, invitesDisplayed).map((invite, ind) => (
                    <InviteCard
                        key={invite._id}
                        invite={invite}
                        setHide={setHide}
                        data-test-id={`joint-training-cards${ind}`}
                    />
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
                <h3 className={styles['add-training-card__title']}>
                    Хочешь тренироваться с тем, кто разделяет твои цели и темп?<br />Можешь найти друга для совместных тренировок среди других пользователей.
                </h3>
                <p className={styles['add-training-card__subtitle']}>
                    Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой уровень и вид тренировки, и&#160;мы найдем тебе идеального спортивного друга.
                </p>
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
                        Выбор друга по моим тренировкам
                    </Button>
                </div>
            </div>}
            <div className={styles['joint-training__participants-section']}>
                <p className={styles['participants-section__title']}>Мои партнёры по тренировкам</p>
                {trainingPals.length === 0 && <p className={styles['participants-section__subtitle']}>
                    У вас пока нет партнёров для совместных тренировок
                </p>}
                {trainingPals.length > 0 && <div className={styles['participants-section__pals']}>
                    {trainingPals.map((palData, ind) => (
                        <div key={palData.id} data-test-id={`joint-training-cards${ind}`}>
                            <Button
                                type='text'
                                onClick={() => openModal(palData)}
                                className={styles['pals__pal-card']}
                            >
                                <UserCard user={palData} />
                            </Button>
                        </div>
                    ))}
                </div>}
                {modalPalData && <ViewPalModal
                    isModal={isModal}
                    setIsModal={setIsModal}
                    palData={modalPalData}
                />}
            </div>
        </React.Fragment>
    );
};
