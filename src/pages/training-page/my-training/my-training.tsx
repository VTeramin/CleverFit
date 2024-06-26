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
import { checkIsFuture } from '@utils/check-is-future';
import { getMyTrainingModalCoords } from '@utils/training-utils/get-my-training-modal-coords';
import { Alert, Badge, Button, Layout, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import classNames from 'classnames';

import { MyTrainingModal } from './my-training-modal/my-training-modal';

import 'antd/dist/antd.css';
import styles from './my-training.module.css';

type TColumns = {
    key: React.Key;
    trainingName: JSX.Element;
    frequency: JSX.Element;
    edit: JSX.Element;
}

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
    const pageSize = isMobile ? 8 : 10;
    const alertMessages: { [name: string]: string } = {
        [EStatus.success]: 'Новая тренировка успешно добавлена',
        [EStatus.successEdit]: 'Тренировка успешно обновлена'
    }
    const [isModal, setIsModal] = useState(false);
    const frequency = (el: TTraining) => intervalOptions.find(option => option.value === el.parameters?.period)?.label;
    const [selectedDate, setSelectdDate] = useState<Date | null>(null);

    const handleEdit = (el: TTraining) => {
        const exercises = dispatch(findExercises(el.date, el.name));

        setIsModal(false);
        setSelectdDate(new Date(el.date));
        dispatch(changeSelectedTraining(el.name));
        dispatch(changeEditTraining(el.name));
        dispatch(changeExerciseFormFields(exercises));
        dispatch(toggleIsEdit(true));
        dispatch(toggleIsDrawer(true));
    }

    const handleNewTraining = () => {
        setIsModal(false);
        dispatch(changeSelectedTraining(null));
        dispatch(changeExerciseFormFields({}));
        dispatch(changeInterval(null));
        dispatch(toggleIsSaveDisabled(true));
        dispatch(toggleIsEdit(false));
        setSelectdDate(null);
        dispatch(toggleIsDrawer(true));
    }

    const showModal = (el: TTraining) => {
        const exercises = dispatch(findExercises(el.date, el.name));

        setSelectdDate(new Date(el.date));
        dispatch(changeExerciseFormFields(exercises));
        dispatch(changeSelectedTraining(el.name));
        dispatch(toggleIsEdit(true));
        dispatch(changeModalCoord(getMyTrainingModalCoords(el._id || '', pageSize, isMobile)));
        setIsModal(true);
    }

    const getFrequencyValue = (label: string) => {
        const optionValue = intervalOptions.find(interval => interval.label === label);

        return optionValue?.value || 0;
    }

    const columns: ColumnsType<TColumns> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'trainingName',
        },
        {
            title: 'Периодичность',
            dataIndex: 'frequency',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => getFrequencyValue(b.frequency.key || '') - getFrequencyValue(a.frequency.key || ''),
        },
        {
            title: '',
            dataIndex: 'edit',
        }
    ];

    const trainingData = [...training].reverse();

    const data: TColumns[] = trainingData.map(el => ({
        key: el._id || '',
        trainingName: (
            <div className={styles['row__select-wrapper']}>
                <Badge color={EBadgeColors[el.name as keyof typeof EBadgeColors]} />
                <div className={classNames(styles.row__select, 'table-cell')} id={el._id}>
                    <p>{el.name}</p>
                    <Button
                        type='text'
                        disabled={!checkIsFuture(new Date(el.date))}
                        onClick={() => showModal(el)}
                        className={styles.row__dropdown}
                    >
                        <DownOutlined />
                    </Button>
                </div>
            </div>
        ),
        frequency: (
            <div className={styles.row__frequency} key={frequency(el) || ''}>
                {frequency(el) || ''}
            </div>
        ),
        edit: (
            <Button
                type='text'
                disabled={el.isImplementation}
                onClick={() => handleEdit(el)}
                className={classNames(styles.row__edit, {[styles['row__edit-disabled']]: el.isImplementation})}
                data-test-id={`update-my-training-table-icon${Number(el._id) - 1}`}
            >
                <EditOutlined />
            </Button>
        )
    }));

    return (
        <React.Fragment>
            {isNoTraining
                ? <Layout className={classNames(styles.training, styles['new-training'])}>
                    <h3 className={styles.training__title}>У вас ещё нет созданных тренировок</h3>
                    <Button
                        className={styles['training__conf-button']}
                        onClick={() => dispatch(toggleIsDrawer(true))}
                    >
                        Создать тренировку
                    </Button>
                </Layout>
                : <Layout className={styles.training}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        showSorterTooltip={false}
                        pagination={{
                            size: 'small',
                            current: currentPage,
                            total: training.length,
                            pageSize,
                            onChange: setCurrentPage,
                            showSizeChanger: false,
                            hideOnSinglePage: true,
                            className: styles.training__pagination,
                        }}
                        data-test-id='my-trainings-table'
                    />
                    {!isTraingListEmpty &&
                        <Button
                            className={styles['training__conf-button']}
                            onClick={handleNewTraining}
                            data-test-id='create-new-training-button'
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
                        data-test-id='create-training-success-alert'
                    />}
                    {isModal && <MyTrainingModal
                        setIsModal={setIsModal}
                    />}
                </Layout>}
            <CalendarDrawer date={selectedDate === null ? undefined : selectedDate} />
        </React.Fragment>
    );
};
