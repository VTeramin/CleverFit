import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styles from './modal-drawer.module.css';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input } from 'antd';
import { getDayFromDate } from '@utils/get-day-from-date';
import { FieldData } from 'rc-field-form/lib/interface';
import { getTrainingNames } from '@utils/get-trainings-names';
import { exercise, formFields } from '@constants/types';
import { convertFormDataToExercises } from '@utils/convert-form-data-to-exercies';

type props = {
    date: Date,
    isDrawer: boolean,
    setIsDrawer: React.Dispatch<React.SetStateAction<boolean>>,
    selectedValue: string
    setTrainingNames: React.Dispatch<React.SetStateAction<string[]>>,
    setExercises: React.Dispatch<React.SetStateAction<exercise[]>>
}

export const ModalDrawer: React.FC<props> = ({ date, isDrawer, setIsDrawer, selectedValue, setTrainingNames, setExercises }) => {
    const [formFields, setFormFields] = useState<formFields>({});
    const [trainingFormArr, setTrainingFormArr] = useState([0]);

    function addTrainingForm() {
        setTrainingFormArr(prev => [...prev, prev.length])
    }

    function handleFormChange(allFields: FieldData[], ind: number) {
        if (allFields[0].value !== undefined) setFormFields(prev => ({ ...prev, [ind]: allFields }));
    }

    function handleCloseDrawer() {
        const keys = Object.keys(formFields);
        setTrainingFormArr(prev => prev.map(el => keys.includes(el.toString()) ? el : -1));
        setTrainingNames(getTrainingNames(formFields));
        setExercises(convertFormDataToExercises(formFields));
        setIsDrawer(false);
    }

    const trainings = trainingFormArr.filter(el => el !== -1).map(ind => (
        <Form
            key={ind}
            fields={formFields[ind]}
            onFieldsChange={(_, allFields) => handleFormChange(allFields, ind)}
        >
            <Form.Item name="name" required>
                <Input placeholder="Упражнение" className={styles["drawer__training-name-input"]} />
            </Form.Item>
            <div className={styles["drawer__inputs-wrapper"]}>
                <Form.Item name="replays" label="Подходы">
                    <Input addonBefore="+" type="number" placeholder="1"></Input>
                </Form.Item>
                <Form.Item name="weight" label="Вес, кг">
                    <Input type="number" placeholder="0"></Input>
                </Form.Item>
                <p className={styles["drawer__x"]}>X</p>
                <Form.Item name="approaches" label="Количество">
                    <Input type="number" placeholder="3"></Input>
                </Form.Item>
            </div>
        </Form>
    ));

    return (
        <Drawer
            open={isDrawer}
            width={408}
            headerStyle={{ display: "none" }}
            maskStyle={{ background: "transparent" }}
            onClose={handleCloseDrawer}
            className={styles["drawer"]}
        >
            <p className={styles["drawer__title"]}>
                <PlusOutlined className={styles["drawer__title-icon"]} />Добавление упражнений
            </p>
            <div className={styles["drawer__training-type-wrapper"]}>
                <ul className={styles["drawer__training-type"]}>
                    <li>{selectedValue}</li>
                </ul>
                <p>{getDayFromDate(date)}</p>
            </div>
            <div className={styles["drawer__form"]}>
                {trainings}
                <Button
                    className={styles["drawer__button"]}
                    onClick={addTrainingForm}
                >
                    <PlusOutlined />Добавить ещё
                </Button>
            </div>
            <CloseOutlined
                onClick={handleCloseDrawer}
                className={styles["drawer__close"]}
            />
        </Drawer>
    );
};
