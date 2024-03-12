import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styles from './modal-drawer.module.css';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input } from 'antd';
import { getDayFromDate } from '@utils/get-day-from-date';
import { FieldData } from 'rc-field-form/lib/interface';
import { getTrainingNames } from '@utils/get-trainings-names';

type props = {
    date: Date,
    isDrawer: boolean,
    setIsDrawer: React.Dispatch<React.SetStateAction<boolean>>,
    selectedValue: string
    setTrainingNames: React.Dispatch<React.SetStateAction<string[]>>
}

export const ModalDrawer: React.FC<props> = ({ date, isDrawer, setIsDrawer, selectedValue, setTrainingNames }) => {
    const [formFields, setFormFields] = useState<FieldData[]>([]);
    const [trainingFormArr, setTrainingFormArr] = useState([0]);
    const trainings = trainingFormArr.map((_, ind) => (
        <div key={ind}>
            <Form.Item name={`${ind} training-name`} required>
                <Input placeholder="Упражнение" className={styles["drawer__training-name-input"]} />
            </Form.Item>
            <div className={styles["drawer__inputs-wrapper"]}>
                <Form.Item name={`${ind} training-number`} label="Подходы">
                    <Input addonBefore="+" type="number" placeholder="1"></Input>
                </Form.Item>
                <Form.Item name={`${ind} training-weight`} label="Вес, кг">
                    <Input type="number" placeholder="0"></Input>
                </Form.Item>
                <p className={styles["drawer__x"]}>X</p>
                <Form.Item name={`${ind} training-repeats`} label="Количество">
                    <Input type="number" placeholder="3"></Input>
                </Form.Item>
            </div>
        </div>
    ));

    function addTrainingForm() {
        setTrainingFormArr(prev => [...prev, prev.length])
    }

    function handleFormChange(allFields: FieldData[]) {
        setFormFields(allFields.map(el => ({ name: el.name, value: el.value })));
    }

    function handleCloseDrawer() {
        setTrainingNames(getTrainingNames(formFields));
        setIsDrawer(false);
    }

    return (
        <Drawer
            open={isDrawer}
            width={408}
            headerStyle={{ display: "none" }}
            mask={false}
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
            <Form
                fields={formFields}
                onFieldsChange={(_, allFields) => handleFormChange(allFields)}
                className={styles["drawer__form"]}
            >
                {trainings}
                <Form.Item>
                    <Button
                        className={styles["drawer__button"]}
                        onClick={addTrainingForm}
                    >
                        <PlusOutlined />Добавить ещё
                    </Button>
                </Form.Item>
            </Form>
            <CloseOutlined
                onClick={handleCloseDrawer}
                className={styles["drawer__close"]}
            />
        </Drawer>
    );
};
