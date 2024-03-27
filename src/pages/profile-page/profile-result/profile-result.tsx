import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { EStatus } from '@constants/enums';
import { useWindowSize } from '@uidotdev/usehooks';
import { Button, Modal, Result } from 'antd';

import 'antd/dist/antd.css';
import styles from './profile-result.module.css';

type TProps = {
    resultType: EStatus,
    setResultType: React.Dispatch<React.SetStateAction<EStatus>>
}

export const ProfileResult: React.FC<TProps> = ({ resultType, setResultType }) => {
    const width = useWindowSize().width || 0;

    function handleClose() {
        setResultType(EStatus.empty);
    }

    const result: { [name: string]: JSX.Element } = {
        [EStatus.errorUploadPicture]:
            <Result
                icon={<CloseCircleOutlined style={{ color: 'var(--character-light-error)' }} />}
                title={<p>Файл слишком большой</p>}
                subTitle={<p>Выберите файл размером [......] МБ.</p>}
                extra={[
                    <Button
                        key="Закрыть"
                        className={`${styles['conf-button']}`}
                        onClick={() => handleClose()}
                    >
                        Закрыть
                    </Button>
                ]}
            />,
        [EStatus.errorSaveUserData]:
            <Result
                icon={<CloseCircleOutlined style={{ color: 'var(--character-light-error)' }} />}
                title={<p>При сохранении данных произошла ошибка</p>}
                subTitle={<p>Придётся попробовать ещё раз</p>}
                extra={[
                    <Button
                        key="Закрыть"
                        className={`${styles['conf-button']}`}
                        onClick={() => handleClose()}
                    >
                        Закрыть
                    </Button>
                ]}
            />
    };

    return (
        <Modal
            centered={true}
            maskStyle={{
                backdropFilter: 'var(--background-blur-filter)',
                background: 'var(--background-blur-color-light)'
            }}
            width={width > 800 ? 416 : 328}
            className={styles.result}
            open={resultType !== EStatus.empty}
            onCancel={() => handleClose()}
            maskClosable={false}
            closable={false}
            footer={null}
        >
            {result[resultType]}
        </Modal>
    );
};
