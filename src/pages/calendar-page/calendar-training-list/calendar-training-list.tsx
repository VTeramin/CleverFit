import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { EBadgeColors, ECalendarModalType } from '@constants/enums';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { changeEditTraining, changeExerciseFormFields, changeModalType, changeSelectedTraining, toggleIsEdit } from '@redux/calendar-modal-slice';
import { checkIsTrainingDone } from '@utils/calendar-utils/check-is-training-done';
import { findExercises } from '@utils/calendar-utils/find-exercises';
import { Badge, Button } from 'antd';

import 'antd/dist/antd.css';
import styles from './calendar-training-list.module.css';

type TProps = {
    date: Date,
    listData: string[],
    edit?: boolean
}

export const CalendarTrainingList: React.FC<TProps> = ({ date, listData, edit }) => {
    const dispatch = useAppDispatch();

    function handleEdit(name: string) {
        dispatch(changeSelectedTraining(name));
        dispatch(changeEditTraining(name));
        const exercises = dispatch(findExercises(date.toISOString(), name));

        dispatch(changeExerciseFormFields(exercises));
        dispatch(toggleIsEdit(true));
        dispatch(changeModalType(ECalendarModalType.newTraining));
    }

    return (
        <ul className={styles['trainings-list']}>
            {listData.map((name, ind) => {
                const isTrainingDone = dispatch(checkIsTrainingDone(name, date));

                return (
                    <li key={ind} className={isTrainingDone ? styles.done : ''}>
                        <Badge text={name} color={EBadgeColors[name as keyof typeof EBadgeColors]} />
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


