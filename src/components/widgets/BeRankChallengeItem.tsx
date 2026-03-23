import type { CSSProperties, FC } from 'react';
import type { BeRankChallenge, BeRankDetectionStatus } from '../../config/berank';
import { tokens } from '../../config/tokens';
import BeRankProgress from './BeRankProgress';

interface BeRankChallengeItemProps {
    challenge: BeRankChallenge;
}

const statusMeta: Record<
    BeRankDetectionStatus,
    { label: string; color: string; bg: string }
> = {
    detected: {
        label: 'Détecté',
        color: '#8BD2A8',
        bg: 'rgba(106, 174, 138, 0.12)',
    },
    in_progress: {
        label: 'En cours',
        color: '#D8C27C',
        bg: 'rgba(216, 194, 124, 0.12)',
    },
    completed: {
        label: 'Complété automatiquement',
        color: '#8BD2A8',
        bg: 'rgba(106, 174, 138, 0.16)',
    },
    reward_unlocked: {
        label: 'Récompense débloquée',
        color: '#D8C27C',
        bg: 'rgba(216, 194, 124, 0.18)',
    },
};

const BeRankChallengeItem: FC<BeRankChallengeItemProps> = ({ challenge }) => {
    const meta = statusMeta[challenge.detectionStatus];
    const isFinished =
        challenge.detectionStatus === 'completed' ||
        challenge.detectionStatus === 'reward_unlocked';

    return (
        <div style={containerStyle}>
            <div style={topRowStyle}>
                <div style={titleStyle}>{challenge.title}</div>
                <div style={pointsBadgeStyle}>+{challenge.rewardPoints} pts</div>
            </div>

            {/* Detection origin — reads like an automated system message */}
            <div style={detectedFromStyle}>⚡ {challenge.detectedFrom}</div>

            <BeRankProgress
                progressPercent={challenge.progressPercent}
                progressLabel={challenge.progressLabel}
                caption="Progression détectée automatiquement"
                accentColor={isFinished ? '#D8C27C' : '#6AAE8A'}
            />

            {/* Status badge — replaces any manual action */}
            <div style={statusBadgeStyle(meta.bg, meta.color)}>
                {meta.label}
            </div>
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

const detectedFromStyle: CSSProperties = {
    fontSize: '11px',
    color: tokens.colors.text.secondary,
    lineHeight: 1.4,
    fontStyle: 'italic',
};

const statusBadgeStyle = (bg: string, color: string): CSSProperties => ({
    alignSelf: 'flex-start',
    padding: '4px 10px',
    borderRadius: tokens.radius.full,
    backgroundColor: bg,
    color,
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.02em',
});

export default BeRankChallengeItem;