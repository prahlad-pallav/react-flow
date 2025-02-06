// components/NodeCustomizationPanel.js
import React from 'react';

const NodeCustomizationPanel = ({ newLabel, handleLabelChange, handleSaveLabel }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '100px', 
        left: '10px', 
        zIndex: 10,
        backgroundColor: 'white',
        padding: '5px',
        borderRadius: '5px',
        width: '200px', 
      }}
    >
      <input
        type="text"
        value={newLabel}
        onChange={handleLabelChange}
        placeholder="Enter new node name"
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <button onClick={handleSaveLabel} style={{ width: '100%' }}>Save</button>
    </div>
  );
};

export default NodeCustomizationPanel;
