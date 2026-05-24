import { API_BASE_URL } from '../config/env.js';

export function resolveApiUrl(pathname) {
    const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

    if (!API_BASE_URL) {
        return normalizedPath;
    }

    return new URL(normalizedPath, `${API_BASE_URL}/`).toString();
}

function parseBodyForLog(body) {
    if (!body || typeof body !== 'string') {
        return undefined;
    }

    try {
        return JSON.parse(body);
    } catch {
        return body;
    }
}

/**
 * Обёртка над fetch: в dev пишет каждый запрос в console (удобно вместе с Network).
 */
export async function apiFetch(pathname, options = {}) {
    const url = resolveApiUrl(pathname);
    const method = options.method ?? 'GET';

    if (import.meta.env.DEV) {
        console.info(`[API] → ${method} ${pathname}`, parseBodyForLog(options.body) ?? '');
    }

    const response = await fetch(url, options);

    if (import.meta.env.DEV) {
        console.info(`[API] ← ${method} ${pathname} ${response.status}`);
    }

    return response;
}
