import React from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-training-list.module.css';
import { Badge } from 'antd';
import { badgeColors, calendarModalType } from '@constants/enums';
import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { changeEditTraining, changeModalType, changeSelectedTraining, toggleIsEdit } from '@redux/calendarModalSlice';

type props = {
    listData: string[],
    edit?: boolean
}

export const CalendarTrainingList: React.FC<props> = ({ listData, edit }) => {
    const dispatch = useAppDispatch();

    function handleEdit(name: string) {
        dispatch(toggleIsEdit(true));
        dispatch(changeSelectedTraining(name));
        dispatch(changeEditTraining(name));
        dispatch(changeModalType(calendarModalType.newTraining));
    }

    return (
        <ul className={styles["trainings-list"]}>
            {listData.map((name: string, ind) => (
                <li key={ind} >
                    <Badge text={name} color={badgeColors[name as keyof typeof badgeColors]} />
                    {edit && <EditOutlined
                        onClick={() => handleEdit(name)}
                    />}
                </li>
            ))}
        </ul>
    );
};


