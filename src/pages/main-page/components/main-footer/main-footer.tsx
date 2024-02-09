import React from 'react';
import './main-footer.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';
const { Footer } = Layout;
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

export const MainFooter: React.FC = () => {
    return (
        <Footer className="footer">
            <a className="footer__reviews">Смотреть отзывы</a>
            <div className="footer__download-block">
                <div className="download-block__title-wrapper">
                    <p className="download-block__title">Скачать на телефон</p>
                    <p className="download-block__subtitle">Доступно в PRO-тарифе</p>
                </div>
                <div className="download-block__content-wrapper">
                    {[AndroidFilled, AppleFilled].map((icon, index) => {
                        return (
                            <div key={index + 1} className="download-block__content">
                                {React.createElement(icon, { className: "download-block__icon" })}
                                <p className="download-block__content-title">{["Android OS", "Apple iOS"][index]}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Footer>
    );
};
