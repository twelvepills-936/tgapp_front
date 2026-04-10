import { ENABLE_TELEGRAM_MOCK } from '../config/env.js';

function createBrowserMock() {
    return {
        ready: () => {},
        expand: () => {},
        disableVerticalSwipes: () => {},
        initData: '',
        initDataUnsafe: {
            user: {
                id: 777000,
                first_name: 'Local',
                last_name: 'Preview',
                username: 'browser_preview',
                language_code: 'ru',
            },
            start_param: 'dev-preview',
        },
    };
}

export function getTelegramWebApp() {
    if (typeof window === 'undefined') {
        return null;
    }

    if (window.Telegram?.WebApp) {
        return window.Telegram.WebApp;
    }

    return ENABLE_TELEGRAM_MOCK ? createBrowserMock() : null;
}

export function initTelegramMiniApp() {
    const tg = getTelegramWebApp();

    tg?.ready();
    tg?.expand();
    tg?.disableVerticalSwipes?.();

    return tg;
}
