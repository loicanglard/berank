import type { CSSProperties, FC } from 'react';
import { useState } from 'react';
import BottomNav from '../../components/navigation/BottomNav';
import { tokens } from '../../config/tokens';
import MainLayout from '../../layouts/MainLayout';

type RewardCategory = 'Recommandé pour vous' | 'Meilleur rapport coins' | 'Écologique' | 'Cadeaux';

type RewardBadge = 'Populaire' | 'Eco +++' | 'Best value';

interface BeShopScreenProps {
    currentNav: string;
    onNavChange: (nav: string) => void;
    beCoins: number;
    onSpendCoins: (amount: number) => void;
}

interface Reward {
    id: string;
    title: string;
    description: string;
    cost: number;
    icon: string;
    badge?: RewardBadge;
    category: RewardCategory;
    details?: string;
    conditions?: string;
    image?: string;
}

const REWARDS: Reward[] = [
    {
        id: 'eco-gift',
        title: 'Carte cadeau durable',
        description: 'Bons d\'achat pour des produits écoresponsables et certifiés',
        cost: 100,
        icon: '🎁',
        badge: 'Populaire',
        category: 'Cadeaux',
    },
    {
        id: 'mobility',
        title: 'Crédit mobilité douce',
        description: 'À utiliser chez partenaires vélo, trottinette et transports durables',
        cost: 150,
        icon: '🚴',        badge: 'Eco +++',
        category: 'Écologique',        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgo8cGF0aCBkPSJNMjAgMTJMMjggMjBMMjAgMjhMMTIgMjBaIiBzdHJva2U9IiM4QkQyQTgiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIyMCIgY3kPSIyMCIgcj0iNCIgZmlsbD0iIzhCRDJBOCIvPgo8L3N2Zz4K',
    },
    {
        id: 'reconditioned',
        title: 'Crédit équipement reconditionné',
        description: 'Accès exclusif à nos produits reconditionnés haute qualité',
        cost: 250,
        icon: '♻️',
        badge: 'Eco +++',
        category: 'Écologique',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgo8cmVjdCB4PSI4IiB5PSIxNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzhCRDJBOEIvPgo8cmVjdCB4PSIxMCIgeT0iMTYiIHdpZHRoPSIyMCIgaGVpZ2h0PSI4IiByeD0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpIi8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMjAiIHI9IjEiIGZpbGw9IiM4QkQyQTgiLz4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzhCRDJBOEIvPgo8L3N2Zz4K',
    },
    {
        id: 'donation',
        title: 'Engagement solidaire',
        description: 'Nous versons 25€ à une association de votre choix',
        cost: 80,
        icon: '❤️',
        category: 'Recommandé pour vous',
    },
    {
        id: 'gift-card',
        title: 'Carte cadeau Fnac',
        description: 'Carte cadeau de 50€ valable dans tous les magasins Fnac',
        details: 'Utilisable sur une sélection de produits culturels, high-tech ou reconditionnés.',
        conditions: 'Valable une seule fois. Offre simulée dans le cadre du prototype.',
        cost: 180,
        icon: '💳',
        badge: 'Best value',
        category: 'Meilleur rapport coins',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgo8cmVjdCB4PSI0IiB5PSIxNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjEyIiByeD0iNCIgZmlsbD0iIzhCRDJBOEIvPgo8cmVjdCB4PSI2IiB5PSIxNiIgd2lkdGg9IjI4IiBoZWlnaHQ9IjgiIHJ4PSIyIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSkiLz4KPHRleHQgeD0iMjAiIHk9IjIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOEJEMkE4IiBmb250LXNpemU9IjEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtd2VpZ2h0PSI2MDAiPkZOQUM8L3RleHQ+Cjwvc3ZnPgo=',
    },
    {
        id: 'eco-products',
        title: 'Panier produits bio',
        description: 'Sélection de produits biologiques et locaux de saison',
        cost: 120,
        icon: '🥕',
        category: 'Meilleur rapport coins',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjIwIiByPSI0IiBmaWxsPSIjOEJEMkE4Ii8+CjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjQiIGZpbGw9IiM4QkQyQTgiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIxNSIgcj0iNCIgZmlsbD0iIzhCRDJBOEIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjI1IiByPSI0IiBmaWxsPSIjOEJEMkE4Ii8+Cjwvc3ZnPgo=',
    },
];

const REWARD_SECTIONS: RewardCategory[] = [
    'Recommandé pour vous',
    'Meilleur rapport coins',
    'Écologique',
    'Cadeaux',
];

const BeShopScreen: FC<BeShopScreenProps> = ({
    currentNav,
    onNavChange,
    beCoins,
    onSpendCoins,
}) => {
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const [exchangedRewards, setExchangedRewards] = useState<string[]>([]);
    const [activeExchangeId, setActiveExchangeId] = useState<string | null>(null);
    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

    const handleExchange = (reward: Reward) => {
        if (beCoins >= reward.cost) {
            onSpendCoins(reward.cost);
            setExchangedRewards([...exchangedRewards, reward.id]);
            setActiveExchangeId(reward.id);
            setMessage({
                text: `${reward.title} échangé avec succès !`,
                type: 'success',
            });
            window.setTimeout(() => setMessage(null), 3000);
            window.setTimeout(() => setActiveExchangeId(null), 240);
        } else {
            setMessage({
                text: 'Solde insuffisant',
                type: 'error',
            });
            window.setTimeout(() => setMessage(null), 3000);
        }
    };

    const closeModal = () => setSelectedReward(null);

    const renderSection = (category: RewardCategory) => {
        const sectionRewards = REWARDS.filter((reward) => reward.category === category);
        if (!sectionRewards.length) {
            return null;
        }

        return (
            <section key={category} style={sectionStyle} className="fade-in-up-delay-1">
                <div style={sectionHeaderStyle}>
                    <div>
                        <div style={sectionLabelStyle}>{category}</div>
                        <div style={sectionSubtitleStyle}>
                            {category === 'Recommandé pour vous' && 'Nos meilleures idées adaptées à votre solde'}
                            {category === 'Meilleur rapport coins' && 'Récompenses à forte valeur et faible coût'}
                            {category === 'Écologique' && 'Options durables pour un impact plus vert'}
                            {category === 'Cadeaux' && 'Idées cadeaux pour vos proches et vous'}
                        </div>
                    </div>
                </div>
                <div style={rewardsGridStyle}>
                    {sectionRewards.map((reward) => {
                        const isExchanged = exchangedRewards.includes(reward.id);
                        const canExchange = beCoins >= reward.cost && !isExchanged;
                        const statusLabel = isExchanged ? 'Déjà échangé' : beCoins < reward.cost ? 'Solde insuffisant' : undefined;

                        return (
                            <div
                                key={reward.id}
                                className={`beshop-card${activeExchangeId === reward.id ? ' active-exchange' : ''}`}
                                style={{
                                    ...rewardCardStyle,
                                    cursor: 'pointer',
                                    opacity: isExchanged ? 0.75 : 1,
                                    borderColor: isExchanged ? 'rgba(74, 222, 128, 0.24)' : tokens.colors.border,
                                }}
                                onClick={() => setSelectedReward(reward)}
                            >
                                <div style={cardTopRowStyle}>
                                    <div style={rewardVisualBlockStyle}>
                                        <span style={rewardVisualIconStyle}>{reward.icon}</span>
                                    </div>
                                    <div style={cardMetaStyle}>
                                        {reward.badge && <span style={badgeStyle}>{reward.badge}</span>}
                                        {statusLabel && <span style={statusPillStyle(isExchanged)}>{statusLabel}</span>}
                                    </div>
                                </div>

                                <div style={rewardTextBlockStyle}>
                                    <h3 style={rewardTitleStyle}>{reward.title}</h3>
                                    <p style={rewardDescriptionStyle}>{reward.description}</p>
                                </div>

                                <div style={rewardFooterStyle}>
                                    <div style={costStyle}>
                                        <span style={costValueStyle}>{reward.cost}</span>
                                        <span style={costLabelStyle}>💰</span>
                                    </div>
                                    <button
                                        type="button"
                                        className="button-hover"
                                        style={{
                                            ...exchangeButtonStyle,
                                            backgroundColor: isExchanged
                                                ? 'rgba(74, 222, 128, 0.14)'
                                                : canExchange
                                                    ? 'var(--color-accent-green)'
                                                    : 'rgba(255, 255, 255, 0.08)',
                                            color: isExchanged
                                                ? 'var(--color-accent-green)'
                                                : canExchange
                                                    ? 'var(--color-background)'
                                                    : tokens.colors.text.secondary,
                                            cursor: canExchange ? 'pointer' : 'default',
                                            opacity: isExchanged ? 0.95 : 1,
                                        }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleExchange(reward);
                                        }}
                                        disabled={!canExchange}
                                    >
                                        {isExchanged ? '✓ Échangé' : canExchange ? 'Échanger' : 'Solde insuff.'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    };

    return (
        <MainLayout>
            <div style={scrollContainerStyle}>
                <header style={headerStyle}>
                    <button type="button" style={backButtonStyle} onClick={() => onNavChange('Comptes')}>
                        ←
                    </button>
                    <div>
                        <h1 style={titleStyle}>BeShop</h1>
                        <p style={subtitleStyle}>Échangez vos BeCoins contre des récompenses premium.</p>
                    </div>
                </header>

                <section style={balanceSectionStyle}>
                    <div style={balanceCardStyle}>
                        <div style={balanceGlowStyle} />
                        <div style={balanceHeaderStyle}>
                            <div>
                                <div style={balanceLabelStyle}>coins disponibles</div>
                                <div style={balanceValueStyle}>{beCoins}</div>
                            </div>
                            <div style={balanceIconBadgeStyle}>💰</div>
                        </div>
                    </div>
                </section>

                {message && (
                    <div
                        style={{
                            ...messageStyle,
                            backgroundColor:
                                message.type === 'success'
                                    ? 'rgba(74, 222, 128, 0.16)'
                                    : 'rgba(226, 0, 26, 0.14)',
                            borderLeft: `4px solid ${message.type === 'success' ? 'var(--color-accent-green)' : 'var(--color-primary)'}`,
                        }}
                        className="beshop-toast"
                    >
                        <span style={{
                            color: message.type === 'success' ? 'var(--color-accent-green)' : 'var(--color-primary)',
                        }}>
                            {message.text}
                        </span>
                    </div>
                )}

{selectedReward && (
                    <div style={modalOverlayStyle} onClick={closeModal}>
                        <div style={modalContentStyle} onClick={(event) => event.stopPropagation()}>
                            <div style={modalHeaderStyle}>
                                <div style={modalIconStyle}>{selectedReward.icon}</div>
                                <button type="button" style={modalCloseButtonStyle} onClick={closeModal}>
                                    ×
                                </button>
                            </div>
                            <div>
                                <h2 style={modalTitleStyle}>{selectedReward.title}</h2>
                                <p style={modalDescriptionStyle}>{selectedReward.details ?? selectedReward.description}</p>
                                <div style={modalSectionStyle}>
                                    <div style={modalSectionLabelStyle}>Coût</div>
                                    <div style={modalSectionValueStyle}>{selectedReward.cost} BeCoins</div>
                                </div>
                                <div style={modalSectionStyle}>
                                    <div style={modalSectionLabelStyle}>Conditions</div>
                                    <div style={modalSectionValueStyle}>
                                        {selectedReward.conditions ?? 'Valable une seule fois. Offre simulée dans le cadre du prototype.'}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="button-hover"
                                    style={{
                                        ...exchangeButtonStyle,
                                        width: '100%',
                                        marginTop: '16px',
                                        backgroundColor: exchangedRewards.includes(selectedReward.id)
                                            ? 'rgba(74, 222, 128, 0.14)'
                                            : beCoins >= selectedReward.cost
                                                ? 'var(--color-accent-green)'
                                                : 'rgba(255, 255, 255, 0.08)',
                                        color: exchangedRewards.includes(selectedReward.id)
                                            ? 'var(--color-accent-green)'
                                            : beCoins >= selectedReward.cost
                                                ? 'var(--color-background)'
                                                : tokens.colors.text.secondary,
                                        cursor: beCoins >= selectedReward.cost && !exchangedRewards.includes(selectedReward.id) ? 'pointer' : 'default',
                                    }}
                                    onClick={() => handleExchange(selectedReward)}
                                    disabled={beCoins < selectedReward.cost || exchangedRewards.includes(selectedReward.id)}
                                >
                                    {exchangedRewards.includes(selectedReward.id) ? '✓ Échangé' : beCoins >= selectedReward.cost ? 'Échanger' : 'Solde insuff.'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {REWARD_SECTIONS.map(renderSection)}
            </div>

            <BottomNav activeTab={currentNav} onTabChange={onNavChange} />
        </MainLayout>
    );
};

const scrollContainerStyle: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    paddingTop: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingBottom: '16px',
};

const headerStyle: CSSProperties = {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    alignItems: 'flex-start',
};

const backButtonStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    color: tokens.colors.primary,
    fontSize: '24px',
    cursor: 'pointer',
    padding: 0,
    marginTop: '4px',
};

const titleStyle: CSSProperties = {
    fontSize: '28px',
    fontWeight: '700',
    color: tokens.colors.text.primary,
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
};

const subtitleStyle: CSSProperties = {
    fontSize: '13px',
    color: tokens.colors.text.secondary,
    margin: 0,
    lineHeight: '1.4',
};

const balanceSectionStyle: CSSProperties = {
    marginBottom: '28px',
};

const balanceCardStyle: CSSProperties = {
    position: 'relative',
    backgroundColor: tokens.colors.surface,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: '18px',
    padding: '24px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.14)',
};

const balanceGlowStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at top right, rgba(74, 222, 128, 0.18), transparent 40%)',
    pointerEvents: 'none',
};

const balanceHeaderStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
};

const balanceLabelStyle: CSSProperties = {
    fontSize: '11px',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '10px',
    fontWeight: '700',
};

const balanceValueStyle: CSSProperties = {
    fontSize: '52px',
    fontWeight: '800',
    color: 'var(--color-accent-green)',
    margin: 0,
    lineHeight: '1',
};

const balanceIconBadgeStyle: CSSProperties = {
    fontSize: '38px',
    width: '58px',
    height: '58px',
    borderRadius: '18px',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    color: 'var(--color-accent-green)',
    flexShrink: 0,
};

const messageStyle: CSSProperties = {
    marginBottom: '20px',
    padding: '14px 18px',
    borderRadius: '14px',
    fontSize: '13px',
    fontWeight: '600',
};

const sectionStyle: CSSProperties = {
    marginBottom: '26px',
};

const sectionHeaderStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '12px',
    marginBottom: '14px',
};

const sectionLabelStyle: CSSProperties = {
    fontSize: '12px',
    fontWeight: '700',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '6px',
};

const sectionSubtitleStyle: CSSProperties = {
    fontSize: '12px',
    color: tokens.colors.text.secondary,
    lineHeight: '1.4',
};

const rewardsGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '14px',
};

const rewardCardStyle: CSSProperties = {
    backgroundColor: tokens.colors.surface,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: '18px',
    padding: '18px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    minHeight: '190px',
};

const cardTopRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    alignItems: 'flex-start',
};

const rewardVisualBlockStyle: CSSProperties = {
    width: '60px',
    height: '60px',
    borderRadius: '18px',
    background: 'linear-gradient(135deg, rgba(226, 0, 26, 0.16), rgba(255,255,255,0.06))',
    display: 'grid',
    placeItems: 'center',
    boxShadow: '0 14px 30px rgba(0,0,0,0.1)',
};

const rewardVisualIconStyle: CSSProperties = {
    fontSize: '26px',
};

const cardMetaStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: '8px',
    alignItems: 'flex-start',
    flex: 1,
};

const badgeStyle: CSSProperties = {
    alignSelf: 'flex-start',
    padding: '5px 10px',
    borderRadius: '999px',
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--color-background)',
    backgroundColor: 'var(--color-primary)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
};

const statusPillStyle = (active: boolean): CSSProperties => ({
    padding: '6px 10px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: '700',
    color: active ? 'var(--color-accent-green)' : tokens.colors.text.secondary,
    backgroundColor: active ? 'rgba(74, 222, 128, 0.12)' : 'rgba(255,255,255,0.08)',
});

const rewardTextBlockStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
};

const rewardTitleStyle: CSSProperties = {
    fontSize: '15px',
    fontWeight: '700',
    color: tokens.colors.text.primary,
    margin: 0,
};

const rewardDescriptionStyle: CSSProperties = {
    fontSize: '13px',
    color: tokens.colors.text.secondary,
    margin: 0,
    lineHeight: '1.6',
};

const rewardFooterStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '10px',
    borderTop: `1px solid ${tokens.colors.border}`,
};

const modalOverlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    display: 'grid',
    placeItems: 'center',
    padding: '16px',
    zIndex: 1000,
};

const modalContentStyle: CSSProperties = {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: tokens.colors.surface,
    borderRadius: '20px',
    padding: '22px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
    position: 'relative',
};

const modalHeaderStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '18px',
    gap: '12px',
};

const modalIconStyle: CSSProperties = {
    width: '54px',
    height: '54px',
    borderRadius: '16px',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    fontSize: '26px',
};

const modalCloseButtonStyle: CSSProperties = {
    border: 'none',
    background: 'rgba(255,255,255,0.08)',
    color: tokens.colors.text.primary,
    width: '36px',
    height: '36px',
    borderRadius: '12px',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
};

const modalTitleStyle: CSSProperties = {
    fontSize: '20px',
    fontWeight: '700',
    color: tokens.colors.text.primary,
    margin: '0 0 10px 0',
};

const modalDescriptionStyle: CSSProperties = {
    fontSize: '13px',
    color: tokens.colors.text.secondary,
    lineHeight: '1.6',
    marginBottom: '16px',
};

const modalSectionStyle: CSSProperties = {
    marginBottom: '14px',
};

const modalSectionLabelStyle: CSSProperties = {
    fontSize: '11px',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '6px',
    fontWeight: '700',
};

const modalSectionValueStyle: CSSProperties = {
    fontSize: '13px',
    color: tokens.colors.text.primary,
    lineHeight: '1.6',
};

const costStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
};

const costValueStyle: CSSProperties = {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--color-accent-coin)',
    letterSpacing: '-0.3px',
};

const costLabelStyle: CSSProperties = {
    fontSize: '12px',
    opacity: 0.8,
};

const exchangeButtonStyle: CSSProperties = {
    border: 'none',
    borderRadius: '12px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.22s ease',
    letterSpacing: '-0.02em',
    minWidth: '108px',
};

export default BeShopScreen;
