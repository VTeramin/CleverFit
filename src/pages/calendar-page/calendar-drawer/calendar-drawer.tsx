import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { EDrawer, EStatus } from '@constants/enums';
import { TDrawerFormFields, TDrawerTitles } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarTrainingList } from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { changeExerciseFormFields, changeResultType, selectCalendarModalData, toggleIsSaveDisabled } from '@redux/calendar-modal-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { sortDrawerFormFromEmpty } from '@utils/calendar-utils/sort-drawer-form-from-empty';
import { checkIsFuture } from '@utils/check-is-future';
import { convertDate } from '@utils/convert-date';
import { saveTraining } from '@utils/requests/training/save-training';
import { Button, Divider, Drawer } from 'antd';
import classNames from 'classnames';
import { Moment } from 'moment';

import { CalendarDrawerForm } from './calendar-drawer-form/calendar-drawer-form';

import 'antd/dist/antd.css';
import styles from './calendar-drawer.module.css';

type TProps = {
    date?: Date
}

export const CalendarDrawer: React.FC<TProps> = ({ date }) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const browserWidth = useWindowSize().width || 0;
    const isMobile = browserWidth <= 800;
    const { isEdit, isJoint, isDrawer, selectedTraining, isSaveDisabled } = useAppSelector(selectCalendarModalData);
    const isMyTrainingPage = pathname === '/training';
    const isWarning = date ? !checkIsFuture(date) : false;
    const [drawerType, setDrawerType] = useState(EDrawer.default);
    const [pickedMoment, setPickedMoment] = useState<Moment | null>(null);
    const [formBackUp, setFormBackUp] = useState<{ exercises: TDrawerFormFields } | null>(null);

    useEffect(() => {
        if (!isDrawer) setPickedMoment(null);
    }, [isDrawer])

    useEffect(() => {
        if (isEdit) setDrawerType(EDrawer.edit);
        if (isMyTrainingPage && !isEdit) setDrawerType(EDrawer.noDate);
        if (!isEdit && !isMyTrainingPage) setDrawerType(EDrawer.default);
        if (isJoint) setDrawerType(EDrawer.joint);
    }, [isEdit, isMyTrainingPage, isJoint, dispatch]);

    const closeDrawer = () => {
        const closeBtn = document.getElementById('drawer__close') as HTMLElement;

        closeBtn.click();
    }

    const handleSave = () => {
        closeDrawer();
        dispatch(toggleIsSaveDisabled(true));
        if (formBackUp !== null) dispatch(changeExerciseFormFields(sortDrawerFormFromEmpty(formBackUp)));

        const dateFromMoment = new Date(pickedMoment?.format() as string);
        const dateValue = isEdit && date ? date : dateFromMoment;

        dispatch(saveTraining(dateValue)).then(() => {
            if (isJoint) dispatch(changeResultType(EStatus.empty));
        });
    }

    const drawerTitles: TDrawerTitles = {
        default: <React.Fragment>
            <PlusOutlined className={styles['drawer__title-icon']} />Добавление упражнений
        </React.Fragment>,
        edit: <React.Fragment>
            <EditOutlined className={styles['drawer__title-icon']} />Редактирование
        </React.Fragment>,
        noDate: <React.Fragment>
            <PlusOutlined className={styles['drawer__title-icon']} />Новая тренировка
        </React.Fragment>,
        joint: <React.Fragment>
            <PlusOutlined className={styles['drawer__title-icon']} />Совместная тренировка
        </React.Fragment>
    };

    return (
        <Drawer
            open={isDrawer}
            destroyOnClose={true}
            width={408}
            headerStyle={{ display: 'none' }}
            maskStyle={{ background: 'transparent' }}
            maskClosable={true}
            onClose={closeDrawer}
            placement={isMobile ? 'bottom' : 'right'}
            height={555}
            className={classNames(styles.drawer, { [styles['drawer-my-page']]: isMyTrainingPage })}
            data-test-id="modal-drawer-right"
        >
            <p className={styles.drawer__title}>
                {drawerTitles[drawerType]}
            </p>
            {!isMyTrainingPage && date &&
                <div className={styles['drawer__training-type-wrapper']}>
                    <CalendarTrainingList
                        listData={[{ key: '1', name: selectedTraining as string }]}
                        date={date}
                    />
                    <p>{convertDate(date)}</p>
                </div>}
            <div className={styles.drawer__form}>
                <CalendarDrawerForm
                    date={date}
                    pickedMoment={pickedMoment}
                    setPickedMoment={setPickedMoment}
                    setFormBackUp={setFormBackUp}
                />
            </div>
            {isWarning &&
                <p className={styles.drawer__warning}>
                    После сохранения внесенных изменений отредактировать проведенную тренировку будет невозможно
                </p>}
            {isMyTrainingPage &&
                <React.Fragment>
                    <Divider className={styles.drawer__divider} />
                    <Button
                        disabled={!isEdit || isJoint ? isSaveDisabled : false}
                        className={styles['drawer__conf-button']}
                        onClick={handleSave}
                    >
                        {isJoint ? 'Отправить приглашение' : 'Сохранить'}
                    </Button>
                </React.Fragment>}
        </Drawer>
    );
};
