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

/**
 * detectionStatus replaces the old manual `completed` boolean.
 * - 'detected'    : a relevant event was detected, the challenge has started automatically
 * - 'in_progress' : the system is collecting enough events to close the challenge
 * - 'completed'   : automatic completion threshold reached
 * - 'reward_unlocked' : reward was granted automatically after completion
 */
export type BeRankDetectionStatus = 'detected' | 'in_progress' | 'completed' | 'reward_unlocked';

export interface BeRankChallenge {
    id: string;
    title: string;
    detectedFrom: string;           // human-readable source event description
    progressLabel: string;
    progressPercent: number;
    rewardPoints: number;
    detectionStatus: BeRankDetectionStatus;
    /** @deprecated kept for backward-compat with BeRankScreen sort helper */
    completed: boolean;
    /** @deprecated kept for backward-compat  */
    status?: 'in_progress' | 'not_started' | 'completed';
}

export interface BeRankReward {
    id: string;
    title: string;
    description: string;
    /** Short label shown on the card, e.g. "Actif depuis le 18 mars" */
    unlockLabel: string;
    /** Banking-grade reward type label shown on card */
    rewardType: string;
    available: boolean;
}

export interface BeRankImpactMetric {
    id: string;
    label: string;
    value: string;
}

/** A single automatically detected banking event shown in the "Activité détectée" section. */
export interface BeRankDetectedEvent {
    id: string;
    label: string;
    detail: string;
    /** ISO date string used to compute relative time display */
    detectedAt: string;
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

    /**
     * Mocked stream of recently auto-detected banking events.
     * In a real system these would come from transaction analysis.
     */
    detectedEvents: [
        {
            id: 'evt-1',
            label: 'Achat responsable détecté',
            detail: 'Biocoop — 24,50 €',
            detectedAt: '2026-03-23T09:14:00+01:00',
        },
        {
            id: 'evt-2',
            label: 'Virement épargne détecté',
            detail: 'Livret A — 50 €',
            detectedAt: '2026-03-22T18:30:00+01:00',
        },
        {
            id: 'evt-3',
            label: '7 jours sans découvert',
            detail: 'Solde positif maintenu',
            detectedAt: '2026-03-22T00:00:00+01:00',
        },
        {
            id: 'evt-4',
            label: 'Transport bas carbone détecté',
            detail: 'Navigo — Île-de-France Mobilités',
            detectedAt: '2026-03-21T08:05:00+01:00',
        },
        {
            id: 'evt-5',
            label: 'Contenu éducatif consulté',
            detail: 'Guide : Optimiser son épargne',
            detectedAt: '2026-03-20T20:45:00+01:00',
        },
    ] satisfies BeRankDetectedEvent[],

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
            description: "Consultez des conseils d'éducation financière pour gagner des points.",
            pointsLabel: '+40 pts',
        },
    ] satisfies BeRankEarnWay[],

    /**
     * Challenges are generated automatically from detected spending patterns.
     * `detectedFrom` explains which mocked behavior triggered the challenge.
     */
    challenges: [
        {
            id: 'responsible-purchases',
            title: 'Effectuer 3 achats responsables cette semaine',
            detectedFrom: 'Dépenses loisirs fréquentes détectées → défi modération proposé',
            progressLabel: '2 / 3 achats',
            progressPercent: 67,
            rewardPoints: 80,
            detectionStatus: 'in_progress',
            completed: false,
            status: 'in_progress',
        },
        {
            id: 'save-20',
            title: 'Mettre 20 € sur un compte épargne',
            detectedFrom: 'Virement épargne régulier détecté → défi continuité proposé',
            progressLabel: '20 € / 20 €',
            progressPercent: 100,
            rewardPoints: 100,
            detectionStatus: 'reward_unlocked',
            completed: true,
            status: 'completed',
        },
        {
            id: 'limit-leisure',
            title: 'Limiter les dépenses loisirs pendant 5 jours',
            detectedFrom: 'Catégorie loisirs > 30 % des dépenses → défi modération proposé',
            progressLabel: '3 / 5 jours',
            progressPercent: 60,
            rewardPoints: 70,
            detectionStatus: 'in_progress',
            completed: false,
            status: 'in_progress',
        },
        {
            id: 'low-emission',
            title: 'Utiliser un transport à faible émission 3 fois',
            detectedFrom: 'Premier trajet Navigo détecté → défi mobilité proposé',
            progressLabel: '1 / 3 trajets',
            progressPercent: 34,
            rewardPoints: 60,
            detectionStatus: 'detected',
            completed: false,
            status: 'in_progress',
        },
        {
            id: 'financial-tip',
            title: "Lire un conseil d'éducation financière",
            detectedFrom: 'Contenu éducatif consulté → défi apprentissage proposé',
            progressLabel: 'Conseil consulté',
            progressPercent: 100,
            rewardPoints: 40,
            detectionStatus: 'reward_unlocked',
            completed: true,
            status: 'completed',
        },
    ] satisfies BeRankChallenge[],

    rewards: [
        {
            id: 'cashback',
            title: '2 % cashback responsable',
            description: "Remboursement automatique sur les achats auprès d'enseignes partenaires engagées.",
            unlockLabel: 'Actif depuis le 1er mars',
            rewardType: 'Cashback bancaire',
            available: true,
        },
        {
            id: 'fee-reduction',
            title: 'Frais de gestion réduits',
            description: 'Réduction de 50 % sur les frais de tenue de compte pendant 3 mois.',
            unlockLabel: 'Disponible au rang Gold',
            rewardType: 'Réduction de frais',
            available: false,
        },
        {
            id: 'green-savings',
            title: 'Taux bonifié sur Livret Responsable',
            description: '+0,20 % sur votre Livret Responsable pendant 6 mois.',
            unlockLabel: 'Disponible au rang Gold',
            rewardType: 'Bonus épargne',
            available: false,
        },
        {
            id: 'partner-offer',
            title: 'Avantages partenaires engagés',
            description: 'Réductions chez des enseignes partenaires à impact positif (Naturalia, Decathlon...).',
            unlockLabel: 'Disponible au rang Impact+',
            rewardType: 'Avantage partenaire',
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