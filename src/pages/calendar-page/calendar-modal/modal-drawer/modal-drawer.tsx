import React, { useEffect, useRef, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './modal-drawer.module.css';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Drawer, Form, FormInstance, Input } from 'antd';
import { getDayFromDate } from '@utils/get-day-from-date';
import { CalendarTrainingList } from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeExerciseFormFields, selectCalendarModalData, toggleIsDrawer } from '@redux/calendarModalSlice';
import { drawerFormFields } from '@constants/types';
import { sortEmptyDrawerForm } from '@utils/sort-empty-drawer-form';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { filterTrainingByName } from '@utils/filter-training-by-name';
import { selectTraining } from '@redux/trainingSlice';
import { calendarModalType } from '@constants/enums';

type props = {
    date: Date
}

export const ModalDrawer: React.FC<props> = ({ date }) => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const { isEdit, isDrawer, selectedTraining, exerciseFormFields, modalType } = useAppSelector(selectCalendarModalData);
    const listData = selectedTraining !== null ? [selectedTraining] : [];
    const [checkboxList, setCheckboxList] = useState<{ [key: number]: boolean }>({});
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const isView = modalType === calendarModalType.default;
    const cellDate = String(date).substring(0, 10);
    const form = useRef<FormInstance<{ exercises: drawerFormFields }>>(null);
    const initialFormValues = {
        exercises: Object.values(exerciseFormFields).length === 0
            ? [{
                name: undefined,
                replays: undefined,
                weight: undefined,
                approaches: undefined
            }]
            : Object.values(exerciseFormFields)
    };

    useEffect(() => {
        if (form.current) {
            form.current.resetFields()
        }
    }, [exerciseFormFields]);

    useEffect(() => {
        const formData = filterTrainingByName(training, cellDate, selectedTraining as string);
        dispatch(changeExerciseFormFields(formData));
    }, [dispatch, isEdit, selectedTraining, training, cellDate]);

    useEffect(() => {
        setIsDeleteDisabled(!Object.values(checkboxList).some(el => el === true));
    }, [checkboxList]);

    function handleCheckboxChange(event: CheckboxChangeEvent, key: number) {
        setCheckboxList(prev => ({
            ...prev,
            [key]: event.target.checked
        }));
    }

    function handleRemove(remove: (index: number | number[]) => void) {
        const checkboxKeys = Object.keys(checkboxList).map(key => Number(key));
        const checkboxTrueList = checkboxKeys.filter(key => checkboxList[key] === true);
        setCheckboxList(prev => {
            const newList = { ...prev };
            checkboxTrueList.forEach(key => {
                delete newList[key];
            });
            return newList;
        });
        remove(checkboxTrueList);
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
                    : isView
                        ? <>Просмотр упражнений</>
                        : <><PlusOutlined className={styles["drawer__title-icon"]} />Добавление упражнений</>}
            </p>
            <div className={styles["drawer__training-type-wrapper"]}>
                <CalendarTrainingList listData={listData} />
                <p>{getDayFromDate(date)}</p>
            </div>
            <div className={styles["drawer__form"]}>
                <Form
                    ref={form}
                    onFinish={onFinish}
                    initialValues={initialFormValues}
                >
                    <Form.List name="exercises">
                        {(fields, { add, remove }) => {
                            return (
                                <>
                                    {fields.map(({ name, key }) => (
                                        <div key={key}>
                                            <Form.Item name={[name, "name"]} required>
                                                <Input
                                                    placeholder="Упражнение"
                                                    addonAfter={isEdit && <Checkbox
                                                        checked={checkboxList[name]}
                                                        onChange={(event) => handleCheckboxChange(event, name)}
                                                        name={"checkbox"}
                                                    />}
                                                    disabled={isView}
                                                    className={styles["drawer__training-name-input"]}
                                                />
                                            </Form.Item>
                                            <div className={styles["drawer__inputs-wrapper"]}>
                                                <Form.Item name={[name, "replays"]} label="Подходы">
                                                    <Input addonBefore="+" type="number" placeholder="1" disabled={isView}></Input>
                                                </Form.Item>
                                                <Form.Item name={[name, "weight"]} label="Вес, кг">
                                                    <Input type="number" placeholder="0" disabled={isView}></Input>
                                                </Form.Item>
                                                <p className={styles["drawer__x"]}>X</p>
                                                <Form.Item name={[name, "approaches"]} label="Количество">
                                                    <Input type="number" placeholder="3" disabled={isView}></Input>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    ))}
                                    {!isView && <div className={`${styles["drawer__button-wrapper"]} ${isEdit && styles["edit"]}`}>
                                        <Form.Item>
                                            <Button
                                                className={styles["drawer__button"]}
                                                onClick={() => add()}
                                                type="text"
                                                icon={<PlusOutlined />}
                                            >
                                                Добавить ещё
                                            </Button>
                                        </Form.Item>
                                        {isEdit && <Form.Item>
                                            <Button
                                                className={styles["drawer__button"]}
                                                onClick={() => handleRemove(remove)}
                                                type="text"
                                                icon={<MinusOutlined />}
                                                disabled={isDeleteDisabled}
                                            >
                                                Удалить
                                            </Button>
                                        </Form.Item>}
                                    </div>}
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
