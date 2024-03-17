import React from 'react';
import 'antd/dist/antd.css';
import styles from './calendar-drawer.module.css';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { CalendarTrainingList } from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectCalendarModalData } from '@redux/calendarModalSlice';
import { useWindowSize } from '@uidotdev/usehooks';
import { convertDate } from '@utils/convert-date';
import { CalendarDrawerForm } from './calendar-drawer-form/calendar-drawer-form';
import { checkIsFuture } from '@utils/check-is-future';

type props = {
    date: Date
}

export const CalendarDrawer: React.FC<props> = ({ date }) => {
    const browserWidth = useWindowSize().width || 0;
    const isMobile = browserWidth <= 800;
    const { isEdit, isDrawer, selectedTraining } = useAppSelector(selectCalendarModalData);

    function handleDrawerClose() {
        const element = document.getElementById("drawer__close") as HTMLElement;
        element.click();
    }

    return (
        <Drawer
            open={isDrawer}
            width={408}
            headerStyle={{ display: "none" }}
            maskStyle={{ background: "transparent" }}
            maskClosable={true}
            onClose={handleDrawerClose}
            destroyOnClose={true}
            placement={isMobile ? "bottom" : "right"}
            height={555}
            className={styles["drawer"]}
            data-test-id="modal-drawer-right"
        >
            <p className={styles["drawer__title"]}>
                {isEdit
                    ? <><EditOutlined className={styles["drawer__title-icon"]} />Редактирование</>
                    : <><PlusOutlined className={styles["drawer__title-icon"]} />Добавление упражнений</>}
            </p>
            <div className={styles["drawer__training-type-wrapper"]}>
                <CalendarTrainingList
                    listData={[selectedTraining as string]}
                    date={date}
                />
                <p>{convertDate(date.toISOString())}</p>
            </div>
            <div className={styles["drawer__form"]}>
                <CalendarDrawerForm date={date} />
            </div>
            {isEdit && !checkIsFuture(date) && <p className={styles["drawer__warning"]}>После сохранения внесенных изменений отредактировать проведенную тренировку будет невозможно</p>}
        </Drawer>
    );
};
