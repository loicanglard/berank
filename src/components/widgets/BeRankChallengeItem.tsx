import type { CSSProperties, FC } from 'react';
import type { BeRankChallenge } from '../../config/berank';
import { tokens } from '../../config/tokens';
import BeRankProgress from './BeRankProgress';

interface BeRankChallengeItemProps {
    challenge: BeRankChallenge;
}

const BeRankChallengeItem: FC<BeRankChallengeItemProps> = ({ challenge }) => {
    return (
        <div style={containerStyle}>
            <div style={topRowStyle}>
                <div style={titleStyle}>{challenge.title}</div>
                <div style={pointsBadgeStyle}>+{challenge.rewardPoints} pts</div>
            </div>

            <BeRankProgress
                progressPercent={challenge.progressPercent}
                progressLabel={challenge.progressLabel}
                caption={challenge.completed ? 'Défi complété' : 'Progression en cours'}
                accentColor={challenge.completed ? '#D8C27C' : '#6AAE8A'}
            />
        </div>
    );
};

const containerStyle: CSSProperties = {
    backgroundColor: tokens.colors.surface,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.md,
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
    fontWeight: '600',
    color: tokens.colors.text.primary,
};

const pointsBadgeStyle: CSSProperties = {
    padding: '4px 8px',
    borderRadius: tokens.radius.full,
    backgroundColor: 'rgba(226, 0, 26, 0.12)',
    color: '#FF8A98',
    fontSize: '11px',
    fontWeight: '700',
    whiteSpace: 'nowrap',
};

export default BeRankChallengeItem;