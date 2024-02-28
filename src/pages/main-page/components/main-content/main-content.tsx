import React from 'react';
import 'antd/dist/antd.css';
import styles from './main-content.module.css';
import { Layout } from 'antd';

const { Content } = Layout;
import { HeartTwoTone, CalendarTwoTone, IdcardTwoTone } from '@ant-design/icons';

export const MainContent: React.FC = () => {
    const navBlocks = [HeartTwoTone, CalendarTwoTone, IdcardTwoTone].map((icon, index) => {
        return (
            <div key={index + 1} className={`${styles["nav__block"]} ${styles["box"]}`}>
                <p className={styles["block__title"]}>{["Расписать тренировки", "Назначить календарь", "Заполнить профиль"][index]}</p>
                <div className={styles["block__content"]}>
                    {React.createElement(icon, { className: styles["block__icon"], twoToneColor: "var(--primary-light-6)" })}
                    <p className={styles["block__subtitle"]}>{["Тренировки", "Календарь", "Профиль"][index]}</p>
                </div>
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
