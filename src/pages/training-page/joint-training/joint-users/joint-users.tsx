/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { EJointStatus } from '@constants/enums';
import { jointCardsStatus } from '@constants/joint-cards-status';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarDrawer } from '@pages/calendar-page/calendar-drawer/calendar-drawer';
import { changeExerciseFormFields, changeInterval, changeSelectedPal, changeSelectedTraining, toggleIsDrawer, toggleIsEdit, toggleIsJoint, toggleIsSaveDisabled } from '@redux/calendar-modal-slice';
import { selectTrainingPals } from '@redux/training-pals-slice';
import { selectUserData } from '@redux/user-data-slice';
import { selectUserJointTrainingList } from '@redux/user-joint-training-list-slice';
import { useMeasure, useWindowSize } from '@uidotdev/usehooks';
import { getUserJointTrainingList } from '@utils/requests/catalogs/get-user-joint-training-list';
import { rejectAcceptedInvite } from '@utils/requests/invite/reject-accepted-invite';
import { getMostPopularTraining } from '@utils/training-utils/get-most-popular-training';
import { statusSortJoinUsers } from '@utils/training-utils/status-sort-joint-users';
import { Button, Input, Pagination, Tooltip } from 'antd';
import classNames from 'classnames';

import { UserCard } from '../user-card/user-card';

import 'antd/dist/antd.css';
import styles from './joint-users.module.css';

const { Search } = Input;

type TProps = {
    isRandom: boolean,
    setInner: React.Dispatch<React.SetStateAction<string>>
}

export const JointUsers: React.FC<TProps> = ({ isRandom, setInner }) => {
    const dispatch = useAppDispatch();
    const userJointTrainingList = useAppSelector(selectUserJointTrainingList);
    const trainingPals = useAppSelector(selectTrainingPals);
    const { invites } = useAppSelector(selectUserData);
    const [currentPage, setCurrentPage] = useState(1);
    const pageWidth = useWindowSize().width || 0;
    const isTablet = pageWidth < 1300;
    const [ref, { width }] = useMeasure();
    const [pageSize, setPageSize] = useState(0);
    const [searchInputValue, setSearchInputValue] = useState('');
    const statusSortedUsers = statusSortJoinUsers(userJointTrainingList);
    const usersInfoAfterSearch = statusSortedUsers.filter(el => el.name.includes(searchInputValue));
    const cardsData = usersInfoAfterSearch.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const [availableRequests, setAvailableRequests] = useState(0);

    useEffect(() => {
        const trainingName = dispatch(getMostPopularTraining());

        dispatch(getUserJointTrainingList(isRandom ? trainingName : undefined));
    }, [dispatch, isRandom]);

    useEffect(() => {
        const palsCounter = trainingPals.length;
        const invitesCounter = invites.length;
        const pendingPalsCounter = userJointTrainingList.filter(el => el.status === EJointStatus.pending).length;

        setAvailableRequests(palsCounter + invitesCounter + pendingPalsCounter);
    }, [trainingPals, invites, userJointTrainingList]);

    useEffect(() => {
        const sideBar = document.getElementById('side-bar');
        const sideBarWidth = sideBar === null ? 70 : sideBar.offsetWidth
        const fullPageSize = sideBarWidth > 65 ? 12 : 15;

        setPageSize(isTablet ? 8 : fullPageSize);
    }, [isTablet, width]);

    const handleBack = () => {
        setInner('invites');
        setCurrentPage(1);
        setSearchInputValue('');
    }

    const handleAddTraining = (trainingType: string, palId: string) => {
        dispatch(changeSelectedTraining(trainingType));
        dispatch(changeSelectedPal(palId));
        dispatch(changeExerciseFormFields({}));
        dispatch(changeInterval(null));
        dispatch(toggleIsSaveDisabled(true));
        dispatch(toggleIsEdit(true));
        dispatch(toggleIsJoint(true));
        dispatch(toggleIsDrawer(true));
    }

    const handleRejectTraining = (palId: string, inviteId: string) => {
        dispatch(rejectAcceptedInvite(palId, inviteId));
    }

    const handleSearch = (event: { target: { value: string } }) => {
        setSearchInputValue(event.target.value);
        setCurrentPage(1);
    }

    return (
        <React.Fragment>
            <div className={styles.pals__header}>
                <Button
                    type='text'
                    onClick={handleBack}
                    className={styles['header__arrow-back']}
                    id='joint-users-back'
                >
                    <ArrowLeftOutlined /> Назад
                </Button>
                <Search
                    value={searchInputValue}
                    onChange={handleSearch}
                    placeholder="Поиск по имени"
                    className={styles.header__search}
                    data-test-id='search-input'
                />
            </div>
            <div className={styles.pals__cards} ref={ref}>
                {cardsData.map((user, ind) => (
                    <div key={user.id} className={styles.cards__card} data-test-id={`joint-training-cards${ind}`}>
                        <UserCard user={user} searchInputValue={searchInputValue} />
                        {user.status === EJointStatus.accepted
                            ? <Button
                                onClick={() => handleRejectTraining(user.id, user.inviteId || '')}
                                className={styles['card__conf-button']}
                            >
                                Отменить тренировку
                            </Button>
                            : <Button
                                onClick={() => handleAddTraining(user.trainingType, user.id)}
                                disabled={user.status === EJointStatus.pending || user.status === EJointStatus.rejected || availableRequests >= 4}
                                className={classNames(styles['card__conf-button'], styles['conf-button'])}
                            >
                                Создать тренировку
                            </Button>}
                        {user.status !== null && <p className={styles.card__status}>
                            {jointCardsStatus[user.status]}
                            {user.status === EJointStatus.rejected && <Tooltip
                                title={<p className={styles.tooltip}>
                                    повторный запрос <br />будет доступен <br />через 2 недели
                                </p>}
                                placement='topRight'
                                color='var(--neutral-gray-13)'
                            >
                                <ExclamationCircleOutlined
                                    size={16}
                                    className={styles.exclamation}
                                />
                            </Tooltip>}
                            {user.status === EJointStatus.accepted && <CheckCircleFilled
                                size={16}
                                className={styles.checked}
                            />}
                        </p>}
                    </div>
                ))}
            </div>
            <Pagination
                size="small"
                current={currentPage}
                total={usersInfoAfterSearch.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                hideOnSinglePage={true}
                className={styles.pals__pagination}
            />
            <CalendarDrawer />
        </React.Fragment>
    );
};
