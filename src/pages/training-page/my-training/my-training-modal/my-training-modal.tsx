import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { EBadgeColors } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectCalendarModalData, toggleIsDrawer } from '@redux/calendar-modal-slice';
import { getNamesInForm } from '@utils/calendar-utils/get-names-in-form';
import { Button, Divider } from 'antd';

import 'antd/dist/antd.css';
import styles from './my-training-modal.module.css';

type TProps = {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const MyTrainingModal: React.FC<TProps> = ({ setIsModal }) => {
    const dispatch = useAppDispatch();
    const exerciseNames = dispatch(getNamesInForm());
    const { modalCoord, selectedTraining } = useAppSelector(selectCalendarModalData);
    const borderColor = { ...EBadgeColors }[selectedTraining as string];

    return (
        <div
            className={styles.modal}
            style={{
                left: `${modalCoord.x}px`,
                top: `${modalCoord.y}px`
            }}
        >
            <div className={styles.modal__header} style={{ borderColor }}>
                <ArrowLeftOutlined
                    onClick={() => setIsModal(false)}
                    data-test-id="modal-exercise-training-button-close"
                />
                <p>{selectedTraining}</p>
            </div>
            <div className={styles.modal__body}>
                {exerciseNames.map(el => (
                    <div key={el.key} className={styles.body__trainings}>
                        <p className={styles.trainings__name}>{el.name}</p>
                    </div>
                ))}
            </div>
            <Divider className={styles.modal__divider} />
            <div className={styles['modal__button-wrapper']}>
                <Button
                    onClick={() => dispatch(toggleIsDrawer(true))}
                    className={styles.modal__button}
                >
                    Добавить упражнения
                </Button>
            </div>
        </div>
    );
};
