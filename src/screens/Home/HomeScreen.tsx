import React, { useState } from 'react';
import TopHeader from '../../components/navigation/TopHeader';
import BalanceCard from '../../components/widgets/BalanceCard';
import BeRankCard from '../../components/widgets/BeRankCard';
import { PurchaseSimulationForm } from '../../components/widgets/PurchaseSimulationForm';
import TransactionList from '../../components/widgets/TransactionList';
import BottomNav from '../../components/navigation/BottomNav';
import MainLayout from '../../layouts/MainLayout';
import type { BeRankSummary } from '../../config/berank';
import { tokens } from '../../config/tokens';
import { mockContent } from '../../config/content';
import type { AccountTransaction, PurchaseCategory } from '../../utils/beRankSimulation';

interface HomeScreenProps {
    currentNav: string;
    onNavChange: (nav: string) => void;
    beRankSummary: BeRankSummary;
    activeChallengesCount: number;
    transactions: AccountTransaction[];
    onSimulatePurchase: (category: PurchaseCategory, amount: number) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
    currentNav,
    onNavChange,
    beRankSummary,
    activeChallengesCount,
    transactions,
    onSimulatePurchase,
}) => {
    const [activeSubTab, setActiveSubTab] = useState('Tous');
    const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

    return (
        <MainLayout>
            <TopHeader activeTab={activeSubTab} onTabChange={setActiveSubTab} />

            <div style={scrollContainerStyle}>
                {activeSubTab === 'Tous' ? (
                    <>
                        <div style={sectionTitleStyle}>{mockContent.sections.current}</div>
                        <BalanceCard />
                        <BeRankCard
                            onOpen={() => onNavChange('BeRank')}
                            summary={beRankSummary}
                            activeChallengesCount={activeChallengesCount}
                        />

                        <div style={simulatorSectionStyle}>
                            <button
                                type="button"
                                style={simulatorToggleStyle}
                                onClick={() => setIsSimulatorOpen((open) => !open)}
                            >
                                <span>Simuler un achat</span>
                                <span aria-hidden="true">{isSimulatorOpen ? '−' : '+'}</span>
                            </button>

                            {isSimulatorOpen && (
                                <PurchaseSimulationForm
                                    submitLabel="Ajouter l'achat"
                                    onSubmit={(category, amount) => {
                                        onSimulatePurchase(category, amount);
                                        setIsSimulatorOpen(false);
                                    }}
                                />
                            )}
                        </div>

                        <div style={promoCardStyle}>
                            <div style={promoBadgeStyle}>
                                <span style={{ fontSize: '10px' }}>👍 ÊTRE UTILE</span>
                            </div>
                            <div style={promoTitleStyle}>Devenez sociétaire</div>
                            <div style={promoDescStyle}>
                                Prenez part à la vie de votre Caisse d'Epargne et profitez de nombreux avantages...
                            </div>
                            <div style={promoLinkStyle}>En savoir plus</div>
                        </div>

                        <div style={sectionTitleStyle}>{mockContent.sections.savings}</div>
                        <section style={sectionStyle}>
                            <div style={gridStyle}>
                                {mockContent.secondaryAccounts.filter(a => !a.category).map(account => (
                                    <div key={account.id} style={cardStyle}>
                                        <div style={cardTopStyle}>
                                            <div style={cardLabelStyle}>{account.label}</div>
                                            <div style={cardBalanceStyle}>{account.balance}</div>
                                        </div>
                                        {account.status && <div style={statusStyle}>{account.status}</div>}
                                        {account.progress !== null && (
                                            <div style={progressContainerStyle}>
                                                <div style={{
                                                    ...progressBarStyle,
                                                    width: `${account.progress}%`,
                                                    backgroundColor: account.label.includes('JEUNE') ? '#28A745' : '#0056B3'
                                                }} />
                                                <div style={progressPercentageStyle}>{account.progress} %</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div style={sectionTitleStyle}>{mockContent.sections.investments}</div>
                        <section style={sectionStyle}>
                            {mockContent.secondaryAccounts.filter(a => a.category === mockContent.sections.investments).map(account => (
                                <div key={account.id} style={cardStyle}>
                                    <div style={cardTopStyle}>
                                        <div style={cardLabelStyle}>{account.label}</div>
                                        <div style={cardBalanceStyle}>{account.balance}</div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <div style={sectionTitleStyle}>{mockContent.sections.loans}</div>
                        <section style={sectionStyle}>
                            {mockContent.secondaryAccounts.filter(a => a.category === mockContent.sections.loans).map(account => (
                                <div key={account.id} style={cardStyle}>
                                    <div style={cardTopStyle}>
                                        <div style={cardLabelStyle}>{account.label}</div>
                                        <div style={cardBalanceStyle}>{account.balance}</div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <div style={sectionTitleStyle}>{mockContent.sections.explore}</div>
                        <div style={actionCardStyle}>
                            <div style={actionIconCircleStyle}>👥</div>
                            <div style={actionTextContainerStyle}>
                                <div style={actionTitleStyle}>Découvrez notre offre de parrainage !</div>
                                <div style={actionDescStyle}>Vous appréciez votre banque et souhaitez en faire profiter votre entourage ? Parrainez un proche.</div>
                            </div>
                        </div>

                        <div style={{ padding: tokens.spacing.md, marginTop: '24px' }}>
                            <TransactionList transactions={transactions} />
                        </div>
                    </>
                ) : (
                    <div style={personalizeContainerStyle}>
                        <h2 style={{ color: 'white', marginBottom: '16px' }}>Organiser mes listes</h2>
                        <p style={{ color: tokens.colors.text.secondary, fontSize: '13px', marginBottom: '24px' }}>
                            Les listes vous permettent de regrouper vos comptes en fonction de vos usages...
                        </p>
                        <button style={createListButtonStyle}>+ Créer une nouvelle liste</button>
                    </div>
                )}
            </div>

            <BottomNav activeTab={currentNav} onTabChange={onNavChange} />
        </MainLayout>
    );
};

const scrollContainerStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: '100px',
    backgroundColor: tokens.colors.background,
};

const sectionTitleStyle: React.CSSProperties = {
    padding: `${tokens.spacing.lg} ${tokens.spacing.md} ${tokens.spacing.sm}`,
    fontSize: '14px',
    fontWeight: '500',
    color: tokens.colors.text.primary,
};

const sectionStyle: React.CSSProperties = {
    padding: `0 ${tokens.spacing.md}`,
};

const gridStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.sm,
};

const cardStyle: React.CSSProperties = {
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border}`,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.sm,
};

const cardTopStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const cardLabelStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: '700',
    color: '#FFFFFF',
};

const cardBalanceStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '700',
    color: tokens.colors.text.success,
};

const statusStyle: React.CSSProperties = {
    fontSize: '11px',
    color: tokens.colors.text.secondary,
};

const progressContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.xs,
};

const progressBarStyle: React.CSSProperties = {
    flex: 1,
    height: '6px',
    borderRadius: '3px',
    backgroundColor: '#333333',
};

const progressPercentageStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: '600',
    color: tokens.colors.text.secondary,
    width: '30px',
};

const promoCardStyle: React.CSSProperties = {
    margin: `${tokens.spacing.lg} ${tokens.spacing.md}`,
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.md,
    backgroundColor: '#8B0000', // Darker Red for Promo
    backgroundImage: 'linear-gradient(45deg, #8B0000, #E2001A)',
    color: 'white',
};

const promoBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 8px',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '700',
    marginBottom: tokens.spacing.md,
};

const promoTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: tokens.spacing.sm,
};

const promoDescStyle: React.CSSProperties = {
    fontSize: '13px',
    opacity: 0.9,
    marginBottom: tokens.spacing.md,
};

const promoLinkStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: '600',
    textDecoration: 'underline',
};

const simulatorSectionStyle: React.CSSProperties = {
    margin: `-${tokens.spacing.md} ${tokens.spacing.md} ${tokens.spacing.lg}`,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.sm,
};

const simulatorToggleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    borderRadius: tokens.radius.md,
    border: '1px solid rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    color: tokens.colors.text.primary,
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
};

const actionCardStyle: React.CSSProperties = {
    margin: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.colors.surface,
    border: `1px solid ${tokens.colors.border}`,
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing.md,
};

const actionIconCircleStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#E2001A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
};

const actionTextContainerStyle: React.CSSProperties = {
    flex: 1,
};

const actionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '700',
    marginBottom: '2px',
};

const actionDescStyle: React.CSSProperties = {
    fontSize: '11px',
    color: tokens.colors.text.secondary,
};

const personalizeContainerStyle: React.CSSProperties = {
    padding: tokens.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    marginTop: tokens.spacing.xl,
};

const createListButtonStyle: React.CSSProperties = {
    border: `1px solid ${tokens.colors.primary}`,
    color: tokens.colors.primary,
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.md,
    fontWeight: '600',
    marginTop: tokens.spacing.lg,
    cursor: 'pointer',
};

export default HomeScreen;
