import React from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-training-list.module.css';
import { Badge } from 'antd';
import { badgeColors, calendarModalType } from '@constants/enums';
import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeEditTraining, changeModalType, changeSelectedTraining, toggleIsDrawer, toggleIsEdit } from '@redux/calendarModalSlice';
import { selectTraining } from '@redux/trainingSlice';
import { checkIsTrainingDone } from '@utils/check-is-training-done';

type props = {
    date?: Date,
    listData: string[],
    edit?: boolean
}

export const CalendarTrainingList: React.FC<props> = ({ date, listData, edit }) => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);


    function handleEdit(name: string) {
        dispatch(changeSelectedTraining(name));
        if (checkIsTrainingDone(name, training, date)) {
            dispatch(toggleIsDrawer(true));
            dispatch(toggleIsEdit(false));
        } else {
            dispatch(toggleIsEdit(true));
            dispatch(changeEditTraining(name));
            dispatch(changeModalType(calendarModalType.newTraining));
        }
    }

    return (
        <ul className={styles["trainings-list"]}>
            {listData.map((name: string, ind) => (
                <li key={ind} className={checkIsTrainingDone(name, training, date) ? styles["done"] : ""}>
                    <Badge text={name} color={badgeColors[name as keyof typeof badgeColors]} />
                    {edit && <EditOutlined
                        onClick={() => handleEdit(name)}
                    />}
                </li>
            ))}
        </ul>
    );
};


