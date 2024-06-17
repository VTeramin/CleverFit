import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { TCheckboxList, TDrawerFormFields, TFormData } from '@constants/types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeExerciseFormFields, selectCalendarModalData, toggleIsDrawer, toggleIsSaveDisabled } from '@redux/calendar-modal-slice';
import { getCheckboxDeleteKeys } from '@utils/calendar-utils/get-checkbox-delete-keys';
import { sortCheckboxListFromEmpty } from '@utils/calendar-utils/sort-checkbox-list-from-empty';
import { sortDrawerFormFromEmpty } from '@utils/calendar-utils/sort-drawer-form-from-empty';
import { checkIsSaveDisabled } from '@utils/training-utils/check-is-save-disabled';
import { Button, Form, FormInstance } from 'antd';
import classNames from 'classnames';
import { Moment } from 'moment';

import { ExerciseForm } from './exercise-form/exercise-form';
import { NoDateGroup } from './no-date-group/no-date-group';

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
    const { isEdit, selectedTraining, exerciseFormFields, isDrawer } = useAppSelector(selectCalendarModalData);
    const isMyTrainingPage = pathname === '/training';
    const form = useRef<FormInstance<{ exercises: TDrawerFormFields }>>(null);
    const initialFormValues = { exercises: Object.values(exerciseFormFields) };
    const [isInterval, setIsInterval] = useState(false);
    const [checkboxList, setCheckboxList] = useState<TCheckboxList>({});
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);

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
        setIsDeleteDisabled(!Object.values(checkboxList).some(el => el === true));
    }, [checkboxList]);

    const handleFormChange = () => {
        const checkResult = checkIsSaveDisabled({ form, date, pickedMoment, selectedTraining, exerciseFormFields });

        dispatch(toggleIsSaveDisabled(checkResult));
    }

    const handleFormValuesChange = (_: TFormData, allValues: TFormData) => setFormBackUp(allValues)

    const onFinish = (values: TFormData) => {
        if (values) dispatch(changeExerciseFormFields(sortDrawerFormFromEmpty(values)));
        dispatch(toggleIsDrawer(false));
    }

    const handleAddLine = (add: () => void) => {
        add();
        if (isMyTrainingPage) setAddButtonText('Добавить ещё');
        if (selectedTraining === null) {
            const select = document.getElementById('select-training');

            select?.focus();
        }
    }

    const handleDeleteLine = (remove: (index: number | number[]) => void) => {
        const deleteKeys = getCheckboxDeleteKeys(checkboxList);

        setCheckboxList(prev => sortCheckboxListFromEmpty(checkboxList, prev));

        remove(deleteKeys);
    }

    return (
        <div className={styles.drawer__form}>
            <Form
                ref={form}
                onFinish={onFinish}
                onChange={handleFormChange}
                onValuesChange={handleFormValuesChange}
                initialValues={initialFormValues}
            >
                {isMyTrainingPage && (
                    <NoDateGroup
                        date={date}
                        pickedMoment={pickedMoment}
                        setPickedMoment={setPickedMoment}
                        isInterval={isInterval}
                        setIsInterval={setIsInterval}
                    />
                )}
                <Form.List name="exercises">
                    {(fields, { add, remove }) => (
                        <React.Fragment>
                            <ExerciseForm
                                fields={fields}
                                isInterval={isInterval}
                                checkboxList={checkboxList}
                                setCheckboxList={setCheckboxList}
                                date={date}
                            />
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
                                        onClick={() => handleDeleteLine(remove)}
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
        </div>
    );
};
