import React from 'react';

import styles from './marathons.module.css';

export const Marathons: React.FC = () => (
    <div className={styles.marathons}>
        <p className={styles.marathons__title}>В данный период<br/>ни один марафон не проводится</p>
        <p className={styles.marathons__subtitle}>Заглядывайте сюда почаще<br/>и ваш первый марафон скоро начнётся.</p>
    </div>
);
