import { useMemo, useState } from 'react';
import HomeScreen from './screens/Home/HomeScreen';
import VirementsScreen from './screens/Virements/VirementsScreen';
import CartesScreen from './screens/Cartes/CartesScreen';
import SouscrireScreen from './screens/Souscrire/SouscrireScreen';
import PlusScreen from './screens/Plus/PlusScreen';
import BeRankScreen from './screens/BeRank/BeRankScreen';
import './styles/index.css';
import { buildBeRankState, type PurchaseCategory, type SimulatedPurchase } from './utils/beRankSimulation';

function App() {
  const [currentNav, setCurrentNav] = useState('Comptes');
  const [simulatedPurchases, setSimulatedPurchases] = useState<SimulatedPurchase[]>([]);

  const beRankState = useMemo(() => buildBeRankState(simulatedPurchases), [simulatedPurchases]);

  const handleSimulatePurchase = (category: PurchaseCategory, amount: number) => {
    setSimulatedPurchases((currentPurchases) => [
      {
        id: `purchase-${Date.now()}-${currentPurchases.length}`,
        category,
        amount,
        createdAt: new Date().toISOString(),
      },
      ...currentPurchases,
    ]);
  };

  const renderScreen = () => {
    switch (currentNav) {
      case 'Comptes':
        return (
          <HomeScreen
            currentNav={currentNav}
            onNavChange={setCurrentNav}
            beRankSummary={beRankState.summary}
            activeChallengesCount={beRankState.activeChallengesCount}
            transactions={beRankState.transactions}
            onSimulatePurchase={handleSimulatePurchase}
          />
        );
      case 'Virements':
        return <VirementsScreen currentNav={currentNav} onNavChange={setCurrentNav} />;
      case 'Cartes':
        return <CartesScreen currentNav={currentNav} onNavChange={setCurrentNav} />;
      case 'Souscrire':
        return <SouscrireScreen currentNav={currentNav} onNavChange={setCurrentNav} />;
      case 'Plus':
        return <PlusScreen currentNav={currentNav} onNavChange={setCurrentNav} />;
      case 'BeRank':
        return (
          <BeRankScreen
            currentNav={currentNav}
            onNavChange={setCurrentNav}
            summary={beRankState.summary}
            rankingLabel={beRankState.rankingLabel}
            challenges={beRankState.challenges}
            challengeHistory={beRankState.challengeHistory}
            availableRewards={beRankState.availableRewards}
            nextReward={beRankState.nextReward}
            impactMetrics={beRankState.impactMetrics}
            detectedEvents={beRankState.detectedEvents}
            onSimulatePurchase={handleSimulatePurchase}
          />
        );
      default:
        return (
          <HomeScreen
            currentNav={currentNav}
            onNavChange={setCurrentNav}
            beRankSummary={beRankState.summary}
            activeChallengesCount={beRankState.activeChallengesCount}
            transactions={beRankState.transactions}
            onSimulatePurchase={handleSimulatePurchase}
          />
        );
    }
  };

  return (
    <>
      {renderScreen()}
      {/* 
          We render BottomNav inside screens because of the layout structure,
          but we could also render it once here if shared across all screens.
          However, the current screens already include it.
      */}
    </>
  );
}

export default App;
