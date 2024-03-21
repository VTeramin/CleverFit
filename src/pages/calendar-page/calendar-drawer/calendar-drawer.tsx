import React from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarTrainingList } from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { selectCalendarModalData } from '@redux/calendar-modal-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { checkIsFuture } from '@utils/check-is-future';
import { convertDate } from '@utils/convert-date';
import { Drawer } from 'antd';

import { CalendarDrawerForm } from './calendar-drawer-form/calendar-drawer-form';

import 'antd/dist/antd.css';
import styles from './calendar-drawer.module.css';

type TProps = {
    date: Date
}

export const CalendarDrawer: React.FC<TProps> = ({ date }) => {
    const browserWidth = useWindowSize().width || 0;
    const isMobile = browserWidth <= 800;
    const { isEdit, isDrawer, selectedTraining } = useAppSelector(selectCalendarModalData);

    function handleDrawerClose() {
        const element = document.getElementById('drawer__close') as HTMLElement;

        element.click();
    }

    return (
        <Drawer
            open={isDrawer}
            width={408}
            headerStyle={{ display: 'none' }}
            maskStyle={{ background: 'transparent' }}
            maskClosable={true}
            onClose={() => handleDrawerClose()}
            destroyOnClose={true}
            placement={isMobile ? 'bottom' : 'right'}
            height={555}
            className={styles.drawer}
            data-test-id="modal-drawer-right"
        >
            <p className={styles.drawer__title}>
                {isEdit
                    ? <React.Fragment><EditOutlined className={styles['drawer__title-icon']} />Редактирование</React.Fragment>
                    : <React.Fragment><PlusOutlined className={styles['drawer__title-icon']} />Добавление упражнений</React.Fragment>}
            </p>
            <div className={styles['drawer__training-type-wrapper']}>
                <CalendarTrainingList
                    listData={[selectedTraining as string]}
                    date={date}
                />
                <p>{convertDate(date)}</p>
            </div>
            <div className={styles.drawer__form}>
                <CalendarDrawerForm date={date} />
            </div>
            {isEdit && !checkIsFuture(date) && <p className={styles.drawer__warning}>После сохранения внесенных изменений отредактировать проведенную тренировку будет невозможно</p>}
        </Drawer>
    );
};
