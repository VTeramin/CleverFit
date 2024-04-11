import React from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { TPalData } from '@redux/training-pals-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { rejectAcceptedInvite } from '@utils/requests/invite/reject-accepted-invite';
import { Button, Modal } from 'antd';

import { UserCard } from '../user-card/user-card';

import 'antd/dist/antd.css';
import styles from './view-pal-modal.module.css';

type TProps = {
    isModal: boolean,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>,
    palData: TPalData
}

export const ViewPalModal: React.FC<TProps> = ({ isModal, setIsModal, palData }) => {
    const dispatch = useAppDispatch();
    const pageWidth = useWindowSize().width || 0;
    const isMobile = pageWidth < 800;

    function handleRejectInvite(palId: string, inviteId: string) {
        setIsModal(false);
        dispatch(rejectAcceptedInvite(palId, inviteId));
    }

    return (
        <Modal
        centered={true}
        maskStyle={{
            backdropFilter: 'var(--background-blur-filter)',
            background: 'var(--background-blur-color)'
        }}
        width={isMobile ? 312 : 539}
        className={styles.modal}
        open={isModal}
        maskClosable={true}
        onCancel={() => setIsModal(false)}
        closable={true}
        destroyOnClose={true}
        footer={null}
        data-test-id='partner-modal'
    >
        <UserCard user={palData} />
        <p className={styles.modal__status}>тренировка одобрена <CheckCircleFilled /></p>
        <Button
            className={styles.modal__button}
            onClick={() => handleRejectInvite(palData.id, palData.inviteId || '')}
        >
            Отменить тренировку
        </Button>
    </Modal>
    );
};
