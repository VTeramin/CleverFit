import React from 'react';
import loadJSON from './loader.json';
import styles from './loader.module.css';
import { useSelector } from 'react-redux';
import { store } from '@redux/configure-store';
import Lottie from 'lottie-react';

export const Loader: React.FC = () => {
    const isLoading = useSelector(() => store.getState().loader.isLoading);

    return (
        <div className={styles.loader} style={{ display: isLoading ? "flex" : "none" }} data-test-id="loader">
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
