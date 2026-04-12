import {
    beRankContent,
    type BeRankChallenge,
    type BeRankDetectedEvent,
    type BeRankImpactMetric,
    type BeRankReward,
    type BeRankSummary,
} from '../config/berank';
import { mockContent } from '../config/content';

export type PurchaseCategory = 'Responsable' | 'Loisir' | 'Transport' | 'Épargne';

export interface SimulatedPurchase {
    id: string;
    category: PurchaseCategory;
    amount: number;
    createdAt: string;
}

export interface AccountTransaction {
    id: string | number;
    label: string;
    date: string;
    amount: string;
    category: string;
}

export interface CompletedChallengeHistoryEntry {
    id: string;
    title: string;
    completedAt: string;
    rewardPoints: number;
    unlockedBenefit?: string;
}

export interface DerivedBeRankState {
    summary: BeRankSummary;
    challenges: BeRankChallenge[];
    rewards: BeRankReward[];
    availableRewards: BeRankReward[];
    nextReward: BeRankReward;
    impactMetrics: BeRankImpactMetric[];
    detectedEvents: BeRankDetectedEvent[];
    transactions: AccountTransaction[];
    challengeHistory: CompletedChallengeHistoryEntry[];
    activeChallengesCount: number;
    rankingLabel: string;
}

const euroFormatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
});

const rankThresholds = [
    { rank: 'Bronze', threshold: 0 },
    { rank: 'Silver', threshold: 500 },
    { rank: 'Gold', threshold: 1000 },
    { rank: 'Platinum', threshold: 1500 },
] as const;

const categoryPoints: Record<PurchaseCategory, number> = {
    Responsable: 20,
    Épargne: 30,
    Transport: 15,
    Loisir: -5,
};

const responsiblePurchaseTiers = [
    { target: 3, rewardPoints: 80 },
    { target: 5, rewardPoints: 120 },
    { target: 10, rewardPoints: 180 },
    { target: 15, rewardPoints: 250 },
    { target: 20, rewardPoints: 350 },
] as const;

const categoryCopy: Record<
    PurchaseCategory,
    {
        transactionLabel: string;
        eventLabel: string;
        detailPrefix: string;
    }
> = {
    Responsable: {
        transactionLabel: 'Achat responsable',
        eventLabel: 'Achat responsable détecté',
        detailPrefix: 'Enseigne engagée',
    },
    Loisir: {
        transactionLabel: 'Achat loisir',
        eventLabel: 'Dépense loisirs détectée',
        detailPrefix: 'Loisir',
    },
    Transport: {
        transactionLabel: 'Transport durable',
        eventLabel: 'Transport bas carbone détecté',
        detailPrefix: 'Mobilité',
    },
    Épargne: {
        transactionLabel: 'Versement épargne',
        eventLabel: 'Virement épargne détecté',
        detailPrefix: 'Livret A',
    },
};

export const purchaseCategories: PurchaseCategory[] = ['Responsable', 'Loisir', 'Transport', 'Épargne'];

export const getCategoryPoints = (category: PurchaseCategory): number => categoryPoints[category];

const formatEuro = (amount: number): string => euroFormatter.format(amount);

const parseFirstNumber = (value: string): number => {
    const match = value.match(/[0-9]+/);
    return match ? Number.parseInt(match[0], 10) : 0;
};

const getBaseChallengeProgress = (challengeId: string): number => {
    const challenge = beRankContent.challenges.find((item) => item.id === challengeId);
    return parseFirstNumber(challenge?.progressLabel ?? '0');
};

const getResponsiblePurchaseCount = (purchases: SimulatedPurchase[]): number =>
    getBaseChallengeProgress('responsible-purchases') + purchases.filter((purchase) => purchase.category === 'Responsable').length;

const isFinishedChallenge = (challenge: BeRankChallenge): boolean =>
    challenge.detectionStatus === 'completed' || challenge.detectionStatus === 'reward_unlocked';

const buildSummary = (points: number, nextRewardTitle: string): BeRankSummary => {
    const currentIndex = rankThresholds.reduce((bestIndex, rank, index) => (points >= rank.threshold ? index : bestIndex), 0);
    const currentRank = rankThresholds[currentIndex];
    const nextRank = rankThresholds[currentIndex + 1];
    const progressPercent = nextRank
        ? Math.round(((points - currentRank.threshold) / (nextRank.threshold - currentRank.threshold)) * 100)
        : 100;

    return {
        rank: currentRank.rank,
        points,
        nextRank: nextRank?.rank ?? 'Rang max',
        pointsToNextRank: nextRank ? Math.max(nextRank.threshold - points, 0) : 0,
        progressPercent: Math.max(0, Math.min(100, progressPercent)),
        cta: beRankContent.summary.cta,
        nextReward: nextRewardTitle,
    };
};

const buildChallenges = (purchases: SimulatedPurchase[]): BeRankChallenge[] => {
    const responsibleCount = getResponsiblePurchaseCount(purchases);
    const transportCount = purchases.filter((purchase) => purchase.category === 'Transport').length;
    const leisureCount = purchases.filter((purchase) => purchase.category === 'Loisir').length;

    return beRankContent.challenges.map((challenge) => {
        if (challenge.id === 'responsible-purchases') {
            const activeTier = responsiblePurchaseTiers.find((tier) => responsibleCount < tier.target)
                ?? responsiblePurchaseTiers[responsiblePurchaseTiers.length - 1];
            const currentCount = Math.min(responsibleCount, activeTier.target);
            const completed = responsibleCount >= activeTier.target;

            return {
                ...challenge,
                title: `Effectuer ${activeTier.target} achats responsables cette semaine`,
                progressLabel: `${currentCount} / ${activeTier.target} achats`,
                progressPercent: Math.round((currentCount / activeTier.target) * 100),
                rewardPoints: activeTier.rewardPoints,
                detectionStatus: completed && activeTier.target === 20 ? 'completed' : 'in_progress',
                completed: completed && activeTier.target === 20,
                status: completed && activeTier.target === 20 ? 'completed' : 'in_progress',
            };
        }

        if (challenge.id === 'low-emission') {
            const currentCount = Math.min(parseFirstNumber(challenge.progressLabel) + transportCount, 3);
            const completed = currentCount >= 3;

            return {
                ...challenge,
                progressLabel: `${currentCount} / 3 trajets`,
                progressPercent: Math.round((currentCount / 3) * 100),
                detectionStatus: completed ? 'completed' : 'in_progress',
                completed,
                status: completed ? 'completed' : 'in_progress',
            };
        }

        if (challenge.id === 'limit-leisure') {
            const currentDays = Math.max(parseFirstNumber(challenge.progressLabel) - leisureCount, 0);

            return {
                ...challenge,
                progressLabel: `${currentDays} / 5 jours`,
                progressPercent: Math.round((currentDays / 5) * 100),
                detectionStatus: currentDays > 0 ? 'in_progress' : 'detected',
                completed: false,
                status: currentDays > 0 ? 'in_progress' : 'not_started',
            };
        }

        return { ...challenge };
    });
};

const buildRewards = (purchases: SimulatedPurchase[], totalPoints: number): BeRankReward[] => {
    const savingsTotal = purchases
        .filter((purchase) => purchase.category === 'Épargne')
        .reduce((sum, purchase) => sum + purchase.amount, 0);
    const responsiblePurchaseCount = getResponsiblePurchaseCount(purchases);

    return beRankContent.rewards.map((reward) => {
        if (reward.available) {
            return { ...reward };
        }

        if (reward.id === 'fee-reduction' && purchases.length > 0 && totalPoints >= 1000) {
            return { ...reward, available: true, unlockLabel: 'Débloqué via votre progression BeRank' };
        }

        if (reward.id === 'green-savings' && savingsTotal >= 20) {
            return { ...reward, available: true, unlockLabel: 'Débloqué grâce à votre effort d’épargne' };
        }

        if (reward.id === 'partner-offer' && responsiblePurchaseCount >= responsiblePurchaseTiers[0].target) {
            return { ...reward, available: true, unlockLabel: 'Débloqué après 3 achats responsables' };
        }

        return { ...reward };
    });
};

const buildDetectedEvents = (purchases: SimulatedPurchase[]): BeRankDetectedEvent[] => {
    const simulatedEvents = purchases.map((purchase) => ({
        id: `evt-${purchase.id}`,
        label: categoryCopy[purchase.category].eventLabel,
        detail: `${categoryCopy[purchase.category].detailPrefix} — ${formatEuro(purchase.amount)}`,
        detectedAt: purchase.createdAt,
    }));

    return [...simulatedEvents, ...beRankContent.detectedEvents];
};

const buildTransactions = (purchases: SimulatedPurchase[]): AccountTransaction[] => {
    const simulatedTransactions = purchases.map((purchase) => ({
        id: purchase.id,
        label: categoryCopy[purchase.category].transactionLabel,
        date: 'À l’instant',
        amount: `-${formatEuro(purchase.amount)}`,
        category: purchase.category,
    }));

    return [...simulatedTransactions, ...mockContent.recentTransactions];
};

const buildChallengeHistory = (purchases: SimulatedPurchase[]): CompletedChallengeHistoryEntry[] => {
    const baseResponsibleCount = getBaseChallengeProgress('responsible-purchases');
    const responsiblePurchases = purchases
        .filter((purchase) => purchase.category === 'Responsable')
        .slice()
        .sort((left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime());

    const historyEntries = responsiblePurchaseTiers.reduce<CompletedChallengeHistoryEntry[]>((entries, tier, index) => {
        const purchaseIndex = tier.target - baseResponsibleCount - 1;

        if (purchaseIndex < 0 || purchaseIndex >= responsiblePurchases.length) {
            return entries;
        }

        entries.push({
            id: `responsible-tier-${tier.target}`,
            title: `Effectuer ${tier.target} achats responsables cette semaine`,
            completedAt: responsiblePurchases[purchaseIndex].createdAt,
            rewardPoints: tier.rewardPoints,
            unlockedBenefit: index === 0 ? 'Avantages partenaires engagés débloqués' : undefined,
        });

        return entries;
    }, []);

    return historyEntries.sort(
        (left, right) => new Date(right.completedAt).getTime() - new Date(left.completedAt).getTime(),
    );
};

const buildImpactMetrics = (purchases: SimulatedPurchase[], challenges: BeRankChallenge[]): BeRankImpactMetric[] => {
    const responsibleCount = purchases.filter((purchase) => purchase.category === 'Responsable').length;
    const transportCount = purchases.filter((purchase) => purchase.category === 'Transport').length;
    const savingsCount = purchases.filter((purchase) => purchase.category === 'Épargne').length;
    const leisureCount = purchases.filter((purchase) => purchase.category === 'Loisir').length;
    const totalPointsDelta = purchases.reduce((sum, purchase) => sum + getCategoryPoints(purchase.category), 0);
    const baseCompletedChallenges = beRankContent.challenges.filter(isFinishedChallenge).length;
    const additionalCompletedChallenges = Math.max(challenges.filter(isFinishedChallenge).length - baseCompletedChallenges, 0);

    return beRankContent.impactMetrics.map((metric) => {
        if (metric.id === 'responsible-purchases') {
            return { ...metric, value: String(Number.parseInt(metric.value, 10) + responsibleCount) };
        }

        if (metric.id === 'points-month') {
            return { ...metric, value: String(Number.parseInt(metric.value, 10) + totalPointsDelta) };
        }

        if (metric.id === 'completed-challenges') {
            return { ...metric, value: String(Number.parseInt(metric.value, 10) + additionalCompletedChallenges) };
        }

        if (metric.id === 'positive-impact') {
            const baseImpact = Number.parseInt(metric.value, 10);
            const positiveImpact = baseImpact + responsibleCount * 2 + transportCount * 3 + savingsCount - leisureCount;

            return { ...metric, value: `${positiveImpact >= 0 ? '+' : ''}${positiveImpact} kg CO₂` };
        }

        return { ...metric };
    });
};

export const buildBeRankState = (purchases: SimulatedPurchase[]): DerivedBeRankState => {
    const totalPoints = beRankContent.summary.points + purchases.reduce((sum, purchase) => sum + getCategoryPoints(purchase.category), 0);
    const challenges = buildChallenges(purchases);
    const rewards = buildRewards(purchases, totalPoints);
    const availableRewards = rewards.filter((reward) => reward.available);
    const nextReward = rewards.find((reward) => !reward.available) ?? rewards[0];
    const summary = buildSummary(totalPoints, nextReward.title);

    return {
        summary,
        challenges,
        rewards,
        availableRewards,
        nextReward,
        impactMetrics: buildImpactMetrics(purchases, challenges),
        detectedEvents: buildDetectedEvents(purchases),
        transactions: buildTransactions(purchases),
        challengeHistory: buildChallengeHistory(purchases),
        activeChallengesCount: challenges.filter((challenge) => !isFinishedChallenge(challenge)).length,
        rankingLabel: totalPoints >= 1500 ? 'Top 10% des utilisateurs BeRank' : totalPoints >= 1300 ? 'Top 20% des utilisateurs BeRank' : 'Top 35% des utilisateurs BeRank',
    };
};