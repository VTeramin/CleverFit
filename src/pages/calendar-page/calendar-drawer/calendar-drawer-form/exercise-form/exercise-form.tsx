import React from 'react';
import { useLocation } from 'react-router-dom';
import { TCheckboxList, } from '@constants/types';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectCalendarModalData, } from '@redux/calendar-modal-slice';
import { checkIsFuture } from '@utils/check-is-future';
import { Checkbox, Form, FormListFieldData, Input, InputNumber } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import 'antd/dist/antd.css';
import styles from './exercise-form.module.css';

type TProps = {
    fields: FormListFieldData[],
    isInterval: boolean,
    checkboxList:  TCheckboxList,
    setCheckboxList: React.Dispatch<React.SetStateAction<TCheckboxList>>
    date?: Date,
}

export const ExerciseForm: React.FC<TProps> = ({ fields, isInterval, checkboxList, setCheckboxList, date }) => {
    const { isEdit, isJoint } = useAppSelector(selectCalendarModalData);
    const { pathname } = useLocation();
    const isMyTrainingPage = pathname === '/training';
    const isWarning = date ? !checkIsFuture(date) : false;
    const formWrapperClassNames = [
        'drawer__form-wrapper',
        isMyTrainingPage && 'drawer__form-wrapper-my-training',
        isJoint && 'drawer__form-wrapper-joint',
        isInterval && 'drawer__form-wrapper-interval',
        isWarning && 'drawer__form-wrapper-edit-past'
    ].map(el => el ? styles[el] : '').join(' ');

    const handleCheckboxChange = (event: CheckboxChangeEvent, name: number) => {
        setCheckboxList(prev => ({
            ...prev,
            [name]: event.target.checked
        }));
    }

    return (
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
                            maxLength={32}
                            className={styles['drawer__training-name-input']}
                            data-test-id={`modal-drawer-right-input-exercise${name}`}
                        />
                    </Form.Item>
                    <div className={styles['drawer__inputs-wrapper']}>
                        <Form.Item name={[name, 'approaches']} label="Подходы" colon={false}>
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
                        <Form.Item name={[name, 'replays']} label="Количество" colon={false}>
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
    );
};
