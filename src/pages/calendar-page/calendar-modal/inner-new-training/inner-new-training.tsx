import React from 'react';
import 'antd/dist/antd.css';
import styles from './inner-new-training.module.css';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Empty, Select } from 'antd';
import { calendarModalType } from '@constants/enums';
import emptyIcon from '../../../../assets/icon/empty.svg';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getTraining, saveTraining } from '@utils/requests';
import { selectTraining } from '@redux/trainingSlice';
import { filterTrainingByDay } from '@utils/calendar-utils/filter-training-by-day';
import { selectTrainingList } from '@redux/trainingListSlice';
import { changeEditTraining, changeModalType, changeSelectedTraining, selectCalendarModalData, toggleIsDrawer, toggleIsEdit } from '@redux/calendarModalSlice';
import { getTrainingNames } from '@utils/calendar-utils/get-trainings-names';
import { getTrainingSelectOptions } from '@utils/calendar-utils/get-training-select-options';
type props = {
    date: Date
}

export const InnerNewTraining: React.FC<props> = ({ date }) => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const trainingList = useAppSelector(selectTrainingList);
    const { selectedTraining, editTraining, exerciseFormFields, isEdit } = useAppSelector(selectCalendarModalData);
    const trainingOnSelDate = filterTrainingByDay(training, date);
    const exerciseNames = getTrainingNames(exerciseFormFields);
    const isNoExercise = exerciseNames.length === 0;
    const selectOptions = getTrainingSelectOptions(training, trainingOnSelDate, trainingList, date, isEdit);
    const isSaveDisabled = !isEdit && exerciseNames.length === 0;

    function handleSelect(value: string) {
        if (trainingOnSelDate.includes(value)) {
            dispatch(toggleIsEdit(true));
            dispatch(changeEditTraining(value));
        } else {
            dispatch(toggleIsEdit(false));
        }
        dispatch(changeSelectedTraining(value));
    }

    function handleAddTraining() {
        dispatch(toggleIsDrawer(true));
    }

    function handleSaveTraining() {
        dispatch(saveTraining(date)).then(() => dispatch(getTraining()));
    }

    const trainings = isNoExercise
        ? <Empty image={emptyIcon} description="" className={styles["modal__empty"]}></Empty>
        : exerciseNames.map((el, ind) => (
            <div key={ind} className={styles["body__trainings"]}>
                <p className={styles["trainings__name"]}>{el}</p>
                <EditOutlined
                    className={styles["trainings__edit"]}
                    onClick={handleAddTraining}
                    data-test-id={`modal-update-training-edit-button${ind}`}
                />
            </div>
        ));

    return (
        <div data-test-id="modal-create-exercise">
            <div className={styles["modal__header"]}>
                <ArrowLeftOutlined
                    onClick={() => dispatch(changeModalType(calendarModalType.default))}
                    data-test-id="modal-exercise-training-button-close"
                />
                <Select
                    placeholder="Выбор типа тренировки"
                    value={selectedTraining}
                    defaultValue={editTraining}
                    onSelect={handleSelect}
                    options={selectOptions}
                    bordered={false}
                    className={styles["modal__input"]}
                    popupClassName={styles["modal__dropdown"]}
                    data-test-id="modal-create-exercise-select"
                />
            </div>
            <Divider className={styles["modal__divider"]} />
            <div className={styles["modal__body"]}>
                {trainings}
            </div>
            <Divider className={styles["modal__divider"]} />
            <div className={styles["modal__buttons"]}>
                <Button
                    onClick={handleAddTraining}
                    disabled={selectedTraining === null}
                >Добавить упражнения</Button>
                <Button
                    type="text"
                    disabled={isSaveDisabled}
                    onClick={handleSaveTraining}
                >{date < new Date(Date.now()) ? "Сохранить изменения" : "Сохранить"}</Button>
            </div>
        </div>
    );
};
