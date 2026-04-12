import type { CSSProperties, FC } from 'react';
import { tokens } from '../../config/tokens';
import type { BeRankSummary } from '../../config/berank';
import BeRankLogoMark from './BeRankLogoMark';
import BeRankProgress from './BeRankProgress';

interface BeRankCardProps {
    onOpen: () => void;
    summary: BeRankSummary;
    activeChallengesCount: number;
}

const BeRankCard: FC<BeRankCardProps> = ({ onOpen, summary, activeChallengesCount }) => {
    return (
        <section style={cardStyle}>
            <div style={topRowStyle}>
                <div>
                    <div style={titleRowStyle}>
                        <BeRankLogoMark size={22} />
                        <div style={titleStyle}>BeRank</div>
                    </div>
                    <div style={subtitleStyle}>Statut actuel : {summary.rank}</div>
                </div>
                <div style={rankBadgeStyle}>{summary.rank}</div>
            </div>

            <div style={pointsRowStyle}>
                <div style={pointsValueStyle}>{summary.points.toLocaleString('fr-FR')} pts</div>
                <div style={nextRankStyle}>Plus que {summary.pointsToNextRank} points avant {summary.nextRank}</div>
            </div>

            <BeRankProgress
                progressPercent={summary.progressPercent}
                progressLabel={`${summary.progressPercent}%`}
            />

            <button type="button" style={buttonStyle} onClick={onOpen}>
                <span>{summary.cta}</span>
                <span aria-hidden="true">→</span>
            </button>

            <div style={contextIndicatorStyle}>{activeChallengesCount} défis en cours</div>
        </section>
    );
};

const cardStyle: CSSProperties = {
    margin: `0 ${tokens.spacing.md} ${tokens.spacing.lg}`,
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.md,
    border: `1px solid rgba(106, 174, 138, 0.35)`,
    background: 'linear-gradient(180deg, rgba(106, 174, 138, 0.12) 0%, rgba(26, 26, 26, 1) 42%)',
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
    fontSize: '16px',
    fontWeight: '700',
    color: tokens.colors.text.primary,
};

const titleRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
};

const subtitleStyle: CSSProperties = {
    marginTop: '4px',
    fontSize: '12px',
    color: tokens.colors.text.secondary,
};

const rankBadgeStyle: CSSProperties = {
    padding: '6px 10px',
    borderRadius: tokens.radius.full,
    backgroundColor: 'rgba(181, 155, 93, 0.18)',
    color: '#D8C27C',
    fontSize: '11px',
    fontWeight: '700',
};

const pointsRowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
};

const pointsValueStyle: CSSProperties = {
    fontSize: '20px',
    fontWeight: '700',
    color: tokens.colors.text.primary,
};

const nextRankStyle: CSSProperties = {
    fontSize: '12px',
    color: tokens.colors.text.secondary,
};

const buttonStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    borderRadius: tokens.radius.md,
    border: `1px solid rgba(106, 174, 138, 0.28)`,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: tokens.colors.text.primary,
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
};

const contextIndicatorStyle: CSSProperties = {
    marginTop: '-4px',
    fontSize: '12px',
    color: tokens.colors.text.secondary,
};

export default BeRankCard;