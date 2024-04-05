import React, { useState } from 'react';
import { DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { EBadgeColors, EStatus } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarDrawer } from '@pages/calendar-page/calendar-drawer/calendar-drawer';
import { changeResultType, selectCalendarModalData, toggleIsDrawer } from '@redux/calendar-modal-slice';
import { selectTrainingList } from '@redux/training-list-slice';
import { selectTraining } from '@redux/training-slice';
import { Alert, Badge, Button, Layout, Pagination, Select } from 'antd';

import 'antd/dist/antd.css';
import styles from './my-training.module.css';

export const MyTraining: React.FC = () => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const isNoTraining = training.length === 0;
    const trainingList = useAppSelector(selectTrainingList);
    const isTraingListEmpty = trainingList.length === 0;
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 14;
    const { resultType } = useAppSelector(selectCalendarModalData);

    return (
        isNoTraining
            ? <Layout className={`${styles.training} ${styles['new-training']}`}>
                <h3 className={styles.training__title}>У вас ещё нет созданных тренировок</h3>
                <Button className={styles['training__conf-button']}>
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
                    // eslint-disable-next-line no-underscore-dangle
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
                            {String(el.date)}
                        </p>
                        <Button type='text' className={styles.row__edit}>
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
                    hideOnSinglePage={true}
                    className={styles.training__pagination}
                />
                {!isTraingListEmpty &&
                    <Button
                        className={styles['training__conf-button']}
                        onClick={() => dispatch(toggleIsDrawer(true))}
                    >
                        <PlusOutlined />Новая тренировка
                    </Button>}
                <CalendarDrawer />
                {resultType === EStatus.success && <Alert
                    message="Новая тренировка успешно добавлена"
                    type="success"
                    showIcon={true}
                    closable={true}
                    onClose={() => dispatch(changeResultType(EStatus.empty))}
                    className={styles.training__alert}
                    data-test-id='alert'
                />}
            </Layout>
    );
};
