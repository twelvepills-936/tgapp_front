export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8090').replace(/\/+$/, '');

export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'CyberMate';
export const BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME ?? 'CyberMateBot';
export const ENABLE_TELEGRAM_MOCK =
    String(import.meta.env.VITE_ENABLE_TELEGRAM_MOCK ?? 'false').toLowerCase() === 'true';
