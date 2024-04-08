import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarTwoTone, HeartTwoTone, IdcardTwoTone, TrophyTwoTone } from '@ant-design/icons';
import { EROUTE } from '@constants/enums';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useOutsideClick } from '@hooks/use-outside-click';
import { toggleIsAuthorized } from '@redux/user-data-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { Button, Layout, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';

import 'antd/dist/antd.css';
import styles from './side-bar.module.css';

const { Sider } = Layout;

type TProps = {
    collapsed: boolean,
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export const SideBar: React.FC<TProps> = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const width = useWindowSize().width || 0;
    const isFullWidth = width > 800;
    const siderRef = useOutsideClick(() => setCollapsed(true));
    const { pathname } = useLocation();
    const paths =  useMemo(() => [
        EROUTE.CALENDAR,
        EROUTE.TRAINING,
        '',
        EROUTE.PROFILE
    ], []);

    const [selectedMenuItem, setSelectedMenuItem] = useState<string[]>([]);

    useEffect(() => {
        setSelectedMenuItem([String(paths.indexOf(pathname as EROUTE))]);
    }, [paths, pathname]);

    function handleLogoClick() {
        navigate(EROUTE.MAIN);
    }

    function handleExit() {
        localStorage.clear();
        dispatch(toggleIsAuthorized(false));
        navigate(EROUTE.AUTH);
    }

    function handleMenuClick(item: MenuInfo) {
        const index = Number(item.key);

        navigate(paths[index]);
        setSelectedMenuItem([item.key]);
    }

    const menuItems = [CalendarTwoTone, HeartTwoTone, TrophyTwoTone, IdcardTwoTone].map((icon, index) => ({
        key: index,
        icon: React.createElement(icon, {
            twoToneColor: 'var(--primary-light-9)',
            className: styles.menu__icon
        }),
        label: ['Календарь', 'Тренировки', 'Достижения', 'Профиль'][index],
        style: collapsed ? {} : { paddingLeft: isFullWidth ? '16px' : '0' },
        className: styles.menu__item
    }));

    return (
        <Sider
            trigger={null}
            ref={siderRef}
            collapsible={true}
            collapsed={collapsed}
            width={isFullWidth ? '208' : '106'}
            collapsedWidth={isFullWidth ? '64' : '1'}
            theme="light"
            id='side-bar'
            className={styles.sider}
        >
            <Button
                onClick={() => handleLogoClick()}
                className={styles['logo-button']}
                type='text'
            >
                <div className={`${styles.sider__logo} ${styles[collapsed ? 'logo-collapsed' : 'logo']}`} />
            </Button>
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={selectedMenuItem}
                className={styles.sider__menu}
                onClick={item => handleMenuClick(item)}
                items={menuItems}
            />
            <Button
                className={styles.sider__exit}
                onClick={() => handleExit()}
                type='text'
                id='side-bar__exit'
            >
                <div className={styles.exit__icon} />
                {!collapsed && <p className={styles.exit__line}>Выход</p>}
            </Button>
        </Sider>
    );
};
