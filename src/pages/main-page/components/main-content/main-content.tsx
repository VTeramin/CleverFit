import React from 'react';
import './main-content.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

const { Content } = Layout;
import { HeartFilled, CalendarOutlined, IdcardOutlined } from '@ant-design/icons';

export const MainContent: React.FC = () => {
    const navBlocks = [HeartFilled, CalendarOutlined, IdcardOutlined].map((icon, index) => {
        return (
            <div key={index + 1} className="nav__block box">
                <p className="block__title">{["Расписать тренировки", "Назначить календарь", "Заполнить профиль"][index]}</p>
                <div className="block__content">
                    {React.createElement(icon, { className: "block__icon" })}
                    <p className="block__subtitle">{["Тренировки", "Календарь", "Профиль"][index]}</p>
                </div>
            </div>
        )
    });

    return (
        <Content className="content" >
            <section className="content__list-wrapper box">
                <ul className="content__list">С CleverFit ты сможешь:
                    <li>— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;</li>
                    <li>— отслеживать свои достижения в разделе статистики, сравнивая свои результаты с&nbsp;нормами и рекордами;</li>
                    <li>— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о&nbsp;тренировках;</li>
                    <li>— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.</li>
                </ul>
            </section>
            <h2 className="content__tagline box">CleverFit — это не просто приложение, а твой личный помощник в&nbsp;мире фитнеса. Не откладывай на завтра  — начни тренироваться уже сегодня!</h2>
            <nav className="content__nav">
                {navBlocks}
            </nav>
        </Content>
    );
};
