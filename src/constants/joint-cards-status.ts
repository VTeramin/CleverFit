import { EJointStatus } from './enums';

export const jointCardsStatus: {[name: string]: string} = {
    [EJointStatus.pending]: 'ожидает подтверждения',
    [EJointStatus.accepted]: 'тренировка одобрена',
    [EJointStatus.rejected]: 'тренировка отклонена'
}
