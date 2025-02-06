// components/ColorPicker.js
import React from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ color, handleColorChange }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 10,
        right: 10,
        zIndex: 10,
      }}
    >
      <SketchPicker color={color} onChangeComplete={handleColorChange} />
    </div>
  );
};

export default ColorPicker;
