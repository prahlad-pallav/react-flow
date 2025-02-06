import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, BackgroundVariant, applyNodeChanges,
  applyEdgeChanges, addEdge } from '@xyflow/react';
import { SketchPicker } from 'react-color';
import '@xyflow/react/dist/style.css';
import { useSelector, useDispatch } from "react-redux";
import { setFontSize } from "./store/fontSizeSlice";
import { setColor } from './store/colorSlice';
import { addFontSizeToHistory, undoFontSize, redoFontSize } from './store/fontSizeHistorySlice';
import { addColorToHistory, undoColor, redoColor } from './store/colorHistorySlice';
import ReactFlowComponent from './components/GraphConatiner/ReactFlowComponent';
import NodeCustomizationPanel from './components/GraphConatiner/NodeCustomizationPanel';
import UndoRedoControls from './components/GraphConatiner/UndoRedoControls';

import FontSizeControl from './components/FontSizeControl';
import ColorPicker from './components/ColorPicker';

const initialEdges = [{ id: '1-2', source: '1', target: '2' }];
const initialNodes = [
  { "id": "4", "data": { "label": "Node 4" }, "position": { "x": 500.0, "y": 300.0 }},
  { "id": "5", "data": { "label": "Node 5" }, "position": { "x": 461.8, "y": 417.56 } },
  { "id": "6", "data": { "label": "Node 6" }, "position": { "x": 361.8, "y": 490.21 } },
  { "id": "7", "data": { "label": "Node 7" }, "position": { "x": 238.2, "y": 490.21 } },
  { "id": "8", "data": { "label": "Node 8" }, "position": { "x": 138.2, "y": 417.56 } },
  { "id": "9", "data": { "label": "Node 9" }, "position": { "x": 100.0, "y": 300.0 } },
  { "id": "10", "data": { "label": "Node 10" }, "position": { "x": 138.2, "y": 182.44 } },
  { "id": "1", "data": { "label": "Node 1" }, "position": { "x": 238.2, "y": 109.79 } },
  { "id": "2", "data": { "label": "Node 2" }, "position": { "x": 361.8, "y": 109.79 } },
  { "id": "3", "data": { "label": "Node 3" }, "position": { "x": 461.8, "y": 182.44 } }
];

function App() {
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.fontSize.size);
  const color = useSelector((state) => state.color.color);
  const fontSizeHistory = useSelector((state) => state.fontSizeHistory.fontSizeHistory);
  const historyIndex = useSelector((state) => state.fontSizeHistory.historyIndex);
  const colorHistory = useSelector((state) => state.colorHistory.colorHistory);

  const [variant, setVariant] = useState(BackgroundVariant.Dots);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [newLabel, setNewLabel] = useState('');

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    setColor(node.style?.background || '#ffffff'); 
    setNewLabel(node.data.label); 
    dispatch(setFontSize(parseInt(node.style?.fontSize || 16, 10)));

    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id
          ? { ...n, style: { ...n.style, border: '2px solid #0000FF' } } 
          : { ...n, style: { ...n.style, border: '' } }
      )
    );
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

const handleFontSizeChange = (event) => {
  const newSize = event.target.value;
  dispatch(setFontSize(newSize));

  if (selectedNode) {
    dispatch(addFontSizeToHistory(newSize));

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNode.id
          ? { ...node, style: { ...node.style, fontSize: `${newSize}px` } }
          : node
      )
    );
  }
};

const handleUndo = (type) => {
  if (type === 'font') {
    dispatch(undoFontSize());
    const prevSize = fontSizeHistory[historyIndex - 1];
    dispatch(setFontSize(prevSize));
    updateNodeStyle('font', prevSize);
  }

  if (type === 'color') {
    if (historyIndex > 0) {
      dispatch(undoColor());
      const prevColor = colorHistory[historyIndex - 1];
      dispatch(setColor(prevColor));
      updateNodeStyle('color', prevColor);
    }
  }
};

const handleRedo = (type) => {
  if (type === 'font') {
    dispatch(redoFontSize());
    const nextSize = fontSizeHistory[historyIndex + 1];
    dispatch(setFontSize(nextSize));
    updateNodeStyle('font', nextSize);
  }
  if (type === 'color') {
    if (historyIndex < colorHistory.length - 1) {
      dispatch(redoColor());
      const nextColor = colorHistory[historyIndex + 1];
      dispatch(setColor(nextColor));
      updateNodeStyle('color', nextColor);
    }
  }
};


const updateNodeStyle = (type, value) => {
  if (selectedNode) {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNode.id
          ? type === 'font'
            ? { ...node, style: { ...node.style, fontSize: `${value}px` } }
            : { ...node, style: { ...node.style, background: value } }
          : node
      )
    );
  }
};

  const handleColorChange = (newColor) => {
    if (!newColor || !newColor.hex) return;
    dispatch(setColor(newColor.hex));

    if (selectedNode) {
      dispatch(addColorToHistory(newColor.hex));

      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id
            ? { ...node, style: { ...node.style, background: newColor.hex } }
            : node
        )
      );
    }
  };

  const handleLabelChange = (event) => {
    setNewLabel(event.target.value);
  };

  const handleSaveLabel = () => {
    if (selectedNode && newLabel) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id ? { ...node, data: { ...node.data, label: newLabel } } : node
        )
      );
    }
  };



  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          marginBottom: '20px',
        }}
      >
        <button onClick={() => setVariant(BackgroundVariant.Dots)}>Dots</button>
        <button onClick={() => setVariant(BackgroundVariant.Lines)}>Lines</button>
        <button onClick={() => setVariant(BackgroundVariant.Cross)}>Cross</button>
      </div>
      
      {selectedNode && (
      <ColorPicker 
        color={color} 
        handleColorChange={handleColorChange} 
      />
    )}

      <ReactFlowComponent
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        handleNodeClick={handleNodeClick}
        onPaneClick={onPaneClick}
        variant={variant}
      />

      
      {selectedNode && (
        <NodeCustomizationPanel
          newLabel={newLabel}
          handleLabelChange={handleLabelChange}
          handleSaveLabel={handleSaveLabel}
        />
      )}

      {selectedNode && (
        <FontSizeControl 
          fontSize={fontSize} 
          handleFontSizeChange={handleFontSizeChange} 
        />
      )}

      <UndoRedoControls
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        historyIndex={historyIndex}
        fontSizeHistory={fontSizeHistory}
        colorHistory={colorHistory}
      />

    </>
  );
}

export default App;
