import React, { useEffect } from 'react';
import { CalendarTwoTone, UserOutlined } from '@ant-design/icons';
import { EBadgeColors } from '@constants/enums';
import { intervalOptions } from '@constants/interval-options';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { TrainingSelect } from '@pages/calendar-page/calendar-modal/inner-new-training/training-select/training-select';
import { changeInterval, selectCalendarModalData } from '@redux/calendar-modal-slice';
import { selectTraining } from '@redux/training-slice';
import { selectUserJointTrainingList } from '@redux/user-joint-training-list-slice';
import { findTraining } from '@utils/calendar-utils/find-training';
import { dateCellRender } from '@utils/drawer-utils/date-picker-render';
import { getFixedDate } from '@utils/get-fixed-date';
import { Avatar, Badge, Checkbox, ConfigProvider, DatePicker, Select } from 'antd';
import locale from 'antd/es/locale/ru_RU';
import moment, { Moment } from 'moment';

import 'antd/dist/antd.css';
import styles from './no-date-group.module.css';

type TProps = {
    pickedMoment: Moment | null,
    setPickedMoment: React.Dispatch<React.SetStateAction<Moment | null>>,
    isInterval: boolean,
    setIsInterval: React.Dispatch<React.SetStateAction<boolean>>,
    date?: Date,
}

export const NoDateGroup: React.FC<TProps> = ({ pickedMoment, setPickedMoment, isInterval, setIsInterval, date }) => {
    const dispatch = useAppDispatch();
    const { isEdit, isJoint, selectedTraining, selectedPal, interval } = useAppSelector(selectCalendarModalData);
    const userJointTrainingList = useAppSelector(selectUserJointTrainingList);
    const selectedPalData = userJointTrainingList.find(pal => pal.id === selectedPal);
    const training = useAppSelector(selectTraining);
    const fixedDate = date ? getFixedDate(date) : '';

    useEffect(() => {
        if (fixedDate !== '') {
            const period = dispatch(findTraining(new Date(fixedDate), selectedTraining as string))?.parameters?.period || 0;

            setIsInterval(period > 0);
            dispatch(changeInterval(period > 0 ? period : null));
        };
    }, [dispatch, selectedTraining, fixedDate, setIsInterval]);

    return (
        <div className={styles['drawer__no-date-group']}>
            {isJoint && selectedPalData && <div className={styles['joint-training-pal']}>
                <Avatar
                    src={selectedPalData.imageSrc || <UserOutlined />}
                    alt={selectedPalData.name}
                    size={42}
                />
                <p className={styles['joint-training-pal__name']}>
                    <span>{`${selectedPalData.name.split(' ')[0]} `}</span>
                    <br />
                    <span>{selectedPalData.name.split(' ')[1]}</span>
                </p>
                <Badge
                    text={selectedTraining}
                    color={EBadgeColors[selectedTraining as keyof typeof EBadgeColors]}
                    className={styles['joint-training-pal__training-type']}
                />
            </div>}
            {!isJoint && <TrainingSelect date={date || pickedMoment?.toDate()} />}
            <div className={styles['no-date-group__date']}>
                <ConfigProvider locale={locale}>
                    <DatePicker
                        format='DD.MM.YYYY'
                        disabled={isEdit && !isJoint}
                        disabledDate={currentMoment => currentMoment.toDate() <= new Date(Date.now())}
                        value={date ? moment(date) : pickedMoment}
                        onChange={value => setPickedMoment(value)}
                        suffixIcon={<CalendarTwoTone twoToneColor='var(--character-light-disable-25)' />}
                        dateRender={cellMoment => dateCellRender(cellMoment, training)}
                        popupClassName={styles['no-date-group__calendar-popup']}
                        data-test-id='modal-drawer-right-date-picker'
                    />
                </ConfigProvider>
                <Checkbox
                    checked={isInterval}
                    onChange={event => setIsInterval(event.target.checked)}
                    data-test-id='modal-drawer-right-checkbox-period'
                >
                    С периодичностью
                </Checkbox>
            </div>
            {isInterval && <Select
                placeholder='Периодичность'
                options={intervalOptions}
                value={interval}
                onChange={value => dispatch(changeInterval(value))}
                className={styles['no-date-group__interval-select']}
                data-test-id='modal-drawer-right-select-period'
            />}
        </div>
    );
};
