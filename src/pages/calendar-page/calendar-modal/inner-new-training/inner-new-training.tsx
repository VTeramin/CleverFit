import React from 'react';
import 'antd/dist/antd.css';
import styles from './inner-new-training.module.css';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Empty, Select } from 'antd';
import { calendarModalType } from '@constants/enums';
import emptyIcon from '../../../../assets/icon/empty.svg';
import { ModalDrawer } from '../modal-drawer/modal-drawer';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { saveTraining } from '@utils/requests';
import { selectTraining } from '@redux/trainingSlice';
import { filterTrainingByDay } from '@utils/filter-training-by-day';
import { selectTrainingList } from '@redux/trainingListSlice';
import { changeModalType, changeSelectedTraining, selectCalendarModalData, toggleIsDrawer } from '@redux/calendarModalSlice';
import { getTrainingNames } from '@utils/get-trainings-names';
import { getTrainingSelectOptions } from '@utils/get-training-select-options';

type props = {
    date: Date
}

export const InnerNewTraining: React.FC<props> = ({ date }) => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const trainingList = useAppSelector(selectTrainingList);
    const { selectedTraining, exerciseFormFields } = useAppSelector(selectCalendarModalData);
    const isSmthSelected = selectedTraining !== null;
    const exerciseNames = getTrainingNames(exerciseFormFields);
    const isNoTraining = exerciseNames.length === 0;
    const trainingOnSelDate = filterTrainingByDay(training, date);
    const selectOptions = getTrainingSelectOptions(trainingList, trainingOnSelDate);

    function handleAddTraining() {
        if (isSmthSelected) dispatch(toggleIsDrawer(true));
    }

    function handleSaveTraining() {
        if (isSmthSelected) dispatch(saveTraining(date));
    }

    const trainings = isNoTraining
        ? <Empty image={emptyIcon} description="" className={styles["modal__empty"]}></Empty>
        : exerciseNames.map((el, ind) => (
            <div key={ind} className={styles["body__trainings"]}>
                <p className={styles["trainings__name"]}>{el}</p>
                <EditOutlined
                    className={styles["trainings__edit"]}
                    onClick={handleAddTraining}
                />
            </div>
        ));

    return (
        <>
            <div className={styles["modal__header"]}>
                <ArrowLeftOutlined onClick={() => dispatch(changeModalType(calendarModalType.default))} />
                <Select
                    placeholder="Выбор типа тренировки"
                    value={selectedTraining}
                    onSelect={(value) => dispatch(changeSelectedTraining(value))}
                    options={selectOptions}
                    bordered={false}
                    className={styles["modal__input"]}
                    popupClassName={styles["modal__dropdown"]}
                />
            </div>
            <Divider className={styles["modal__divider"]} />
            <div className={styles["modal__body"]}>
                {trainings}
            </div>
            <Divider className={styles["modal__divider"]} />
            <div className={styles["modal__buttons"]}>
                <Button onClick={handleAddTraining}>Добавить упражнения</Button>
                <Button
                    type="text"
                    disabled={isNoTraining}
                    onClick={handleSaveTraining}
                >Сохранить</Button>
            </div>
            {isSmthSelected && <ModalDrawer
                date={date}
            />}
        </>
    );
};
