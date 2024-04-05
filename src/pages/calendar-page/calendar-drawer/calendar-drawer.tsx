import React, { useEffect, useState } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { EDrawer } from '@constants/enums';
import { TDrawerTitles } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarTrainingList } from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { changeExerciseFormFields, changeInterval, changeSelectedTraining, selectCalendarModalData, toggleIsDrawer, toggleIsEdit, toggleIsSaveDisabled } from '@redux/calendar-modal-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { checkIsFuture } from '@utils/check-is-future';
import { convertDate } from '@utils/convert-date';
import { saveTraining } from '@utils/requests/save-training';
import { Button, Divider, Drawer } from 'antd';
import { Moment } from 'moment';

import { CalendarDrawerForm } from './calendar-drawer-form/calendar-drawer-form';

import 'antd/dist/antd.css';
import styles from './calendar-drawer.module.css';

type TProps = {
    date?: Date
}

export const CalendarDrawer: React.FC<TProps> = ({ date }) => {
    const dispatch = useAppDispatch();
    const browserWidth = useWindowSize().width || 0;
    const isMobile = browserWidth <= 800;
    const { isEdit, isDrawer, selectedTraining, isSaveDisabled } = useAppSelector(selectCalendarModalData);
    const isNoDate = date === undefined;
    const isWarning = isNoDate ? false : isEdit && !checkIsFuture(date);
    const [drawerType, setDrawerType] = useState(EDrawer.default);
    const [pickedMoment, setPickedMoment] = useState<Moment | null>(null);

    useEffect(() => {
        if (isEdit) setDrawerType(EDrawer.edit);
        if (isNoDate) {
            setDrawerType(EDrawer.noDate);
            dispatch(toggleIsEdit(false));
        };
        if (!isEdit && !isNoDate) setDrawerType(EDrawer.default);
    }, [isEdit, isNoDate, dispatch]);

    useEffect(() => {
        if (isNoDate) {
            dispatch(changeSelectedTraining(null));
            dispatch(changeExerciseFormFields({}));
            dispatch(changeInterval(null));
            dispatch(toggleIsSaveDisabled(true));
        };
    }, [isNoDate, isDrawer, dispatch]);

    function handleClose() {
        const closeBtn = document.getElementById('drawer__close') as HTMLElement;

        closeBtn.click();
    }

    function handleSave() {
        dispatch(saveTraining(new Date(pickedMoment?.format() as string)));
        setPickedMoment(null);
        dispatch(toggleIsDrawer(false));
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
        </React.Fragment>
    };

    return (
        <Drawer
            open={isDrawer}
            destroyOnClose={isNoDate}
            width={408}
            headerStyle={{ display: 'none' }}
            maskStyle={{ background: 'transparent' }}
            maskClosable={true}
            onClose={() => handleClose()}
            placement={isMobile ? 'bottom' : 'right'}
            height={555}
            className={styles.drawer}
            data-test-id="modal-drawer-right"
        >
            <p className={styles.drawer__title}>
                {drawerTitles[drawerType]}
            </p>
            {!isNoDate &&
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
                />
            </div>
            {isWarning &&
                <p className={styles.drawer__warning}>
                    После сохранения внесенных изменений отредактировать проведенную тренировку будет невозможно
                </p>}
            {isNoDate &&
                <React.Fragment>
                    <Divider className={styles.drawer__divider} />
                    <Button
                        disabled={isSaveDisabled}
                        className={styles['drawer__conf-button']}
                        onClick={() => handleSave()}
                    >
                        Сохранить
                    </Button>
                </React.Fragment>}
        </Drawer>
    );
};
