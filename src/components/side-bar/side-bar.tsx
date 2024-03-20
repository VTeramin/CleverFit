import React from 'react';
import 'antd/dist/antd.css';
import styles from './side-bar.module.css';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import { CalendarTwoTone, HeartTwoTone, TrophyTwoTone, IdcardTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toggleIsAuthorized } from '@redux/userDataSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useWindowSize } from '@uidotdev/usehooks';
import { MenuInfo } from 'rc-menu/lib/interface';
import { EROUTE } from '@constants/enums';
import { useOutsideClick } from '@hooks/use-outside-click';

type props = {
    collapsed: boolean,
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export const SideBar: React.FC<props> = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const width = useWindowSize().width || 0;
    const isFullWidth = width > 800;
    const siderRef = useOutsideClick(() => setCollapsed(true));

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
        const paths = [EROUTE.CALENDAR];
        navigate(paths[index]);
    }

    const menuItems = [CalendarTwoTone, HeartTwoTone, TrophyTwoTone, IdcardTwoTone].map((icon, index) => ({
        key: index,
        icon: React.createElement(icon, {
            twoToneColor: "var(--primary-light-9)",
            className: styles["menu__icon"]
        }),
        label: ["Календарь", "Тренировки", "Достижения", "Профиль"][index],
        style: collapsed ? {} : { paddingLeft: isFullWidth ? "16px" : "0" },
        className: styles["menu__item"]
    }));

    return (
        <Sider
            trigger={null}
            ref={siderRef}
            collapsible
            collapsed={collapsed}
            width={isFullWidth ? "208" : "106"}
            collapsedWidth={isFullWidth ? "64" : "1"}
            theme="light"
            className={styles["sider"]}
        >
            <div
            className={`${styles["sider__logo"]} ${styles[collapsed ? "logo-collapsed" : "logo"]}`}
            onClick={handleLogoClick}
            />
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['4']}
                className={styles["sider__menu"]}
                onClick={(item) => handleMenuClick(item)}
                items={menuItems}
            />
            <div className={styles["sider__exit"]} onClick={handleExit}>
                <div className={styles["exit__icon"]}></div>
                {!collapsed && <p className={styles["exit__line"]}>Выход</p>}
            </div>
        </Sider>
    );
};
