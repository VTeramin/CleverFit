import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { EJointStatus } from '@constants/enums';
import { jointCardsStatus } from '@constants/joint-cards-status';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarDrawer } from '@pages/calendar-page/calendar-drawer/calendar-drawer';
import { changeExerciseFormFields, changeInterval, changeSelectedPal, changeSelectedTraining, toggleIsDrawer, toggleIsEdit, toggleIsJoint, toggleIsSaveDisabled } from '@redux/calendar-modal-slice';
import { selectTrainingPals,TPalData } from '@redux/training-pals-slice';
import { selectUserJointTrainingList } from '@redux/user-joint-training-list-slice';
import { useMeasure, useWindowSize } from '@uidotdev/usehooks';
import { getTrainingPals } from '@utils/requests/catalogs/get-training-pals';
import { getUserJointTrainingList } from '@utils/requests/catalogs/get-user-joint-training-list';
import { getJointUserName } from '@utils/training-utils/get-joint-user-name';
import { getMostPopularTraining } from '@utils/training-utils/get-most-popular-training';
import { statusSortJoinUsers } from '@utils/training-utils/status-sort-joint-users';
import { Avatar, Button, Divider, Input, Layout, Pagination, Tooltip } from 'antd';

import 'antd/dist/antd.css';
import styles from './joint-training.module.css';

const { Search } = Input;

export const JointTraining: React.FC = () => {
    const dispatch = useAppDispatch();
    const userJointTrainingList = useAppSelector(selectUserJointTrainingList);
    const [inner, setInner] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const pageWidth = useWindowSize().width || 0;
    const isTablet = pageWidth < 1300;
    const [ref, { width }] = useMeasure();
    const [pageSize, setPageSize] = useState(0);
    const [searchInputValue, setSearchInputValue] = useState('');
    const statusSortedUsers = statusSortJoinUsers(userJointTrainingList);
    const usersInfoAfterSearch = statusSortedUsers.filter(el => el.name.includes(searchInputValue));
    const cardsData = usersInfoAfterSearch.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    useEffect(() => {
        const sideBar = document.getElementById('side-bar');
        const sideBarWidth = sideBar === null ? 70 : sideBar.offsetWidth
        const fullPageSize = sideBarWidth > 65 ? 12 : 15;

        setPageSize(isTablet ? 8 : fullPageSize);
    }, [isTablet, width]);

    // const trainingPals = useAppSelector(selectTrainingPals);

    // useEffect(() => {
    //     dispatch(getTrainingPals()).then(() => console.log(trainingPals));
    // }, [dispatch, trainingPals]);

    function handleBack() {
        setInner('default');
        setCurrentPage(1);
        setSearchInputValue('');
    }

    function handleRandomChoice() {
        dispatch(getUserJointTrainingList());
        setInner('pals');
    }

    function handleStaticChoice() {
        const trainingName = dispatch(getMostPopularTraining());

        dispatch(getUserJointTrainingList(trainingName));
        setInner('pals');
    }

    function handleAddTraining(trainingType: string, palId: string) {
        dispatch(changeSelectedTraining(trainingType));
        dispatch(changeSelectedPal(palId));
        dispatch(changeExerciseFormFields({}));
        dispatch(changeInterval(null));
        dispatch(toggleIsSaveDisabled(true));
        dispatch(toggleIsEdit(true));
        dispatch(toggleIsJoint(true));
        dispatch(toggleIsDrawer(true));
    }

    return (
        <Layout className={styles['joint-training']}>
            {inner === 'default' && <React.Fragment>
                <div className={styles['joint-training__no-training-card']}>
                    <h3 className={styles['no-training-card__title']}>Хочешь тренироваться с тем, кто разделяет твои цели и темп?<br />Можешь найти друга для совместных тренировок среди других пользователей.</h3>
                    <p className={styles['no-training-card__subtitle']}>Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.</p>
                    <Divider className={styles['no-training-card__divider']} />
                    <div className={styles['no-training-card__buttons-wrapper']}>
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
                </div>
                <div className={styles['joint-training__participants-section']}>
                    <p className={styles['participants-section__title']}>Мои партнёры по тренировкам</p>
                    <p className={styles['participants-section__subtitle']}>У вас пока нет партнёров для совместных тренировок</p>
                </div>
            </React.Fragment>}
            {inner === 'pals' && <React.Fragment>
                <div className={styles.pals__header}>
                    <Button
                        type='text'
                        onClick={() => handleBack()}
                        className={styles['header__arrow-back']}
                    >
                        <ArrowLeftOutlined /> Назад
                    </Button>
                    <Search
                        value={searchInputValue}
                        onChange={event => setSearchInputValue(event.target.value)}
                        placeholder="Поиск по имени"
                        className={styles.header__search}
                    />
                </div>
                <div className={styles.pals__cards} ref={ref}>
                    {cardsData.map(user => (
                        <div key={user.id} className={styles.cards__card}>
                            <div className={styles.card__header}>
                                <Avatar
                                    src={user.imageSrc || <UserOutlined />}
                                    alt={user.name}
                                    size={42}
                                />
                                <p className={styles['card__pal-name']}>
                                    {getJointUserName(user.name, searchInputValue)}
                                </p>
                            </div>
                            <div className={styles.card__info}>
                                <div className={styles.card__labels}>
                                    <p>Тип тренировки:</p>
                                    <p>Средняя нагрузка:</p>
                                </div>
                                <div className={styles.card__data}>
                                    <p>{user.trainingType}</p>
                                    <p>{user.avgWeightInWeek} кг/нед</p>
                                </div>
                            </div>
                            <Button
                                onClick={() => handleAddTraining(user.trainingType, user.id)}
                                disabled={user.status === EJointStatus.pending}
                                className={styles['card__conf-button']}
                            >
                                Создать тренировку
                            </Button>
                            {user.status !== null &&
                                <p className={styles.card__status}>
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
            </React.Fragment>}
            <CalendarDrawer />
        </Layout>
    );
};
