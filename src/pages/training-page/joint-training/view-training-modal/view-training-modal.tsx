/* eslint-disable no-underscore-dangle */
import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { EBadgeColors } from '@constants/enums';
import { intervalOptions } from '@constants/interval-options';
import { TTraining } from '@constants/types';
import { useOutsideClick } from '@hooks/use-outside-click';
import { useWindowSize } from '@uidotdev/usehooks';
import { convertDate } from '@utils/convert-date';
import { Badge, Button, Divider } from 'antd';

import 'antd/dist/antd.css';
import styles from './view-training-modal.module.css';

type TProps = {
    trainingData: TTraining,
    setIsView: React.Dispatch<React.SetStateAction<boolean>>
}

export const ViewTrainingModal: React.FC<TProps> = ({ trainingData, setIsView }) => {
    const modalRef = useOutsideClick(() => setIsView(false));
    const { name, parameters, date, exercises } = trainingData;
    const width = useWindowSize().width || 0;
    const isFullWidth = width > 1400;
    const mobileCoords = { bottom: '20px', left: '10px' };
    const desctopCoords = { top: '94px', left: '196px' };

    return (
        <div
            className={styles.modal}
            ref={modalRef}
            style={isFullWidth ? desctopCoords : mobileCoords}
            data-test-id='joint-training-review-card'
        >
            <div className={styles.modal__header}>
                <Badge
                    text={name}
                    color={EBadgeColors[name as keyof typeof EBadgeColors]}
                />
                <Button
                    type='text'
                    onClick={() => setIsView(false)}
                    onScrollCapture={() => setIsView(false)}
                    className={styles.modal__close}
                >
                    <CloseOutlined />
                </Button>
            </div>
            <Divider className={styles.modal__divider} />
            <div className={styles.modal__info}>
                <div className={styles.info__header}>
                    <p className={styles.info__period}>
                        {parameters?.repeat && intervalOptions.find(el => el.value === parameters.period)?.label}
                    </p>
                    <p>{convertDate(new Date(date))}</p>
                </div>
                <div className={styles.info__rows}>
                    {exercises.map(exercise => (
                        <div key={exercise._id} className={styles.info__row}>
                            <p className={styles['info__exercise-name']}>{exercise.name}</p>
                            <p className={styles['info__exercise-repeat']}>
                                {exercise.approaches && exercise.replays && <span>
                                    {`${exercise.approaches} x (${exercise.weight ? `${exercise.weight} кг` : exercise.replays})`}
                                </span>}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
