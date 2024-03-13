import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styles from './inner-new-training.module.css';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Empty, Select } from 'antd';
import { calendarModalType } from '@constants/enums';
import emptyIcon from '../../../../assets/icon/empty.svg';
import { ModalDrawer } from '../modal-drawer/modal-drawer';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { saveTraining, status } from '@utils/requests';
import { exercise } from '@constants/types';

type trainingListEl = {
    "name": "string",
    "key": "string"
}

type props = {
    date: Date,
    trainingList: trainingListEl[],
    setModalType: React.Dispatch<React.SetStateAction<calendarModalType>>,
    setResultType: React.Dispatch<React.SetStateAction<status>>
}

export const InnerNewTraining: React.FC<props> = ({ date, trainingList, setModalType, setResultType }) => {
    const dispatch = useAppDispatch();
    const [selectedValue, setSelectedValue] = useState(null);
    const selectOptions = trainingList.map((el: trainingListEl) => ({ value: el.name }));
    const [isDrawer, setIsDrawer] = useState(false);
    const [trainingsNames, setTrainingNames] = useState<string[]>([]);
    const [exercises, setExercises] = useState<exercise[]>([]);

    function handleAddTraining() {
        if (selectedValue !== null) setIsDrawer(true);
    }

    function handleSaveTraining() {
        if(selectedValue !== null) {
            dispatch(saveTraining(selectedValue, date, exercises)).then(resp => {
                if(resp === status.success) setModalType(calendarModalType.empty);
                if(resp === status.errorSaveTraining) setResultType(status.errorSaveTraining);
            })
        }
    }

    const trainings = trainingsNames.map((el, ind) => (
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
                <ArrowLeftOutlined onClick={() => setModalType(calendarModalType.empty)} />
                <Select
                    placeholder="Выбор типа тренировки"
                    value={selectedValue}
                    onSelect={(value) => setSelectedValue(value)}
                    options={selectOptions}
                    bordered={false}
                    className={styles["modal__input"]}
                    popupClassName={styles["modal__dropdown"]}
                />
            </div>
            <Divider className={styles["modal__divider"]} />
            <div className={styles["modal__body"]}>
                {trainingsNames.length === 0
                    ? <Empty image={emptyIcon} description="" className={styles["modal__empty"]}></Empty>
                    : trainings}
            </div>
            <Divider className={styles["modal__divider"]} />
            <div className={styles["modal__buttons"]}>
                <Button onClick={handleAddTraining}>Добавить упражнения</Button>
                <Button
                    type="text"
                    disabled={trainingsNames.length === 0}
                    onClick={handleSaveTraining}
                >Сохранить</Button>
            </div>
            {selectedValue !== null && <ModalDrawer
                date={date}
                isDrawer={isDrawer}
                setIsDrawer={setIsDrawer}
                selectedValue={selectedValue}
                setTrainingNames={setTrainingNames}
                setExercises={setExercises}
            />}
        </>
    );
};
