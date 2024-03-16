import React, { MouseEvent } from 'react';
import 'antd/dist/antd.css';
import styles from './main-content.module.css';
import { Button, Layout } from 'antd';

const { Content } = Layout;
import { HeartTwoTone, CalendarTwoTone, IdcardTwoTone } from '@ant-design/icons';
import { ROUTE } from '@route/routes';
import { useNavigate } from 'react-router-dom';

export const MainContent: React.FC = () => {
    const navigate = useNavigate();

    function handleBlockClick(event: MouseEvent<HTMLButtonElement>) {
        const text = event.currentTarget.textContent || "";
        const paths: { [name: string]: string } = {
            "Календарь": ROUTE.CALENDAR
        };
        navigate(paths[text]);
    }

    const navBlocks = [HeartTwoTone, CalendarTwoTone, IdcardTwoTone].map((icon, index) => {
        return (
            <div key={index + 1} className={`${styles["nav__block"]} ${styles["box"]}`}>
                <p className={styles["block__title"]}>{["Расписать тренировки", "Назначить календарь", "Заполнить профиль"][index]}</p>
                <Button
                    className={styles["block__content"]}
                    onClick={handleBlockClick}
                    data-test-id={["", "menu-button-calendar", ""][index]}
                >
                    {React.createElement(icon, { className: styles["block__icon"], twoToneColor: "var(--primary-light-6)" })}
                    <p className={styles["block__subtitle"]}>{["Тренировки", "Календарь", "Профиль"][index]}</p>
                </Button>
            </div>
        )
    });

    return (
        <Content className={styles["content"]} >
            <section className={`${styles["content__list-wrapper"]} ${styles["box"]}`}>
                <ul className={styles["content__list"]}>С CleverFit ты сможешь:
                    <li>— планировать свои тренировки на&nbsp;календаре, выбирая тип и&nbsp;уровень&nbsp;нагрузки;</li>
                    <li>— отслеживать свои достижения в&nbsp;разделе статистики, сравнивая свои результаты с&nbsp;нормами и&nbsp;рекордами;</li>
                    <li>— создавать свой профиль, где ты&nbsp;можешь загружать свои фото, видео и отзывы о&nbsp;тренировках;</li>
                    <li>— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и&nbsp;советам профессиональных тренеров.</li>
                </ul>
            </section>
            <h2 className={`${styles["content__tagline"]} ${styles["box"]}`}>CleverFit — это не просто приложение, а твой личный помощник в&nbsp;мире фитнеса. Не откладывай на завтра  — начни тренироваться уже сегодня!</h2>
            <nav className={styles["content__nav"]}>
                {navBlocks}
            </nav>
        </Content>
    );
};
