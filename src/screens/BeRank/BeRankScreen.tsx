import type { CSSProperties, FC } from 'react';
import BottomNav from '../../components/navigation/BottomNav';
import BeRankChallengeItem from '../../components/widgets/BeRankChallengeItem';
import BeRankLogoMark from '../../components/widgets/BeRankLogoMark';
import BeRankProgress from '../../components/widgets/BeRankProgress';
import BeRankRewardCard from '../../components/widgets/BeRankRewardCard';
import { beRankContent, type BeRankChallenge } from '../../config/berank';
import { tokens } from '../../config/tokens';
import MainLayout from '../../layouts/MainLayout';

/** Compute a relative-time label from an ISO date string. */
const relativeTime = (isoDate: string): string => {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const mins = Math.floor(diffMs / 60_000);
    if (mins < 60) return `il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `il y a ${hours} h`;
    const days = Math.floor(hours / 24);
    return `il y a ${days} j`;
};

interface BeRankScreenProps {
    currentNav: string;
    onNavChange: (nav: string) => void;
}

const challengeStatusOrder: Record<'in_progress' | 'not_started' | 'completed', number> = {
    in_progress: 0,
    not_started: 1,
    completed: 2,
};

const impactCardMeta: Record<
    string,
    {
        icon: string;
        hint?: string;
        accent: string;
        featured?: boolean;
    }
> = {
    'responsible-purchases': {
        icon: '◇',
        hint: 'actions validées',
        accent: 'rgba(139, 210, 168, 0.18)',
    },
    'points-month': {
        icon: '↗',
        hint: 'ce mois-ci',
        accent: 'rgba(216, 194, 124, 0.18)',
    },
    'completed-challenges': {
        icon: '✓',
        hint: 'défis finalisés',
        accent: 'rgba(255, 255, 255, 0.1)',
    },
    'positive-impact': {
        icon: '✦',
        hint: 'estimation',
        accent: 'rgba(139, 210, 168, 0.22)',
        featured: true,
    },
};

const getChallengeStatus = (challenge: BeRankChallenge): 'in_progress' | 'not_started' | 'completed' => {
    if (challenge.status) {
        return challenge.status;
    }

    if (challenge.completed) {
        return 'completed';
    }

    return challenge.progressPercent > 0 ? 'in_progress' : 'not_started';
};

const BeRankScreen: FC<BeRankScreenProps> = ({ currentNav, onNavChange }) => {
    const { summary, challenges, rewards, impactMetrics, detectedEvents } = beRankContent;
    const activeBottomTab = currentNav === 'BeRank' ? 'Comptes' : currentNav;
    const rankingLabel = 'Top 35% des utilisateurs BeRank';
    const sortedChallenges = [...challenges].sort(
        (left, right) => challengeStatusOrder[getChallengeStatus(left)] - challengeStatusOrder[getChallengeStatus(right)],
    );
    const nextReward = rewards.find(r => !r.available) || rewards[0];

    return (
        <MainLayout>
            <div style={scrollContainerStyle}>
                <header style={headerStyle}>
                    <button type="button" style={backButtonStyle} onClick={() => onNavChange('Comptes')}>
                        ←
                    </button>
                    <div>
                        <div style={titleRowStyle}>
                            <BeRankLogoMark size={24} />
                            <h1 style={titleStyle}>BeRank</h1>
                        </div>
                        <p style={subtitleStyle}>Vos habitudes bancaires sont analysées automatiquement pour vous faire progresser.</p>
                    </div>
                </header>

                <section style={sectionStyle}>
                    <div style={sectionTitleStyle}>Statut actuel</div>
                    <div style={statusCardStyle}>
                        <div style={statusTopRowStyle}>
                            <div style={statusLeadStyle}>
                                <BeRankLogoMark size={24} />
                                <div>
                                    <div style={rankLabelStyle}>Rang actuel</div>
                                    <div style={rankValueStyle}>{summary.rank}</div>
                                </div>
                            </div>
                            <div style={pointsBlockStyle}>
                                <div style={pointsValueStyle}>{summary.points.toLocaleString('fr-FR')} pts</div>
                                <div style={pointsCaptionStyle}>Prochain rang : {summary.nextRank}</div>
                            </div>
                        </div>

                        <BeRankProgress
                            progressPercent={summary.progressPercent}
                            progressLabel={`${summary.progressPercent}%`}
                            caption="Votre progression BeRank"
                        />

                        <div style={rankingCardStyle}>
                            <div style={rankingTitleStyle}>Classement BeRank</div>
                            <div style={rankingValueStyle}>{rankingLabel}</div>
                        </div>

                        <div style={nextStepDividerStyle} />
                        <div style={nextStepStyle}>
                            <span style={nextStepArrowStyle}>→</span> Prochaine étape : Compléter 1 action pour atteindre le rang {summary.nextRank}
                        </div>
                    </div>
                </section>

                <section style={sectionStyle}>
                    <div style={sectionTitleStyle}>Actions en cours</div>
                    <div style={stackStyle}>
                        {sortedChallenges.slice(0, 2).map((challenge) => (
                            <BeRankChallengeItem key={challenge.id} challenge={challenge} />
                        ))}
                    </div>
                </section>

                {/* ── Detected activity feed ── */}
                <section style={sectionStyle}>
                    <div style={sectionTitleStyle}>Activité détectée récemment</div>
                    <div style={stackStyle}>
                        {detectedEvents.slice(0, 3).map((evt) => (
                            <div key={evt.id} style={eventCardStyle}>
                                <div style={eventDotStyle} />
                                <div style={eventTextBlockStyle}>
                                    <div style={eventLabelStyle}>{evt.label}</div>
                                    <div style={eventDetailStyle}>{evt.detail}</div>
                                </div>
                                <div style={eventTimeStyle}>{relativeTime(evt.detectedAt)}</div>
                            </div>
                        ))}
                    </div>
                    <button type="button" style={viewMoreButtonStyle}>
                        Voir tout l'historique
                    </button>
                </section>

                {/* ── How it works ── */}
                <section style={sectionStyle}>
                    <div style={sectionTitleStyle}>Comment ça marche</div>
                    <div style={howItWorksCardStyle}>
                        <div style={howItWorksRowStyle}>
                            <div style={howItWorksIconStyle}>⚡</div>
                            <div style={howItWorksTextStyle}>Vos transactions et habitudes sont analysées automatiquement.</div>
                        </div>
                        <div style={howItWorksRowStyle}>
                            <div style={howItWorksIconStyle}>🔒</div>
                            <div style={howItWorksTextStyle}>Aucune action manuelle requise — tout est passif.</div>
                        </div>
                        <div style={howItWorksRowStyle}>
                            <div style={howItWorksIconStyle}>🎯</div>
                            <div style={howItWorksTextStyle}>Les défis et récompenses s'adaptent à votre profil bancaire.</div>
                        </div>
                    </div>
                </section>

                <section style={sectionStyle}>
                    <div style={sectionTitleStyle}>Votre impact</div>
                    <div style={impactGridStyle}>
                        {impactMetrics.slice(0, 2).map((metric) => (
                            <div key={metric.id} style={getImpactCardStyle(metric.id)}>
                                <div style={impactHeaderStyle}>
                                    <div style={getImpactIconWrapStyle(metric.id)}>{impactCardMeta[metric.id]?.icon ?? '•'}</div>
                                </div>
                                <div style={impactBodyStyle}>
                                    <div style={getImpactValueStyle(metric.id)}>{metric.value}</div>
                                    <div style={impactLabelStyle}>{metric.label}</div>
                                    {impactCardMeta[metric.id]?.hint ? (
                                        <div style={impactHintStyle}>{impactCardMeta[metric.id].hint}</div>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Récompenses débloquées ── */}
                <section style={sectionStyle}>
                    <div style={sectionTitleStyle}>Récompenses débloquées</div>
                    <div style={stackStyle}>
                        {rewards.filter(r => r.available).slice(0, 2).map(reward => (
                            <div key={reward.id} style={unlockedRewardCardStyle}>
                                <div style={unlockedRewardIconStyle}>✓</div>
                                <div style={unlockedRewardTextStyle}>
                                    <div style={unlockedRewardTypeStyle}>{reward.rewardType}</div>
                                    <div style={unlockedRewardTitleStyle}>{reward.title}</div>
                                </div>
                                <div style={unlockedRewardStatusStyle}>Actif</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={lastSectionStyle}>
                    <div style={sectionTitleStyle}>Prochaine récompense à débloquer</div>
                    <div style={stackStyle}>
                        <BeRankRewardCard reward={nextReward} />
                    </div>
                </section>
            </div>

            <BottomNav activeTab={activeBottomTab} onTabChange={onNavChange} />
        </MainLayout>
    );
};

const scrollContainerStyle: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: '100px',
    backgroundColor: tokens.colors.background,
};

const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing.md,
    padding: `${tokens.spacing.xl} ${tokens.spacing.md} ${tokens.spacing.lg}`,
};

const backButtonStyle: CSSProperties = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: `1px solid ${tokens.colors.border}`,
    backgroundColor: tokens.colors.surface,
    color: tokens.colors.text.primary,
    fontSize: '18px',
    cursor: 'pointer',
};

const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    color: tokens.colors.text.primary,
};

const titleRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
};

const subtitleStyle: CSSProperties = {
    margin: '6px 0 0',
    fontSize: '13px',
    color: tokens.colors.text.secondary,
    lineHeight: 1.4,
};

const sectionStyle: CSSProperties = {
    padding: `0 ${tokens.spacing.md} ${tokens.spacing.xl}`,
};

const lastSectionStyle: CSSProperties = {
    padding: `0 ${tokens.spacing.md} ${tokens.spacing.xl}`,
    marginBottom: tokens.spacing.xl,
};

const sectionTitleStyle: CSSProperties = {
    marginBottom: tokens.spacing.md,
    fontSize: '14px',
    fontWeight: '600',
    color: tokens.colors.text.primary,
};

const statusCardStyle: CSSProperties = {
    background: 'linear-gradient(180deg, rgba(106, 174, 138, 0.14) 0%, rgba(26, 26, 26, 1) 50%)',
    border: `1px solid rgba(106, 174, 138, 0.35)`,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.md,
};

const statusTopRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: tokens.spacing.md,
};

const statusLeadStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing.sm,
};

const rankLabelStyle: CSSProperties = {
    fontSize: '12px',
    color: tokens.colors.text.secondary,
};

const rankValueStyle: CSSProperties = {
    marginTop: '4px',
    fontSize: '22px',
    fontWeight: '700',
    color: tokens.colors.text.primary,
};

const pointsBlockStyle: CSSProperties = {
    textAlign: 'right',
};

const pointsCaptionStyle: CSSProperties = {
    fontSize: '12px',
    color: tokens.colors.text.secondary,
};

const pointsValueStyle: CSSProperties = {
    marginTop: '4px',
    fontSize: '22px',
    fontWeight: '700',
    color: '#D8C27C',
};

const nextStepDividerStyle: CSSProperties = {
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    margin: `${tokens.spacing.xs} 0 0 0`,
};

const nextStepStyle: CSSProperties = {
    fontSize: '12px',
    color: tokens.colors.text.primary,
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
};

const nextStepArrowStyle: CSSProperties = {
    color: '#8BD2A8',
    fontSize: '14px',
};

const rankingCardStyle: CSSProperties = {
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: `1px solid rgba(255, 255, 255, 0.05)`,
};

const rankingTitleStyle: CSSProperties = {
    fontSize: '11px',
    color: tokens.colors.text.secondary,
};

const rankingValueStyle: CSSProperties = {
    marginTop: '6px',
    fontSize: '13px',
    fontWeight: '600',
    color: tokens.colors.text.primary,
};

const stackStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.sm,
};

/* ── Unlocked rewards styles ── */

const unlockedRewardCardStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radius.md,
};

const unlockedRewardIconStyle: CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(106, 174, 138, 0.12)',
    color: '#8BD2A8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    flexShrink: 0,
};

const unlockedRewardTextStyle: CSSProperties = {
    flex: 1,
};

const unlockedRewardTypeStyle: CSSProperties = {
    fontSize: '10px',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: '2px',
};

const unlockedRewardTitleStyle: CSSProperties = {
    fontSize: '13px',
    fontWeight: '600',
    color: tokens.colors.text.primary,
};

const unlockedRewardStatusStyle: CSSProperties = {
    fontSize: '11px',
    fontWeight: '600',
    color: '#8BD2A8',
};

/* ── Detected activity feed styles ── */

const eventCardStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing.sm,
    padding: `${tokens.spacing.sm} 0`,
};

const viewMoreButtonStyle: CSSProperties = {
    marginTop: tokens.spacing.sm,
    background: 'none',
    border: 'none',
    color: tokens.colors.text.secondary,
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline',
};

const eventDotStyle: CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#8BD2A8',
    marginTop: '5px',
    flexShrink: 0,
};

const eventTextBlockStyle: CSSProperties = {
    flex: 1,
};

const eventLabelStyle: CSSProperties = {
    fontSize: '12px',
    fontWeight: '600',
    color: tokens.colors.text.secondary,
};

const eventDetailStyle: CSSProperties = {
    marginTop: '2px',
    fontSize: '11px',
    color: tokens.colors.text.secondary,
};

const eventTimeStyle: CSSProperties = {
    fontSize: '10px',
    color: tokens.colors.text.muted,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    marginTop: '2px',
};

/* ── How it works styles ── */

const howItWorksCardStyle: CSSProperties = {
    backgroundColor: tokens.colors.surface,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.md,
};

const howItWorksRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing.sm,
};

const howItWorksIconStyle: CSSProperties = {
    fontSize: '16px',
    flexShrink: 0,
    width: '24px',
    textAlign: 'center',
};

const howItWorksTextStyle: CSSProperties = {
    fontSize: '12px',
    color: tokens.colors.text.secondary,
    lineHeight: 1.5,
};

const impactGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: tokens.spacing.sm,
};

const impactCardStyle: CSSProperties = {
    backgroundColor: tokens.colors.surface,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    minHeight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: tokens.spacing.md,
    overflow: 'hidden',
    position: 'relative',
};

const impactHeaderStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
};

const impactBodyStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
};

const impactValueStyle: CSSProperties = {
    fontSize: '20px',
    fontWeight: '700',
    color: tokens.colors.text.primary,
    letterSpacing: '-0.02em',
};

const impactLabelStyle: CSSProperties = {
    fontSize: '12px',
    fontWeight: '600',
    color: tokens.colors.text.primary,
    lineHeight: 1.4,
};

const impactHintStyle: CSSProperties = {
    fontSize: '10px',
    color: tokens.colors.text.secondary,
    lineHeight: 1.4,
};

const getImpactCardStyle = (metricId: string): CSSProperties => {
    const meta = impactCardMeta[metricId];

    if (meta?.featured) {
        return {
            ...impactCardStyle,
            background: 'linear-gradient(180deg, rgba(139, 210, 168, 0.08) 0%, rgba(26, 26, 26, 1) 100%)',
            border: '1px solid rgba(139, 210, 168, 0.22)',
            boxShadow: '0 10px 24px rgba(139, 210, 168, 0.08)',
        };
    }

    return {
        ...impactCardStyle,
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(26, 26, 26, 1) 100%)',
        border: `1px solid ${tokens.colors.border}`,
        boxShadow: '0 8px 18px rgba(0, 0, 0, 0.14)',
    };
};

const getImpactIconWrapStyle = (metricId: string): CSSProperties => {
    const meta = impactCardMeta[metricId];

    return {
        width: '30px',
        height: '30px',
        borderRadius: tokens.radius.full,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: '700',
        color: tokens.colors.text.primary,
        backgroundColor: meta?.accent ?? 'rgba(255, 255, 255, 0.08)',
        border: `1px solid ${meta?.featured ? 'rgba(139, 210, 168, 0.18)' : 'rgba(255, 255, 255, 0.06)'}`,
    };
};

const getImpactValueStyle = (metricId: string): CSSProperties => {
    if (impactCardMeta[metricId]?.featured) {
        return {
            ...impactValueStyle,
            fontSize: '22px',
        };
    }

    return impactValueStyle;
};

export default BeRankScreen;