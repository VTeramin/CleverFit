import React from 'react';
import loadJSON from './loader.json';
import styles from './loader.module.css';
import Lottie from 'lottie-react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectLoader } from '@redux/loaderSlice';

export const Loader: React.FC = () => {
    const isLoading = useAppSelector(selectLoader);

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
