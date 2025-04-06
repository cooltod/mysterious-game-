import React, { useState } from 'react';
import GameMenu from './components/GameMenu';
import DivineAkshayaGame from './components/DivineAkshayaGame';

function App() {
  const [selectedHero, setSelectedHero] = useState(null);

  return (
    <div>
      {selectedHero ? (
        <DivineAkshayaGame selectedHero={selectedHero} />
      ) : (
        <GameMenu onHeroSelect={(hero) => setSelectedHero(hero)} />
      )}
    </div>
  );
}

export default App;