import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CalendarTwoTone, CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { intervalOptions } from '@constants/interval-options';
import { TDrawerFormFields } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { TrainingSelect } from '@pages/calendar-page/calendar-modal/inner-new-training/training-select/training-select';
import { changeExerciseFormFields, changeInterval, selectCalendarModalData, toggleIsDrawer, toggleIsSaveDisabled } from '@redux/calendar-modal-slice';
import { selectTraining } from '@redux/training-slice';
import { findTraining } from '@utils/calendar-utils/find-training';
import { getListData } from '@utils/calendar-utils/get-list-data';
import { sortCheckboxListFromEmpty } from '@utils/calendar-utils/sort-checkbox-list-from-empty';
import { sortDrawerFormFromEmpty } from '@utils/calendar-utils/sort-drawer-form-from-empty';
import { checkIsDatesEqual } from '@utils/check-is-dates-equal';
import { getFixedDate } from '@utils/get-fixed-date';
import { checkIsSaveDisabled } from '@utils/training-utils/check-is-save-disabled';
import { Button, Checkbox, ConfigProvider, DatePicker, Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import locale from 'antd/es/locale/ru_RU';
import moment, { Moment } from 'moment';

import 'antd/dist/antd.css';
import styles from '../calendar-drawer.module.css';

type TProps = {
    pickedMoment: Moment | null,
    setPickedMoment: React.Dispatch<React.SetStateAction<Moment | null>>,
    setFormBackUp: React.Dispatch<React.SetStateAction<{
        exercises: TDrawerFormFields;
    } | null>>,
    date?: Date,
}

export const CalendarDrawerForm: React.FC<TProps> = ({ date, pickedMoment, setPickedMoment, setFormBackUp }) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { isEdit, selectedTraining, interval, exerciseFormFields, isDrawer } = useAppSelector(selectCalendarModalData);
    const training = useAppSelector(selectTraining);
    const isMyTrainingPage = pathname === '/training';
    const form = useRef<FormInstance<{ exercises: TDrawerFormFields }>>(null);
    const initialFormValues = { exercises: Object.values(exerciseFormFields) };
    const fixedDate = date ? getFixedDate(date) : '';
    const [isInterval, setIsInterval] = useState(false);
    const [checkboxList, setCheckboxList] = useState<{ [key: number]: boolean }>({});
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);

    useEffect(() => {
        if (!isDrawer) dispatch(toggleIsSaveDisabled(true));
    }, [dispatch, isDrawer]);

    useEffect(() => {
        if (fixedDate !== '') {
            const period = dispatch(findTraining(new Date(fixedDate), selectedTraining as string))?.parameters?.period || 0;

            setIsInterval(period > 0);
            dispatch(changeInterval(period > 0 ? period : null));
        };
    }, [dispatch, selectedTraining, fixedDate]);

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
        setCheckboxList(prev => sortCheckboxListFromEmpty(checkboxList, prev, remove));
    }

    function handleFormChange() {
        const chekcResult = checkIsSaveDisabled({ form, date, pickedMoment, selectedTraining, exerciseFormFields });

        dispatch(toggleIsSaveDisabled(chekcResult));
    }

    function onFinish(values: { exercises: TDrawerFormFields }) {
        dispatch(changeExerciseFormFields(sortDrawerFormFromEmpty(values)));
        dispatch(toggleIsDrawer(false));
    }

    function dateCellRender(cellMoment: Moment) {
        const trainingList = getListData(training, cellMoment.toDate());
        const todayClass = checkIsDatesEqual(new Date(Date.now()), cellMoment.toDate()) ? 'today' : 'empty';
        const emtyClass = trainingList.length === 0 ? 'empty' : 'no-empty'

        return (
            <div className={`${styles[emtyClass]} ${styles[todayClass]}`}>
                {cellMoment.toDate().getDate()}
            </div>
        );
    }

    return (
        <Form
            ref={form}
            onFinish={values => onFinish(values)}
            onChange={() => handleFormChange()}
            onValuesChange={(_, allValues) => setFormBackUp(allValues)}
            initialValues={initialFormValues}
        >
            {isMyTrainingPage && <div className={styles['drawer__no-date-group']}>
                <TrainingSelect disabled={isEdit} />
                <div className={styles['no-date-group__date']}>
                    <ConfigProvider locale={locale}>
                        <DatePicker
                            format='DD.MM.YYYY'
                            disabled={isEdit}
                            disabledDate={currentMoment => currentMoment.toDate() <= new Date(Date.now())}
                            value={date ? moment(date) : pickedMoment}
                            onChange={value => setPickedMoment(value)}
                            suffixIcon={<CalendarTwoTone twoToneColor='var(--character-light-disable-25)' />}
                            dateRender={cellMoment => dateCellRender(cellMoment)}
                            popupClassName={styles['no-date-group__calendar-popup']}
                        />
                    </ConfigProvider>
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
            <Form.List name="exercises">
                {(fields, { add, remove }) => (
                    <React.Fragment>

                        {fields.map(({ name, key }) => (
                            <div key={key} className={styles['drawer__form-wrapper']}>
                                <Form.Item name={[name, 'name']} required={true}>
                                    <Input
                                        placeholder="Упражнение"
                                        addonAfter={isEdit && !isMyTrainingPage && <Checkbox
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
                                    {isMyTrainingPage ? 'Добавить ещё упражнение' : 'Добавить ещё'}
                                </Button>
                            </Form.Item>
                            {isEdit && !isMyTrainingPage && <Form.Item>
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
