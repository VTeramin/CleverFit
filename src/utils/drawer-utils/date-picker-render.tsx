import { TTraining } from '@constants/types';
import { getListData } from '@utils/calendar-utils/get-list-data';
import { checkIsDatesEqual } from '@utils/check-is-dates-equal';
import classNames from 'classnames';
import { Moment } from 'moment';

import styles from '../../pages/calendar-page/calendar-drawer/calendar-drawer-form/no-date-group/no-date-group.module.css';

export function dateCellRender(cellMoment: Moment, training: TTraining[]) {
    const trainingList = getListData(training, cellMoment.toDate());
    const todayClass = checkIsDatesEqual(new Date(Date.now()), cellMoment.toDate()) ? 'today' : 'empty';
    const emtyClass = trainingList.length === 0 ? 'empty' : 'no-empty'

    return (
        <div className={classNames(styles[emtyClass], styles[todayClass])}>
            {cellMoment.toDate().getDate()}
        </div>
    );
}
