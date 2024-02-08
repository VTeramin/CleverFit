import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { MainPage } from './pages';

import 'normalize.css';
import './index.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path='/' element={<MainPage />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>,
);
