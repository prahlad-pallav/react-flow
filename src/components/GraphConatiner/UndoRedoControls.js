// components/UndoRedoControls.js
import React from 'react';

const UndoRedoControls = ({ handleUndo, handleRedo, historyIndex, fontSizeHistory, colorHistory }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 10,
        left: '10%',
        transform: 'translateX(-50%)',
        zIndex: 10,
      }}
    >
      <div>
        <button onClick={() => handleUndo('font')} disabled={historyIndex <= 0}>
          Undo Font Size
        </button>
        <button onClick={() => handleRedo('font')} disabled={historyIndex >= fontSizeHistory.length - 1}>
          Redo Font Size
        </button>
      </div>
      <div>
        <button onClick={() => handleUndo('color')} disabled={historyIndex <= 0}>
          Undo Color
        </button>
        <button onClick={() => handleRedo('color')} disabled={historyIndex >= colorHistory.length - 1}>
          Redo Color
        </button>
      </div>
    </div>
  );
};

export default UndoRedoControls;
