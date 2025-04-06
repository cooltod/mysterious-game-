import React from 'react';

const heroes = [
  { name: "Raghav", image: "/assets/images/raghav_seeker_full.png" },
  { name: "Devi Aarohi", image: "/assets/images/devi_aarohi_full.png" },
  { name: "Vikram", image: "/assets/images/vikram_protector_full.png" },
  { name: "Kaveri", image: "/assets/images/kaveri_trickster_full.png" },
  { name: "Siddharth", image: "/assets/images/siddharth_sage_full.png" }
];

function GameMenu({ onHeroSelect }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>The Quest for the Divine Akshaya</h1>
      <p>
        In the ancient land of Akshaya, dark forces conspire to seize the hidden Divine Akshaya token.
        Only a pure-hearted hero can unlock its secrets and restore balance. Choose your hero and begin your quest!
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {heroes.map((hero) => (
          <div key={hero.name} style={{ margin: '10px', textAlign: 'center' }}>
            <img
              src={hero.image}
              alt={hero.name}
              style={{ width: '150px', height: '150px', borderRadius: '10px', border: '2px solid #ccc' }}
            />
            <h3>{hero.name}</h3>
            <button onClick={() => onHeroSelect(hero.name)}>Select {hero.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameMenu;