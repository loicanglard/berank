export interface BeRankSummary {
    rank: string;
    points: number;
    nextRank: string;
    pointsToNextRank: number;
    progressPercent: number;
    cta: string;
    nextReward: string;
}

export interface BeRankEarnWay {
    id: string;
    icon: string;
    title: string;
    description: string;
    pointsLabel: string;
}

export interface BeRankChallenge {
    id: string;
    title: string;
    progressLabel: string;
    progressPercent: number;
    rewardPoints: number;
    completed: boolean;
}

export interface BeRankReward {
    id: string;
    title: string;
    description: string;
    unlockLabel: string;
    available: boolean;
}

export interface BeRankImpactMetric {
    id: string;
    label: string;
    value: string;
}

export const beRankContent = {
    summary: {
        rank: 'Silver',
        points: 1240,
        nextRank: 'Gold',
        pointsToNextRank: 260,
        progressPercent: 82,
        cta: 'Voir mes défis',
        nextReward: '2 % cashback responsable',
    } satisfies BeRankSummary,
    earnWays: [
        {
            id: 'eco-purchases',
            icon: '🌿',
            title: 'Achats écoresponsables',
            description: 'Privilégiez des enseignes engagées et des achats utiles du quotidien.',
            pointsLabel: '+80 pts',
        },
        {
            id: 'savings',
            icon: '💶',
            title: 'Épargne régulière',
            description: 'Alimentez votre épargne chaque mois pour renforcer vos habitudes.',
            pointsLabel: '+100 pts',
        },
        {
            id: 'financial-challenges',
            icon: '🎯',
            title: 'Défis financiers',
            description: 'Atteignez des objectifs simples pour mieux piloter vos dépenses.',
            pointsLabel: '+60 pts',
        },
        {
            id: 'mobility',
            icon: '🚲',
            title: 'Mobilité durable',
            description: 'Valorisez vos trajets à faible émission et vos choix de mobilité douce.',
            pointsLabel: '+60 pts',
        },
        {
            id: 'education',
            icon: '📘',
            title: 'Bonus pédagogiques',
            description: 'Consultez des conseils d’éducation financière pour gagner des points.',
            pointsLabel: '+40 pts',
        },
    ] satisfies BeRankEarnWay[],
    challenges: [
        {
            id: 'responsible-purchases',
            title: 'Effectuer 3 achats responsables cette semaine',
            progressLabel: '2 / 3 achats',
            progressPercent: 67,
            rewardPoints: 80,
            completed: false,
        },
        {
            id: 'save-20',
            title: 'Mettre 20 € sur un compte épargne',
            progressLabel: '20 € / 20 €',
            progressPercent: 100,
            rewardPoints: 100,
            completed: true,
        },
        {
            id: 'limit-leisure',
            title: 'Limiter les dépenses loisirs pendant 5 jours',
            progressLabel: '3 / 5 jours',
            progressPercent: 60,
            rewardPoints: 70,
            completed: false,
        },
        {
            id: 'low-emission',
            title: 'Utiliser un transport à faible émission',
            progressLabel: '1 / 3 trajets',
            progressPercent: 34,
            rewardPoints: 60,
            completed: false,
        },
        {
            id: 'financial-tip',
            title: 'Lire un conseil d’éducation financière',
            progressLabel: 'Conseil consulté',
            progressPercent: 100,
            rewardPoints: 40,
            completed: true,
        },
    ] satisfies BeRankChallenge[],
    rewards: [
        {
            id: 'cashback',
            title: '2 % cashback responsable',
            description: 'Sur une sélection d’enseignes engagées et partenaires.',
            unlockLabel: 'Déjà débloqué',
            available: true,
        },
        {
            id: 'mobility-offer',
            title: 'Réduction sur offre mobilité',
            description: 'Avantage partenaire sur des services de mobilité durable.',
            unlockLabel: 'Déblocage au rang Gold',
            available: false,
        },
        {
            id: 'green-savings',
            title: 'Bonus sur épargne verte',
            description: 'Conditions préférentielles sur une offre d’épargne responsable.',
            unlockLabel: 'Déblocage au rang Gold',
            available: false,
        },
        {
            id: 'partner-offer',
            title: 'Offre partenaire engagée',
            description: 'Avantages exclusifs auprès de marques à impact positif.',
            unlockLabel: 'Déblocage au rang Impact+',
            available: false,
        },
    ] satisfies BeRankReward[],
    impactMetrics: [
        { id: 'responsible-purchases', label: 'Achats responsables réalisés', value: '12' },
        { id: 'points-month', label: 'Points gagnés ce mois-ci', value: '180' },
        { id: 'completed-challenges', label: 'Défis complétés', value: '7' },
        { id: 'positive-impact', label: 'Impact positif estimé', value: '+18 kg CO₂' },
    ] satisfies BeRankImpactMetric[],
};