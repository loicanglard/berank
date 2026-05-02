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
        color: 'var(--color-accent-green)',
        bg: 'rgba(74, 222, 128, 0.12)',
    },
    in_progress: {
        label: 'En cours',
        color: 'var(--color-accent-coin)',
        bg: 'rgba(216, 169, 73, 0.12)',
    },
    completed: {
        label: 'Complété automatiquement',
        color: 'var(--color-accent-green)',
        bg: 'rgba(74, 222, 128, 0.16)',
    },
    reward_unlocked: {
        label: 'Récompense débloquée',
        color: 'var(--color-accent-coin)',
        bg: 'rgba(216, 169, 73, 0.16)',
    },
};

const difficultyMeta: Record<'easy' | 'medium' | 'hard', { label: string; color: string; bg: string }> = {
    easy: {
        label: 'Facile',
        color: 'var(--color-accent-green)',
        bg: 'rgba(74, 222, 128, 0.1)',
    },
    medium: {
        label: 'Moyen',
        color: 'var(--color-accent-coin)',
        bg: 'rgba(216, 169, 73, 0.1)',
    },
    hard: {
        label: 'Difficile',
        color: '#FF8A98',
        bg: 'rgba(255, 138, 152, 0.1)',
    },
};

const BeRankChallengeItem: FC<BeRankChallengeItemProps> = ({ challenge }) => {
    const meta = statusMeta[challenge.detectionStatus];
    const difficulty = difficultyMeta[challenge.difficulty];
    const isFinished =
        challenge.detectionStatus === 'completed' ||
        challenge.detectionStatus === 'reward_unlocked';

    return (
        <div style={containerStyle}>
            <div style={topRowStyle}>
                <div style={titleStyle}>{challenge.title}</div>
                <div style={badgesContainerStyle}>
                    <div style={rewardsContainerStyle}>
                        <div style={pointsBadgeStyle}>+{challenge.rewardPoints} pts</div>
                        <div style={coinsBadgeStyle}>+{challenge.rewardCoins} 💰</div>
                    </div>
                    <div style={difficultyBadgeStyle(difficulty.bg, difficulty.color)}>
                        {difficulty.label}
                    </div>
                </div>
            </div>

            {/* Detection origin — reads like an automated system message */}
            <div style={detectedFromStyle}>⚡ {challenge.detectedFrom}</div>

            <BeRankProgress
                progressPercent={challenge.progressPercent}
                progressLabel={challenge.progressLabel}
                caption="Progression détectée automatiquement"
                accentColor={isFinished ? 'var(--color-accent-coin)' : 'var(--color-accent-green)'}
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

const badgesContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'flex-end',
};

const rewardsContainerStyle: CSSProperties = {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
};

const pointsBadgeStyle: CSSProperties = {
    padding: '4px 8px',
    borderRadius: tokens.radius.full,
    backgroundColor: 'rgba(226, 0, 26, 0.12)',
    color: 'var(--color-primary)',
    fontSize: '11px',
    fontWeight: '700',
    whiteSpace: 'nowrap',
};

const coinsBadgeStyle: CSSProperties = {
    padding: '4px 8px',
    borderRadius: tokens.radius.full,
    backgroundColor: 'rgba(216, 169, 73, 0.15)',
    color: 'var(--color-accent-coin)',
    fontSize: '11px',
    fontWeight: '700',
    whiteSpace: 'nowrap',
};

const difficultyBadgeStyle = (bg: string, color: string): CSSProperties => ({
    padding: '2px 6px',
    borderRadius: '6px',
    backgroundColor: bg,
    color: color,
    fontSize: '9px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap',
});

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