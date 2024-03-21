import React from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectLoader } from '@redux/loader-slice';
import Lottie from 'lottie-react';

import loadJSON from './loader.json';

import styles from './loader.module.css';

export const Loader: React.FC = () => {
    const isLoading = useAppSelector(selectLoader);

    return (
        <div className={styles.loader} style={{ display: isLoading ? 'flex' : 'none' }} data-test-id="loader">
            <Lottie
                animationData={loadJSON}
                loop={true}
                style={{
                    width: 150,
                    height: 150
                }}
            />
        </div>
    )
};
