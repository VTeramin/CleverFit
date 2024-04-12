import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CalendarTwoTone, CloseOutlined, MinusOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { EBadgeColors } from '@constants/enums';
import { intervalOptions } from '@constants/interval-options';
import { TDrawerFormFields, TFormData } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { TrainingSelect } from '@pages/calendar-page/calendar-modal/inner-new-training/training-select/training-select';
import { changeExerciseFormFields, changeInterval, selectCalendarModalData, toggleIsDrawer, toggleIsSaveDisabled } from '@redux/calendar-modal-slice';
import { selectTraining } from '@redux/training-slice';
import { selectUserJointTrainingList } from '@redux/user-joint-training-list-slice';
import { findTraining } from '@utils/calendar-utils/find-training';
import { getListData } from '@utils/calendar-utils/get-list-data';
import { sortCheckboxListFromEmpty } from '@utils/calendar-utils/sort-checkbox-list-from-empty';
import { sortDrawerFormFromEmpty } from '@utils/calendar-utils/sort-drawer-form-from-empty';
import { checkIsDatesEqual } from '@utils/check-is-dates-equal';
import { checkIsFuture } from '@utils/check-is-future';
import { getFixedDate } from '@utils/get-fixed-date';
import { checkIsSaveDisabled } from '@utils/training-utils/check-is-save-disabled';
import { Avatar, Badge, Button, Checkbox, ConfigProvider, DatePicker, Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import locale from 'antd/es/locale/ru_RU';
import classNames from 'classnames';
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
    const { isEdit, isJoint, selectedTraining, selectedPal, interval, exerciseFormFields, isDrawer } = useAppSelector(selectCalendarModalData);
    const userJointTrainingList = useAppSelector(selectUserJointTrainingList);
    const selectedPalData = userJointTrainingList.find(pal => pal.id === selectedPal);
    const training = useAppSelector(selectTraining);
    const isMyTrainingPage = pathname === '/training';
    const form = useRef<FormInstance<{ exercises: TDrawerFormFields }>>(null);
    const initialFormValues = { exercises: Object.values(exerciseFormFields) };
    const fixedDate = date ? getFixedDate(date) : '';
    const [isInterval, setIsInterval] = useState(false);
    const [checkboxList, setCheckboxList] = useState<{ [key: number]: boolean }>({});
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const isWarning = date ? !checkIsFuture(date) : false;
    const formWrapperClassNames = [
        'drawer__form-wrapper',
        isMyTrainingPage && 'drawer__form-wrapper-my-training',
        isInterval && 'drawer__form-wrapper-interval',
        isWarning && 'drawer__form-wrapper-edit-past'
    ].map(el => el ? styles[el] : '').join(' ');

    const [addButtonText, setAddButtonText] = useState(() => {
        if (isEdit) return 'Добавить ещё';
        if (isMyTrainingPage && !isEdit) return 'Добавление упражнений';

        return 'Добавить ещё упражнение';
    })

    useEffect(() => {
        if (!isDrawer) dispatch(toggleIsSaveDisabled(true));
    }, [dispatch, isDrawer]);

    useEffect(() => {
        form.current?.resetFields();
    }, [dispatch, selectedTraining]);

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

    const handleFormChange = () => {
        const checkResult = checkIsSaveDisabled({ form, date, pickedMoment, selectedTraining, exerciseFormFields });

        dispatch(toggleIsSaveDisabled(checkResult));
    }

    const handleFormValuesChange = (_: TFormData, allValues: TFormData) => setFormBackUp(allValues)

    const onFinish = (values: TFormData) => {
        if (values) dispatch(changeExerciseFormFields(sortDrawerFormFromEmpty(values)));
        dispatch(toggleIsDrawer(false));
    }

    function dateCellRender(cellMoment: Moment) {
        const trainingList = getListData(training, cellMoment.toDate());
        const todayClass = checkIsDatesEqual(new Date(Date.now()), cellMoment.toDate()) ? 'today' : 'empty';
        const emtyClass = trainingList.length === 0 ? 'empty' : 'no-empty'

        return (
            <div className={classNames(styles[emtyClass], styles[todayClass])}>
                {cellMoment.toDate().getDate()}
            </div>
        );
    }

    function handleAddLine(add: () => void) {
        add();
        if (isMyTrainingPage) setAddButtonText('Добавить ещё');
        if (selectedTraining === null) {
            const select = document.getElementById('select-training');

            select?.focus();
        }
    }

    return (
        <Form
            ref={form}
            onFinish={onFinish}
            onChange={handleFormChange}
            onValuesChange={handleFormValuesChange}
            initialValues={initialFormValues}
        >
            {isMyTrainingPage && <div className={styles['drawer__no-date-group']}>
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
                            dateRender={cellMoment => dateCellRender(cellMoment)}
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
            </div>}
            <Form.List name="exercises">
                {(fields, { add, remove }) => (
                    <React.Fragment>
                        <div className={formWrapperClassNames}>
                            {fields.map(({ name, key }) => (
                                <div key={key} className={styles['drawer__form-item-wrapper']}>
                                    <Form.Item name={[name, 'name']} required={true}>
                                        <Input
                                            placeholder="Упражнение"
                                            addonAfter={isEdit && <Checkbox
                                                checked={checkboxList[name]}
                                                onChange={event => handleCheckboxChange(event, name)}
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
                        </div>
                        <div className={classNames(styles['drawer__button-wrapper'], { [styles.edit]: isEdit })}>
                            <Form.Item>
                                <Button
                                    className={styles.drawer__button}
                                    onClick={() => handleAddLine(add)}
                                    type="text"
                                    icon={<PlusOutlined />}
                                    data-test-id='modal-create-exercise-select'
                                >
                                    {addButtonText}
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
        </Form >
    );
};
