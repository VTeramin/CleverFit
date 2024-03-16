import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './page.module.css';
import { Breadcrumb, Layout } from 'antd';
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowSize } from '@uidotdev/usehooks';
import { ROUTE } from '@route/routes';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeResultType, selectCalendarModalData } from '@redux/calendarModalSlice';
import { status } from '@utils/requests';
import { CalendarResult } from '@pages/calendar-page/calendar-result/calendar-result';
import { SideBar } from '@components/side-bar/side-bar';
import { ResultModal } from '@components/result-modal/result-modal';

type props = {
    innerLayout: React.ReactElement
}

export const Page: React.FC<props> = ({ innerLayout }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const width = useWindowSize().width || 0;
    const isFullWidth = width > 800;
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const isMain = pathname === "/main";
    const isFeedbacks = pathname === "/feedbacks";
    const isCalendar = pathname === "/calendar";
    const { resultType } = useAppSelector(selectCalendarModalData);
    const [resultTypeCalendar, setResultTypeCalendar] = useState(resultType);
    useEffect(() => {
        dispatch(changeResultType(resultTypeCalendar));
    }, [resultTypeCalendar, dispatch]);

    const breadCrumbs: { [url: string]: string } = {
        "/feedbacks": "Отзывы пользователей",
        "/calendar": "Календарь"
    };
    const isCrumbs = Object.keys(breadCrumbs).includes(pathname);

    return (
        <Layout className={styles["page"]}>
            <SideBar collapsed={collapsed} />
            <Layout className={styles["page-layout"]}>
                <Breadcrumb className={styles["page-layout__breadcrumbs"]}>
                    <Breadcrumb.Item onClick={() => navigate(ROUTE.MAIN)}>Главная</Breadcrumb.Item>
                    {isCrumbs && <Breadcrumb.Item>{breadCrumbs[pathname]}</Breadcrumb.Item>}
                </Breadcrumb>
                {!isFeedbacks && <Header className={styles["header"]}>
                    {isMain && <h1 className={styles["header__title"]}>Приветствуем тебя в&nbsp;CleverFit — приложении,<br />которое поможет тебе добиться своей мечты!</h1>}
                    <div className={styles["header__settings"]}>
                        {<SettingOutlined className={`${styles["settings__icon"]} ${isCalendar && styles["settings__icon-no-wrap"]}`} />}
                        <p className={styles["settings__line"]}>Настройки</p>
                    </div>
                </Header>}
                {innerLayout}
                <div
                    className={`${styles["trigger"]} ${styles[collapsed ? "trigger-collapsed" : "trigger-not-collapsed"]}`}
                    data-test-id={isFullWidth ? "sider-switch" : "sider-switch-mobile"}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </div>
            </Layout>
            {resultType === status.noToken
                ? <ResultModal
                    resultType={resultType}
                    setResultType={setResultTypeCalendar}
                />
                : <CalendarResult />}
        </Layout>
    );
};
