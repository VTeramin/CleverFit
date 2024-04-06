/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { EBadgeColors, EStatus } from '@constants/enums';
import { intervalOptions } from '@constants/interval-options';
import { TTraining } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarDrawer } from '@pages/calendar-page/calendar-drawer/calendar-drawer';
import { changeEditTraining, changeExerciseFormFields, changeResultType, changeSelectedTraining, selectCalendarModalData, toggleIsDrawer, toggleIsEdit } from '@redux/calendar-modal-slice';
import { selectTrainingList } from '@redux/training-list-slice';
import { selectTraining } from '@redux/training-slice';
import { findExercises } from '@utils/calendar-utils/find-exercises';
import { Alert, Badge, Button, Layout, Pagination, Select } from 'antd';

import 'antd/dist/antd.css';
import styles from './my-training.module.css';

export const MyTraining: React.FC = () => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const isNoTraining = training.length === 0;
    const trainingList = useAppSelector(selectTrainingList);
    const isTraingListEmpty = trainingList.length === 0;
    const { resultType, isDrawer } = useAppSelector(selectCalendarModalData);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 14;
    const alertMessages: { [name: string]: string } = {
        [EStatus.success]: 'Новая тренировка успешно добавлена',
        [EStatus.successEdit]: 'Тренирока успешно обновлена'
    }

    const frequency = (el: TTraining) => intervalOptions.find(option => option.value === el.parameters?.period)?.label;
    const [selectedDate, setSelectdDate] = useState<Date | null>(null);

    useEffect(() => {
        if (!isDrawer) setSelectdDate(null);
    }, [isDrawer]);

    function handleEdit(el: TTraining) {
        setSelectdDate(new Date(el.date));
        dispatch(changeSelectedTraining(el.name));
        dispatch(changeEditTraining(el.name));
        const exercises = dispatch(findExercises(el.date, el.name));

        dispatch(changeExerciseFormFields(exercises));
        dispatch(toggleIsEdit(true));
        dispatch(toggleIsDrawer(true));
    }

    function handleNewTraining() {
        dispatch(toggleIsEdit(false));
        dispatch(toggleIsDrawer(true));
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
                                    label: 'Сортировка по периоду',
                                }
                            ]}
                            className={styles['header__training-sort']}
                        />
                    </div>
                    {training.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(el => (
                        <div key={el._id} className={styles.training__row}>
                            <div className={styles['row__select-wrapper']}>
                                <Badge color={EBadgeColors[el.name as keyof typeof EBadgeColors]} />
                                <div className={styles.row__select}>
                                    <p>{el.name}</p>
                                    <Button
                                        type='text'
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
                </Layout>}
            <CalendarDrawer date={selectedDate || undefined} />
        </React.Fragment>
    );
};
