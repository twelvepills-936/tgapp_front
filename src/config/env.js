function readEnvFlag(name, fallback) {
    const raw = import.meta.env[name];

    if (raw === undefined || raw === '') {
        return fallback;
    }

    return String(raw).toLowerCase() === 'true';
}

const configuredApiBase = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL = (
    configuredApiBase === undefined
        ? (import.meta.env.DEV ? '' : 'http://localhost:8090')
        : configuredApiBase
).replace(/\/+$/, '');

export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'CyberMate';
export const BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME ?? 'CyberMateBot';

/** В dev по умолчанию true — иначе в Chrome без Telegram user запросы не уходят. */
export const ENABLE_TELEGRAM_MOCK = readEnvFlag('VITE_ENABLE_TELEGRAM_MOCK', import.meta.env.DEV);
