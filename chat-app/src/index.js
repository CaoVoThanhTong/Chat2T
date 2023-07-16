import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import GlobalStyles from './components/GlobalStyles';
import './components/GlobalStyles/GlobalStyles.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <ToastContainer position="top-right" />
            <App />
        </GlobalStyles>
    </React.StrictMode>,
);
