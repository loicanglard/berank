import type { CSSProperties, FC } from 'react';
import BottomNav from '../../components/navigation/BottomNav';
import BeRankChallengeItem from '../../components/widgets/BeRankChallengeItem';
import BeRankProgress from '../../components/widgets/BeRankProgress';
import BeRankRewardCard from '../../components/widgets/BeRankRewardCard';
import { beRankContent } from '../../config/berank';
import { tokens } from '../../config/tokens';
import MainLayout from '../../layouts/MainLayout';

interface BeRankScreenProps {
    currentNav: string;
    onNavChange: (nav: string) => void;
}

const BeRankScreen: FC<BeRankScreenProps> = ({ currentNav, onNavChange }) => {
    const { summary, earnWays, challenges, rewards, impactMetrics } = beRankContent;
    const activeBottomTab = currentNav === 'BeRank' ? 'Comptes' : currentNav;
    const rankingLabel = 'Top 35% des utilisateurs BeRank';

    return (
        <MainLayout>
            <div style={scrollContainerStyle}>
                <header style={headerStyle}>
                    <button type="button" style={backButtonStyle} onClick={() => onNavChange('Comptes')}>
                        ←
                    </button>
                    <div>
                        <h1 style={titleStyle}>BeRank</h1>
                        <p style={subtitleStyle}>Vos actions responsables et financières vous font progresser.</p>
                    </div>
                </header>

                <section style={sectionStyle}>
                    <div style={sectionTitleStyle}>Statut actuel</div>
                    <div style={statusCardStyle}>
                        <div style={statusTopRowStyle}>
                            <div>
                                <div style={rankLabelStyle}>Rang actuel</div>
                                <div style={rankValueStyle}>{summary.rank}</div>
                            </div>
                            <div style={pointsBlockStyle}>
                                <div style={pointsValueStyle}>{summary.points.toLocaleString('fr-FR')} pts</div>
                                <div style={pointsCaptionStyle}>Prochain rang : {summary.nextRank}</div>
                                <div style={pointsCaptionStyle}>Plus que {summary.pointsToNextRank} pts</div>
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

                        <div style={nextRewardCardStyle}>
                            <div style={nextRewardLabelStyle}>Prochaine récompense à débloquer</div>
                            <div style={nextRewardValueStyle}>{summary.nextReward}</div>
                        </div>
                    </div>
                </section>

                <section style={sectionStyle}>
                    <div style={sectionTitleStyle}>Défis en cours</div>
                    <div style={stackStyle}>
                        {challenges.map((challenge) => (
                            <BeRankChallengeItem key={challenge.id} challenge={challenge} />
                        ))}
                    </div>
                </section>

                <section style={sectionStyle}>
                    <div style={sectionTitleStyle}>Gagner des points</div>
                    <div style={stackStyle}>
                        {earnWays.map((item) => (
                            <div key={item.id} style={listCardStyle}>
                                <div style={iconCircleStyle}>{item.icon}</div>
                                <div style={listTextStyle}>
                                    <div style={listTitleStyle}>{item.title}</div>
                                    <div style={listDescriptionStyle}>{item.description}</div>
                                </div>
                                <div style={listPointsStyle}>{item.pointsLabel}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={sectionStyle}>
                    <div style={sectionTitleStyle}>Récompenses disponibles</div>
                    <div style={stackStyle}>
                        {rewards.map((reward) => (
                            <BeRankRewardCard key={reward.id} reward={reward} />
                        ))}
                    </div>
                </section>

                <section style={lastSectionStyle}>
                    <div style={sectionTitleStyle}>Votre impact</div>
                    <div style={impactGridStyle}>
                        {impactMetrics.map((metric) => (
                            <div key={metric.id} style={impactCardStyle}>
                                <div style={impactValueStyle}>{metric.value}</div>
                                <div style={impactLabelStyle}>{metric.label}</div>
                            </div>
                        ))}
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

const subtitleStyle: CSSProperties = {
    margin: '6px 0 0',
    fontSize: '13px',
    color: tokens.colors.text.secondary,
    lineHeight: 1.4,
};

const sectionStyle: CSSProperties = {
    padding: `0 ${tokens.spacing.md} ${tokens.spacing.lg}`,
};

const lastSectionStyle: CSSProperties = {
    padding: `0 ${tokens.spacing.md} ${tokens.spacing.xl}`,
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

const nextRewardCardStyle: CSSProperties = {
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: `1px solid rgba(255, 255, 255, 0.05)`,
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

const nextRewardLabelStyle: CSSProperties = {
    fontSize: '11px',
    color: tokens.colors.text.secondary,
};

const nextRewardValueStyle: CSSProperties = {
    marginTop: '6px',
    fontSize: '14px',
    fontWeight: '600',
    color: tokens.colors.text.primary,
};

const stackStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.sm,
};

const listCardStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
    backgroundColor: tokens.colors.surface,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radius.md,
};

const iconCircleStyle: CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(106, 174, 138, 0.12)',
    fontSize: '18px',
    flexShrink: 0,
};

const listTextStyle: CSSProperties = {
    flex: 1,
};

const listTitleStyle: CSSProperties = {
    fontSize: '13px',
    fontWeight: '600',
    color: tokens.colors.text.primary,
};

const listDescriptionStyle: CSSProperties = {
    marginTop: '4px',
    fontSize: '12px',
    color: tokens.colors.text.secondary,
    lineHeight: 1.4,
};

const listPointsStyle: CSSProperties = {
    fontSize: '11px',
    fontWeight: '700',
    color: '#8BD2A8',
    whiteSpace: 'nowrap',
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
    minHeight: '96px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const impactValueStyle: CSSProperties = {
    fontSize: '18px',
    fontWeight: '700',
    color: tokens.colors.text.primary,
};

const impactLabelStyle: CSSProperties = {
    fontSize: '11px',
    color: tokens.colors.text.secondary,
    lineHeight: 1.4,
};

export default BeRankScreen;