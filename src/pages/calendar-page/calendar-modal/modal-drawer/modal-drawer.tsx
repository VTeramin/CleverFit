import React from 'react';
import 'antd/dist/antd.css';
import styles from './modal-drawer.module.css';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input } from 'antd';
import { getDayFromDate } from '@utils/get-day-from-date';
import { CalendarTrainingList } from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeExerciseFormFields, selectCalendarModalData, toggleIsDrawer } from '@redux/calendarModalSlice';
import { drawerFormFields } from '@constants/types';
import { sortEmptyDrawerForm } from '@utils/sort-empty-drawer-form';

type props = {
    date: Date
}

export const ModalDrawer: React.FC<props> = ({ date }) => {
    const dispatch = useAppDispatch();
    const { isEdit, isDrawer, selectedTraining, exerciseFormFields } = useAppSelector(selectCalendarModalData);
    const listData = selectedTraining !== null ? [selectedTraining] : [];

    const initialFormValues = {
        exercises: Object.values(exerciseFormFields).length === 0
            ? [{
                name: undefined,
                replays: undefined,
                weight: undefined,
                approaches: undefined
            }]
            : Object.values(exerciseFormFields)
    }

    function handleDrawerClose() {
        const element = document.getElementById("drawer__close") as HTMLElement;
        element.click();
    }

    function onFinish(values: { exercises: drawerFormFields }) {
        dispatch(changeExerciseFormFields(sortEmptyDrawerForm(values)));
        dispatch(toggleIsDrawer(false));
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
            className={styles["drawer"]}
        >
            <p className={styles["drawer__title"]}>
                {isEdit
                    ? <><EditOutlined className={styles["drawer__title-icon"]} />Редактирование</>
                    : <><PlusOutlined className={styles["drawer__title-icon"]} />Добавление упражнений</>}
            </p>
            <div className={styles["drawer__training-type-wrapper"]}>
                <CalendarTrainingList listData={listData} />
                <p>{getDayFromDate(date)}</p>
            </div>
            <div className={styles["drawer__form"]}>
                <Form
                    onFinish={onFinish}
                    className="form"
                    initialValues={initialFormValues}
                >
                    <Form.List name="exercises">
                        {(fields, { add }) => {
                            return (
                                <>
                                    {fields.map(({ name, key }) => (
                                        <div key={key}>
                                            <Form.Item name={[name, "name"]} required>
                                                <Input placeholder="Упражнение" className={styles["drawer__training-name-input"]} />
                                            </Form.Item>
                                            <div className={styles["drawer__inputs-wrapper"]}>
                                                <Form.Item name={[name, "replays"]} label="Подходы">
                                                    <Input addonBefore="+" type="number" placeholder="1"></Input>
                                                </Form.Item>
                                                <Form.Item name={[name, "weight"]} label="Вес, кг">
                                                    <Input type="number" placeholder="0"></Input>
                                                </Form.Item>
                                                <p className={styles["drawer__x"]}>X</p>
                                                <Form.Item name={[name, "approaches"]} label="Количество">
                                                    <Input type="number" placeholder="3"></Input>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            className={styles["drawer__button"]}
                                            onClick={() => add()}
                                            icon={<PlusOutlined />}
                                        >
                                            Добавить ещё
                                        </Button>
                                    </Form.Item>
                                </>
                            )
                        }}
                    </Form.List>
                        <Button
                            htmlType="submit"
                            type="text"
                            className={styles["drawer__close"]}
                            id="drawer__close"
                        >
                            <CloseOutlined />
                        </Button>
                </Form>
            </div>
        </Drawer>
    );
};
