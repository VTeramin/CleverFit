import React from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-training-list.module.css';
import { Badge } from 'antd';
import { badgeColors } from '@constants/enums';
import { EditOutlined } from '@ant-design/icons';

type props = {
    listData: string[],
    edit?: React.MouseEventHandler<HTMLElement>
}

export const CalendarTrainingList: React.FC<props> = ({ listData, edit }) => {
    return (
        <ul className={styles["trainings-list"]}>
            {listData.map((name: string, ind) => (
                <li key={ind} >
                    <Badge text={name} color={badgeColors[name as keyof typeof badgeColors]} />
                    {edit && <EditOutlined
                        onClick={edit}
                    />}
                </li>
            ))}
        </ul>
    );
};


