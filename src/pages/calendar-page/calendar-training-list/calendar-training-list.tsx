import React from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-training-list.module.css';
import { Badge, Button } from 'antd';
import { badgeColors, calendarModalType } from '@constants/enums';
import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { changeEditTraining, changeExerciseFormFields, changeModalType, changeSelectedTraining, toggleIsEdit } from '@redux/calendarModalSlice';
import { checkIsTrainingDone } from '@utils/calendar-utils/check-is-training-done';
import { findExercises } from '@utils/calendar-utils/find-exercises';

type props = {
    date: Date,
    listData: string[],
    edit?: boolean
}

export const CalendarTrainingList: React.FC<props> = ({ date, listData, edit }) => {
    const dispatch = useAppDispatch();

    function handleEdit(name: string) {
        dispatch(changeSelectedTraining(name));
        dispatch(changeEditTraining(name));
        const exercises = dispatch(findExercises(date.toISOString(), name));
        dispatch(changeExerciseFormFields(exercises));
        dispatch(toggleIsEdit(true));
        dispatch(changeModalType(calendarModalType.newTraining));
    }

    return (
        <ul className={styles["trainings-list"]}>
            {listData.map((name, ind) => {
                const isTrainingDone = dispatch(checkIsTrainingDone(name, date));
                return (
                    <li key={ind} className={isTrainingDone ? styles["done"] : ""}>
                        <Badge text={name} color={badgeColors[name as keyof typeof badgeColors]} />
                        {edit && <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(name)}
                            data-test-id={`modal-update-training-edit-button${ind}`}
                            disabled={isTrainingDone}
                        />}
                    </li>
                )
            })}
        </ul>
    );
};


