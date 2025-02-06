// components/FontSizeControl.js
import React from 'react';

const FontSizeControl = ({ fontSize, handleFontSizeChange }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '200px',
        left: '10px',
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      }}
    >
      <label>Font Size: {fontSize}px</label>
      <input
        type="range"
        min="12"
        max="24"
        value={fontSize}
        onChange={handleFontSizeChange}
      />
    </div>
  );
};

export default FontSizeControl;
