import React from 'react';
import 'antd/dist/antd.css';
import styles from './result-calendar.module.css';
import { Button, Modal, Result } from 'antd';
import { getTrainingList, status } from '@utils/requests';
import { useWindowSize } from '@uidotdev/usehooks';
import { getResultModalWidth } from '@utils/getResultModalWidth';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

type props = {
    resultType: status,
    setResultType: React.Dispatch<React.SetStateAction<status>>,
    setTrainingList: React.Dispatch<React.SetStateAction<never[]>>
}

export const ResultCalendar: React.FC<props> = ({ resultType, setResultType, setTrainingList }) => {
    const dispatch = useAppDispatch();
    const width = useWindowSize().width || 0;
    const resultWidth = width > 800 ? getResultModalWidth(resultType) : 328;

    function handleUpdate() {
        setResultType(status.empty);
        dispatch(getTrainingList()).then(resp => {
            resp = status.errorTrainingList
            resp === status.errorTrainingList ? setResultType(resp) : setTrainingList(resp);
        });
    }

    const result: { [name: string]: JSX.Element } = {
        [status.errorTrainingList]: <Result
            icon={<CloseCircleOutlined style={{ color: "var(--primary-light-6)"}} />}
            title="При открытии данных произошла ошибка"
            subTitle="Попробуйте еще раз."
            className={styles["error-trining-list"]}
            extra={[
                <Button
                    key="Обновить"
                    className={`${styles["conf-button"]}`}
                    onClick={handleUpdate}
                >
                    Обновить
                </Button>
            ]}
        />
    };

    return (
        <Modal
            centered={true}
            maskStyle={{
                backdropFilter: "var(--background-blur-filter)",
                background: "var(--background-blur-color-light)"
            }}
            width={resultWidth}
            className={styles["result"]}
            open={resultType !== status.empty}
            onCancel={() => setResultType(status.empty)}
            maskClosable={false}
            closable={true}
            footer={null}
        >
            {result[resultType]}
        </Modal>
    );
};
