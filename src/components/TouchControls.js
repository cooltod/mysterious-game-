import React from 'react';

function TouchControls({ onTouchStart, onTouchEnd }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      userSelect: 'none'
    }}>
      <button
        style={{ width: '60px', height: '60px', marginBottom: '10px' }}
        onTouchStart={() => onTouchStart('up')}
        onTouchEnd={() => onTouchEnd('up')}
      >
        ▲
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '140px' }}>
        <button
          style={{ width: '60px', height: '60px' }}
          onTouchStart={() => onTouchStart('left')}
          onTouchEnd={() => onTouchEnd('left')}
        >
          ◄
        </button>
        <button
          style={{ width: '60px', height: '60px' }}
          onTouchStart={() => onTouchStart('right')}
          onTouchEnd={() => onTouchEnd('right')}
        >
          ►
        </button>
      </div>
      <button
        style={{ width: '60px', height: '60px', marginTop: '10px' }}
        onTouchStart={() => onTouchStart('down')}
        onTouchEnd={() => onTouchEnd('down')}
      >
        ▼
      </button>
    </div>
  );
}

export default TouchControls;