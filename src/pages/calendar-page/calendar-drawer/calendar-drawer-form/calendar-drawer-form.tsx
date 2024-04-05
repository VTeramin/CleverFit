import React, { useEffect, useRef, useState } from 'react';
import { CalendarTwoTone, CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { intervalOptions } from '@constants/interval-options';
import { TDrawerFormFields } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { TrainingSelect } from '@pages/calendar-page/calendar-modal/inner-new-training/training-select/training-select';
import { changeExerciseFormFields, changeInterval, selectCalendarModalData, toggleIsDrawer, toggleIsSaveDisabled } from '@redux/calendar-modal-slice';
import { selectTraining } from '@redux/training-slice';
import { findExercises } from '@utils/calendar-utils/find-exercises';
import { sortDrawerFormFromEmpty } from '@utils/calendar-utils/sort-drawer-form-from-empty';
import { getFixedDate } from '@utils/get-fixed-date';
import { Button, Checkbox, DatePicker, Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Moment } from 'moment';

import 'antd/dist/antd.css';
import styles from '../calendar-drawer.module.css';

type TProps = {
    pickedMoment: Moment | null,
    setPickedMoment: React.Dispatch<React.SetStateAction<Moment | null>>,
    date?: Date,
}

export const CalendarDrawerForm: React.FC<TProps> = ({ date, pickedMoment, setPickedMoment }) => {
    const dispatch = useAppDispatch();
    const isNoDate = date === undefined;
    const training = useAppSelector(selectTraining);
    const { isEdit, selectedTraining, interval, exerciseFormFields } = useAppSelector(selectCalendarModalData);
    const form = useRef<FormInstance<{ exercises: TDrawerFormFields }>>(null);
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
    const [isInterval, setIsInterval] = useState(false);

    useEffect(() => {
        if (form.current) form.current.resetFields();
    }, [exerciseFormFields]);

    const fixedDate = isNoDate ? '' : getFixedDate(date);

    useEffect(() => {
        if (!isNoDate) {
            const formData = dispatch(findExercises(fixedDate, selectedTraining as string));

            dispatch(changeExerciseFormFields(formData));
        }
    }, [dispatch, isEdit, selectedTraining, training, fixedDate, isNoDate]);

    const [checkboxList, setCheckboxList] = useState<{ [key: number]: boolean }>({});
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);

    useEffect(() => {
        setIsDeleteDisabled(!Object.values(checkboxList).some(el => el === true));
    }, [checkboxList]);

    function handleCheckboxChange(event: CheckboxChangeEvent, key: number) {
        setCheckboxList(prev => ({
            ...prev,
            [key]: event.target.checked
        }));
    }

    function handleDelete(remove: (index: number | number[]) => void) {
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

    function handleFormChange() {
        const formFields = form.current?.getFieldsValue(exerciseFormFields).exercises;
        const isAnyExercises = formFields.filter((el: TDrawerFormFields) => el.name).length;

        dispatch(toggleIsSaveDisabled(pickedMoment === null || selectedTraining === null || form.current === null || !isAnyExercises));
    }

    function onFinish(values: { exercises: TDrawerFormFields }) {
        dispatch(changeExerciseFormFields(sortDrawerFormFromEmpty(values)));
        dispatch(toggleIsDrawer(false));
    }

    return (
        <Form
            ref={form}
            onFinish={values => onFinish(values)}
            onChange={() => handleFormChange()}
            initialValues={initialFormValues}
        >
            <Form.List name="exercises">
                {(fields, { add, remove }) => (
                    <React.Fragment>
                        {isNoDate && <div className={styles['drawer__no-date-group']}>
                            <TrainingSelect />
                            <div className={styles['no-date-group__date']}>
                                <DatePicker
                                    size='small'
                                    format='DD.MM.YYYY'
                                    value={pickedMoment}
                                    onChange={value => setPickedMoment(value)}
                                    suffixIcon={<CalendarTwoTone twoToneColor='var(--character-light-disable-25)' />}
                                />
                                <Checkbox
                                    checked={isInterval}
                                    onChange={event => setIsInterval(event.target.checked)}
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
                            />}
                        </div>}
                        {fields.map(({ name, key }) => (
                            <div key={key} className={styles['drawer__form-wrapper']}>
                                <Form.Item name={[name, 'name']} required={true}>
                                    <Input
                                        placeholder="Упражнение"
                                        addonAfter={isEdit && <Checkbox
                                            checked={checkboxList[name]}
                                            onChange={(event) => handleCheckboxChange(event, name)}
                                            name="checkbox"
                                            data-test-id={`modal-drawer-right-checkbox-exercise${name}`}
                                        />}
                                        className={styles['drawer__training-name-input']}
                                        data-test-id={`modal-drawer-right-input-exercise${name}`}
                                    />
                                </Form.Item>
                                <div className={styles['drawer__inputs-wrapper']}>
                                    <Form.Item name={[name, 'replays']} label="Подходы" colon={false}>
                                        <InputNumber
                                            addonBefore="+"
                                            placeholder="1"
                                            min={1}
                                            data-test-id={`modal-drawer-right-input-approach${name}`}
                                        />
                                    </Form.Item>
                                    <Form.Item name={[name, 'weight']} label="Вес, кг" colon={false}>
                                        <InputNumber
                                            placeholder="0"
                                            min={0}
                                            data-test-id={`modal-drawer-right-input-weight${name}`}
                                        />
                                    </Form.Item>
                                    <p className={styles.drawer__x}>X</p>
                                    <Form.Item name={[name, 'approaches']} label="Количество" colon={false}>
                                        <InputNumber
                                            placeholder="3"
                                            min={1}
                                            data-test-id={`modal-drawer-right-input-quantity${name}`}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        ))}
                        <div className={`${styles['drawer__button-wrapper']} ${isEdit && styles.edit}`}>
                            <Form.Item>
                                <Button
                                    className={styles.drawer__button}
                                    onClick={() => add()}
                                    type="text"
                                    icon={<PlusOutlined />}
                                >
                                    {isNoDate ? 'Добавить ещё упражнение' : 'Добавить ещё'}
                                </Button>
                            </Form.Item>
                            {isEdit && <Form.Item>
                                <Button
                                    className={styles.drawer__button}
                                    onClick={() => handleDelete(remove)}
                                    type="text"
                                    icon={<MinusOutlined />}
                                    disabled={isDeleteDisabled}
                                >
                                    Удалить
                                </Button>
                            </Form.Item>}
                        </div>
                    </React.Fragment>
                )}
            </Form.List>
            <Button
                htmlType="submit"
                type="text"
                className={styles.drawer__close}
                id="drawer__close"
                data-test-id="modal-drawer-right-button-close"
            >
                <CloseOutlined />
            </Button>
        </Form>
    );
};
