import React from 'react';
import loadJSON from '../../assets/loader.json';
import { Lottie } from '@crello/react-lottie'
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
        },
        isClickToPauseDisabled: true
    };

    return (
        <div className="loader" style={{ display: isLoading ? "flex" : "none" }} data-test-id="loader">
            <Lottie
                config={defaultOptions}
                height="150px"
                width="150px"
            />
        </div>
    )
};
