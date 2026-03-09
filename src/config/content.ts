/**
 * Banxo Sandbox Mock Content
 * Updated from real app screenshots
 */

export const mockContent = {
    user: {
        firstName: 'JEAN',
        lastName: 'DUPONT',
    },
    mainAccount: {
        label: 'Compte individuel',
        balance: '1 235,55 €',
        iban: '**4****2',
    },
    secondaryAccounts: [
        { id: 1, label: 'LIVRET A', balance: '2 950,00 €', progress: 40, status: 'Il est encore possible d\'épargner' },
        { id: 2, label: 'LIVRET JEUNE', balance: '1 600,00 €', progress: 100, status: 'Plafond du livret atteint !' },
        { id: 3, label: 'PEL 16 2014', balance: '5 540,20 €', progress: null },
        { id: 4, label: 'MILLEVIE ESSENTIELLE', balance: ' 373,00 €', category: 'Placements financiers' },
        { id: 5, label: 'PRET CONSO', balance: '4 200,00 €', category: 'Crédits' },
    ],
    recentTransactions: [
        { id: 1, label: 'Boulangerie Paul', date: 'Aujourd\'hui', amount: '-4,50 €', category: 'Alimentation' },
        { id: 2, label: 'Virement de Marie', date: 'Hier', amount: '+150,00 €', category: 'Virement' },
        { id: 3, label: 'Netflix', date: '04 Fév.', amount: '-17,99 €', category: 'Loisirs' },
    ],
    navigation: [
        { label: 'Comptes', icon: '🏦', active: true },
        { label: 'Virements', icon: '↔️', active: false },
        { label: 'Cartes', icon: '💳', active: false },
        { label: 'Souscrire', icon: '✏️', active: false },
        { label: 'Plus', icon: '☰', active: false },
    ],
    headerTabs: ['Tous', 'Personnaliser'],
    sections: {
        current: 'Comptes courants',
        savings: 'Epargne disponible (3)',
        investments: 'Placements financiers',
        loans: 'Crédits',
        explore: 'Aller plus loin avec votre banque'
    }
};
