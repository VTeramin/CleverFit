import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { ResultModal } from '@components/result-modal/result-modal';
import { SideBar } from '@components/side-bar/side-bar';
import { EROUTE, EStatus } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarResult } from '@pages/calendar-page/calendar-result/calendar-result';
import { changeResultType, selectCalendarModalData } from '@redux/calendar-modal-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { Breadcrumb, Button, Layout } from 'antd';

import 'antd/dist/antd.css';
import styles from './page.module.css';

const { Header } = Layout;

type TProps = {
    innerLayout: React.ReactElement
}

export const Page: React.FC<TProps> = ({ innerLayout }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const { resultType } = useAppSelector(selectCalendarModalData);
    const [resultTypeCalendar, setResultTypeCalendar] = useState(resultType);
    const width = useWindowSize().width || 0;
    const isFullWidth = width > 800;

    const breadCrumbs: { [url: string]: string } = {
        '/feedbacks': 'Отзывы пользователей',
        '/calendar': 'Календарь'
    };
    const isCrumbs = Object.keys(breadCrumbs).includes(pathname);

    useEffect(() => {
        dispatch(changeResultType(resultTypeCalendar));
    }, [resultTypeCalendar, dispatch]);

    const header: { [route: string]: React.ReactElement } = {
        [EROUTE.MAIN]: (
            <div>
                <Breadcrumb className={styles['page-layout__breadcrumbs']}>
                    <Breadcrumb.Item onClick={() => navigate(EROUTE.MAIN)}>Главная</Breadcrumb.Item>
                    {isCrumbs && <Breadcrumb.Item>{breadCrumbs[pathname]}</Breadcrumb.Item>}
                </Breadcrumb>
                <Header className={styles.header}>
                    <h1 className={styles.header__title}>Приветствуем тебя в&nbsp;CleverFit — приложении,<br />которое поможет тебе добиться своей мечты!</h1>
                    <div className={styles.header__settings}>
                        <SettingOutlined className={styles.settings__icon} />
                        <p className={styles.settings__line}>Настройки</p>
                    </div>
                </Header>
            </div>
        ),
        [EROUTE.FEEDBACKS]: (
            <div>
                <Breadcrumb className={styles['page-layout__breadcrumbs']}>
                    <Breadcrumb.Item onClick={() => navigate(EROUTE.MAIN)}>Главная</Breadcrumb.Item>
                    {isCrumbs && <Breadcrumb.Item>{breadCrumbs[pathname]}</Breadcrumb.Item>}
                </Breadcrumb>
            </div>
        ),
        [EROUTE.CALENDAR]: (
            <div>
                <Breadcrumb className={styles['page-layout__breadcrumbs']}>
                    <Breadcrumb.Item onClick={() => navigate(EROUTE.MAIN)}>Главная</Breadcrumb.Item>
                    {isCrumbs && <Breadcrumb.Item>{breadCrumbs[pathname]}</Breadcrumb.Item>}
                </Breadcrumb>
                <Header className={styles.header}>
                    <div className={styles.header__settings}>
                        <SettingOutlined className={styles.settings__icon} />
                        <p className={styles.settings__line}>Настройки</p>
                    </div>
                </Header>
            </div>
        ),
        [EROUTE.PROFILE]: (
            <div>
                <Header className={`${styles.header} ${styles['profile-header']}`}>
                    <h1 className={styles.header__title}>Профиль</h1>
                    <div className={styles.header__settings}>
                        <SettingOutlined className={styles.settings__icon} />
                        <p className={styles.settings__line}>Настройки</p>
                    </div>
                </Header>
            </div>
        )
    };

    return (
        <Layout className={styles.page}>
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout className={styles['page-layout']}>
                {header[pathname]}
                {innerLayout}
                <Button
                    className={`${styles.trigger} ${styles[collapsed ? 'trigger-collapsed' : 'trigger-not-collapsed']}`}
                    id="trigger"
                    data-test-id={isFullWidth ? 'sider-switch' : 'sider-switch-mobile'}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
            </Layout>
            {resultType === EStatus.noToken
                ? <ResultModal
                    resultType={resultType}
                    setResultType={setResultTypeCalendar}
                />
                : <CalendarResult />}
        </Layout>
    );
};
