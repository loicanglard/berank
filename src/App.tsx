import { useMemo, useState, useRef, useEffect } from 'react';
import HomeScreen from './screens/Home/HomeScreen';
import VirementsScreen from './screens/Virements/VirementsScreen';
import CartesScreen from './screens/Cartes/CartesScreen';
import SouscrireScreen from './screens/Souscrire/SouscrireScreen';
import PlusScreen from './screens/Plus/PlusScreen';
import BeRankScreen from './screens/BeRank/BeRankScreen';
import BeShopScreen from './screens/BeShop/BeShopScreen';
import './styles/index.css';
import { buildBeRankState, type PurchaseCategory, type SimulatedPurchase } from './utils/beRankSimulation';

function App() {
  const [currentNav, setCurrentNav] = useState('Comptes');
  const [simulatedPurchases, setSimulatedPurchases] = useState<SimulatedPurchase[]>([]);
  const [beCoins, setBeCoins] = useState(320);
  const prevChallengesRef = useRef<string>('');

  const beRankState = useMemo(() => buildBeRankState(simulatedPurchases), [simulatedPurchases]);

  // Detect newly completed challenges and add BeCoins
  useEffect(() => {
    const currentCompletedIds = beRankState.challengeHistory.map((h) => h.id).join(',');
    
    if (prevChallengesRef.current !== currentCompletedIds && beRankState.challengeHistory.length > 0) {
      // Find the most recent completed challenge
      const mostRecent = beRankState.challengeHistory[0];
      const rewardCoins = mostRecent?.rewardCoins ?? 0;
      if (rewardCoins > 0) {
        setBeCoins((prev) => prev + rewardCoins);
      }
    }
    
    prevChallengesRef.current = currentCompletedIds;
  }, [beRankState.challengeHistory]);

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
            beCoins={beCoins}
          />
        );
      case 'BeShop':
        return (
          <BeShopScreen
            currentNav={currentNav}
            onNavChange={setCurrentNav}
            beCoins={beCoins}
            onSpendCoins={(amount) => setBeCoins(Math.max(0, beCoins - amount))}
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
