import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EROUTE } from '@constants/enums';
import { Button, Layout, Result } from 'antd';

import 'antd/dist/antd.css';
import styles from './not-found-page.module.css';

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout className={styles.page}>
            <Result
                status='404'
                title='Такой страницы нет'
                subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена'
                extra={
                    <Button
                        type='primary'
                        className={styles.result__button}
                        onClick={() => navigate(EROUTE.MAIN)}
                    >
                        На главную
                    </Button>
                }
                className={styles.result}
            />
        </Layout>
    )
};
