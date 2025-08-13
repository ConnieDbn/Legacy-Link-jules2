
import React, { useContext } from 'react';
import { FontSizeContext } from '../contexts/FontSizeContext';

const FontSizeControls = () => {
  const { fontSize, increaseFontSize, decreaseFontSize } = useContext(FontSizeContext);

  return (
    <div className="font-controls" role="group" aria-label="Font size controls">
      <span 
        style={{ 
          color: 'white', 
          fontSize: '0.9em', 
          marginRight: '0.5em',
          fontWeight: '500'
        }}
      >
        Text Size:
      </span>
      <button
        className="font-control-btn"
        onClick={decreaseFontSize}
        aria-label="Decrease font size"
        title="Make text smaller"
        type="button"
      >
        A-
      </button>
      <span 
        style={{ 
          color: 'white', 
          fontSize: '0.8em', 
          padding: '0 0.3em',
          fontWeight: '600'
        }}
        aria-live="polite"
      >
        {fontSize}px
      </span>
      <button
        className="font-control-btn"
        onClick={increaseFontSize}
        aria-label="Increase font size"
        title="Make text larger"
        type="button"
      >
        A+
      </button>
    </div>
  );
};

export default FontSizeControls;
