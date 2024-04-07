/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { EBadgeColors, EStatus } from '@constants/enums';
import { intervalOptions } from '@constants/interval-options';
import { TTraining } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarDrawer } from '@pages/calendar-page/calendar-drawer/calendar-drawer';
import { changeEditTraining, changeExerciseFormFields, changeInterval, changeModalCoord, changeResultType, changeSelectedTraining, selectCalendarModalData, toggleIsDrawer, toggleIsEdit, toggleIsSaveDisabled } from '@redux/calendar-modal-slice';
import { selectTrainingList } from '@redux/training-list-slice';
import { selectTraining } from '@redux/training-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { findExercises } from '@utils/calendar-utils/find-exercises';
import { getMyTrainingModalCoords } from '@utils/training-utils/get-my-training-modal-coords';
import { Alert, Badge, Button, Layout, Pagination, Select } from 'antd';

import { MyTrainingModal } from './my-training-modal/my-training-modal';

import 'antd/dist/antd.css';
import styles from './my-training.module.css';

export const MyTraining: React.FC = () => {
    const dispatch = useAppDispatch();
    const width = useWindowSize().width || 0;
    const isMobile = width < 800;
    const training = useAppSelector(selectTraining);
    const isNoTraining = training.length === 0;
    const trainingList = useAppSelector(selectTrainingList);
    const isTraingListEmpty = trainingList.length === 0;
    const { resultType } = useAppSelector(selectCalendarModalData);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = isMobile ? 8 : 14;
    const alertMessages: { [name: string]: string } = {
        [EStatus.success]: 'Новая тренировка успешно добавлена',
        [EStatus.successEdit]: 'Тренирока успешно обновлена'
    }
    const [isModal, setIsModal] = useState(false);
    const frequency = (el: TTraining) => intervalOptions.find(option => option.value === el.parameters?.period)?.label;
    const [selectedDate, setSelectdDate] = useState<Date | null>(null);

    function handleEdit(el: TTraining) {
        const exercises = dispatch(findExercises(el.date, el.name));

        setIsModal(false);
        setSelectdDate(new Date(el.date));
        dispatch(changeSelectedTraining(el.name));
        dispatch(changeEditTraining(el.name));
        dispatch(changeExerciseFormFields(exercises));
        dispatch(toggleIsEdit(true));
        dispatch(toggleIsDrawer(true));
    }

    function handleNewTraining() {
        setIsModal(false);
        dispatch(changeSelectedTraining(null));
        dispatch(changeExerciseFormFields({}));
        dispatch(changeInterval(null));
        dispatch(toggleIsSaveDisabled(true));
        dispatch(toggleIsEdit(false));
        setSelectdDate(null);
        dispatch(toggleIsDrawer(true));
    }

    function showModal(el: TTraining, ind: number) {
        const exercises = dispatch(findExercises(el.date, el.name));

        setSelectdDate(new Date(el.date));
        dispatch(changeExerciseFormFields(exercises));
        dispatch(changeSelectedTraining(el.name));
        dispatch(toggleIsEdit(true));
        dispatch(changeModalCoord(getMyTrainingModalCoords(ind, pageSize, isMobile)));
        setIsModal(true);
    }

    return (
        <React.Fragment>
            {isNoTraining
                ? <Layout className={`${styles.training} ${styles['new-training']}`}>
                    <h3 className={styles.training__title}>У вас ещё нет созданных тренировок</h3>
                    <Button
                        className={styles['training__conf-button']}
                        onClick={() => dispatch(toggleIsDrawer(true))}
                    >
                        Создать тренировку
                    </Button>
                </Layout>
                : <Layout className={styles.training}>
                    <div className={styles.training__header}>
                        <div className={styles['header__training-type']}>Тип тренировки</div>
                        <Select
                            defaultValue='Периодичность'
                            options={[
                                {
                                    value: 'Периодичность',
                                    label: 'Периодичность',
                                }
                            ]}
                            className={styles['header__training-sort']}
                        />
                    </div>
                    {training.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((el, ind) => (
                        <div key={el._id} className={styles.training__row}>
                            <div className={styles['row__select-wrapper']}>
                                <Badge color={EBadgeColors[el.name as keyof typeof EBadgeColors]} />
                                <div className={styles.row__select}>
                                    <p>{el.name}</p>
                                    <Button
                                        type='text'
                                        id={`Dropdown ${el._id}`}
                                        disabled={el.isImplementation}
                                        onClick={() => showModal(el, ind)}
                                        className={styles.row__dropdown}
                                    >
                                        <DownOutlined />
                                    </Button>
                                </div>
                            </div>
                            <p className={styles.row__frequency}>
                                {frequency(el)}
                            </p>
                            <Button
                                type='text'
                                disabled={el.isImplementation}
                                onClick={() => handleEdit(el)}
                                className={`${styles.row__edit} ${el.isImplementation && styles['row__edit-disabled']}`}
                            >
                                <EditOutlined />
                            </Button>
                        </div>
                    ))}
                    <Pagination
                        size="small"
                        current={currentPage}
                        total={training.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                        hideOnSinglePage={true}
                        className={styles.training__pagination}
                    />
                    {!isTraingListEmpty &&
                        <Button
                            className={styles['training__conf-button']}
                            onClick={() => handleNewTraining()}
                        >
                            <PlusOutlined />Новая тренировка
                        </Button>}
                    {Object.keys(alertMessages).includes(resultType) && <Alert
                        message={alertMessages[resultType]}
                        type="success"
                        showIcon={true}
                        closable={true}
                        onClose={() => dispatch(changeResultType(EStatus.empty))}
                        className={styles.training__alert}
                        data-test-id='alert'
                    />}
                    {isModal && <MyTrainingModal
                        setIsModal={setIsModal}
                    />}
                </Layout>}
            <CalendarDrawer date={selectedDate === null ? undefined : selectedDate} />
        </React.Fragment>
    );
};
