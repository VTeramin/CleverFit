import React, { useEffect, useRef, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './modal-drawer.module.css';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Drawer, Form, FormInstance, Input, InputNumber } from 'antd';
import { getDayFromDate } from '@utils/get-day-from-date';
import { CalendarTrainingList } from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeExerciseFormFields, selectCalendarModalData, toggleIsDrawer } from '@redux/calendarModalSlice';
import { drawerFormFields } from '@constants/types';
import { sortEmptyDrawerForm } from '@utils/sort-empty-drawer-form';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { filterTrainingByName } from '@utils/filter-training-by-name';
import { selectTraining } from '@redux/trainingSlice';
import { useWindowSize } from '@uidotdev/usehooks';

type props = {
    date: Date
}

export const ModalDrawer: React.FC<props> = ({ date }) => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const browserWidth = useWindowSize().width || 0;
    const isMobile = browserWidth <= 800;
    const { isEdit, isDrawer, selectedTraining, exerciseFormFields } = useAppSelector(selectCalendarModalData);
    const listData = selectedTraining !== null ? [selectedTraining] : [];
    const [checkboxList, setCheckboxList] = useState<{ [key: number]: boolean }>({});
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
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
        if (form.current) form.current.resetFields();
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
                                                        data-test-id={`modal-drawer-right-checkbox-exercise${name}`}
                                                    />}
                                                    className={styles["drawer__training-name-input"]}
                                                    data-test-id={`modal-drawer-right-input-exercise${name}`}
                                                />
                                            </Form.Item>
                                            <div className={styles["drawer__inputs-wrapper"]}>
                                                <Form.Item name={[name, "replays"]} label="Подходы">
                                                    <InputNumber
                                                        addonBefore="+"
                                                        placeholder="1"
                                                        min={1}
                                                        data-test-id={`modal-drawer-right-input-approach${name}`}
                                                    ></InputNumber>
                                                </Form.Item>
                                                <Form.Item name={[name, "weight"]} label="Вес, кг">
                                                    <InputNumber
                                                        placeholder="0"
                                                        min={0}
                                                        data-test-id={`modal-drawer-right-input-weight${name}`}
                                                    ></InputNumber>
                                                </Form.Item>
                                                <p className={styles["drawer__x"]}>X</p>
                                                <Form.Item name={[name, "approaches"]} label="Количество">
                                                    <InputNumber
                                                        placeholder="3"
                                                        min={1}
                                                        data-test-id={`modal-drawer-right-input-quantity${name}`}
                                                    ></InputNumber>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    ))}
                                    {<div className={`${styles["drawer__button-wrapper"]} ${isEdit && styles["edit"]}`}>
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
                        data-test-id="modal-drawer-right-button-close"
                    >
                        <CloseOutlined />
                    </Button>
                </Form>
            </div>
            {isEdit && date <= new Date(Date.now()) &&
                <p className={styles["drawer__warning"]}>После сохранения внесенных изменений отредактировать проведенную тренировку будет невозможно</p>
            }
        </Drawer>
    );
};
