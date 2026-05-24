import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { API_BASE_URL, ENABLE_TELEGRAM_MOCK } from './config/env.js';
import './index.css';

if (import.meta.env.DEV) {
    console.info('[CyberMate] API_BASE_URL:', API_BASE_URL || '(proxy → localhost:8090)');
    console.info('[CyberMate] Telegram mock:', ENABLE_TELEGRAM_MOCK);
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);