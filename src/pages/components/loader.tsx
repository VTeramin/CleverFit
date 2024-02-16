import React from 'react';
import loadJSON from '../../assets/loader.json';
import Lottie from 'react-lottie';
import "./loader.css";
import { useSelector } from 'react-redux';
import { store } from '@redux/configure-store';

export const Loader: React.FC = () => {
    const isLoading = useSelector(() => store.getState().loader.isLoading);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadJSON,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div onClick={(event) => event.stopPropagation()} className="loader" style={{ display: isLoading ? "flex" : "none" }}>
            <Lottie
                options={defaultOptions}
                height={150}
                width={150}
                isClickToPauseDisabled={true}
            />
        </div>
    )
};
