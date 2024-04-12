import { EJointStatus } from '@constants/enums';
import { TPalData } from '@redux/training-pals-slice';

export function statusSortJoinUsers(arr: TPalData[]) {
    const acceptedUsers = arr.filter(el => el.status === EJointStatus.accepted);
    const rejectedUsers = arr.filter(el => el.status === EJointStatus.rejected);
    const leftoversUsers = arr.filter(el => !acceptedUsers.includes(el) && !rejectedUsers.includes(el));
    const preSortedArr: TPalData[] = [];

    [acceptedUsers, leftoversUsers, rejectedUsers].forEach(usersArr => {
        preSortedArr.push(...usersArr.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
    });

    return preSortedArr;
}
