import { useState } from 'react';
import HomeScreen from './screens/Home/HomeScreen';
import VirementsScreen from './screens/Virements/VirementsScreen';
import CartesScreen from './screens/Cartes/CartesScreen';
import SouscrireScreen from './screens/Souscrire/SouscrireScreen';
import PlusScreen from './screens/Plus/PlusScreen';
import BeRankScreen from './screens/BeRank/BeRankScreen';
import './styles/index.css';

function App() {
  const [currentNav, setCurrentNav] = useState('Comptes');

  const renderScreen = () => {
    switch (currentNav) {
      case 'Comptes':
        return <HomeScreen currentNav={currentNav} onNavChange={setCurrentNav} />;
      case 'Virements':
        return <VirementsScreen currentNav={currentNav} onNavChange={setCurrentNav} />;
      case 'Cartes':
        return <CartesScreen currentNav={currentNav} onNavChange={setCurrentNav} />;
      case 'Souscrire':
        return <SouscrireScreen currentNav={currentNav} onNavChange={setCurrentNav} />;
      case 'Plus':
        return <PlusScreen currentNav={currentNav} onNavChange={setCurrentNav} />;
      case 'BeRank':
        return <BeRankScreen currentNav={currentNav} onNavChange={setCurrentNav} />;
      default:
        return <HomeScreen currentNav={currentNav} onNavChange={setCurrentNav} />;
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
