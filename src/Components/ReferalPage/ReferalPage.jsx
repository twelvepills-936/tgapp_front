import React, { useMemo, useState } from 'react';
import {
    ChevronLeft,
    Menu,
    Copy,
    CheckCheck,
    Users,
    Gift,
} from 'lucide-react';
import { buildReferralLink } from '../../api/telegramApi.js';
import './ReferalPage.css';

const ReferralPage = ({ appName, telegramUser, startParam, isLoading }) => {
    const [isCopied, setIsCopied] = useState(false);

    const data = useMemo(() => ({
        referralLink: buildReferralLink(telegramUser, startParam),
        stats: {
            totalReferrals: 0,
            totalEarned: '0',
        },
        referralsList: [],
    }), [startParam, telegramUser]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(data.referralLink);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error('Не удалось скопировать ссылку:', error);
        }
    };

    if (isLoading) {
        return <div className="ref-loading">Готовим реферальные данные...</div>;
    }

    return (
        <div className="ref-page">
            <header className="ref-header-nav">
                <button className="icon-btn" aria-label="Назад">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="header-title">{appName}</h1>
                <button className="icon-btn" aria-label="Меню">
                    <Menu size={24} />
                </button>
            </header>

            <div className="ref-hero">
                <h2 className="ref-page-title">Партнерская программа</h2>
                <p className="ref-page-subtitle">
                    Ссылка уже строится из Telegram ID и `VITE_TELEGRAM_BOT_USERNAME`. Когда backend
                    отдаст реферальную статистику, UI уже готов к подключению.
                </p>
            </div>

            <div className="ref-cards-container">
                <div className="ref-stats-row">
                    <div className="glass-card stat-card">
                        <Users size={24} className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{data.stats.totalReferrals}</span>
                            <span className="stat-label">Друзей</span>
                        </div>
                    </div>
                    <div className="glass-card stat-card">
                        <Gift size={24} className="stat-icon highlight" />
                        <div className="stat-info">
                            <span className="stat-value">{data.stats.totalEarned}</span>
                            <span className="stat-label">Токенов</span>
                        </div>
                    </div>
                </div>

                <div className="glass-card link-card">
                    <div className="card-header-title">ВАША ССЫЛКА</div>
                    <div className="link-input-wrapper">
                        <input
                            type="text"
                            className="ref-link-input"
                            value={data.referralLink}
                            readOnly
                        />
                        <button
                            className={`copy-btn ${isCopied ? 'copied' : ''}`}
                            onClick={handleCopyLink}
                            aria-label="Скопировать ссылку"
                        >
                            {isCopied ? <CheckCheck size={20} /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>

                <div className="glass-card list-card">
                    <div className="card-header-title">СПИСОК РЕФЕРАЛОВ</div>
                    <div className="empty-state">
                        Endpoint для списка рефералов ещё не подключён. Как только backend его добавит,
                        можно будет заменить заглушку на реальный `fetch`.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralPage;