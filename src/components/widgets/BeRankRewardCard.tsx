import type { CSSProperties, FC } from 'react';
import type { BeRankReward } from '../../config/berank';
import { tokens } from '../../config/tokens';

interface BeRankRewardCardProps {
    reward: BeRankReward;
}

const BeRankRewardCard: FC<BeRankRewardCardProps> = ({ reward }) => {
    return (
        <div style={cardStyle}>
            <div style={topRowStyle}>
                <div style={titleStyle}>{reward.title}</div>
                <div style={statusStyle(reward.available)}>
                    {reward.available ? 'Disponible' : 'À débloquer'}
                </div>
            </div>
            <div style={descriptionStyle}>{reward.description}</div>
            <div style={unlockStyle}>{reward.unlockLabel}</div>
        </div>
    );
};

const cardStyle: CSSProperties = {
    backgroundColor: tokens.colors.surface,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.sm,
};

const topRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: tokens.spacing.sm,
};

const titleStyle: CSSProperties = {
    flex: 1,
    fontSize: '13px',
    fontWeight: '700',
    color: tokens.colors.text.primary,
};

const descriptionStyle: CSSProperties = {
    fontSize: '12px',
    color: tokens.colors.text.secondary,
    lineHeight: 1.4,
};

const unlockStyle: CSSProperties = {
    fontSize: '11px',
    color: '#D8C27C',
    fontWeight: '600',
};

const statusStyle = (available: boolean): CSSProperties => ({
    padding: '4px 8px',
    borderRadius: tokens.radius.full,
    backgroundColor: available ? 'rgba(106, 174, 138, 0.16)' : 'rgba(255, 255, 255, 0.05)',
    color: available ? '#8BD2A8' : tokens.colors.text.secondary,
    fontSize: '10px',
    fontWeight: '700',
    whiteSpace: 'nowrap',
});

export default BeRankRewardCard;