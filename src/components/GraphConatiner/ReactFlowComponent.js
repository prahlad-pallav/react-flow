// components/ReactFlowComponent.js
import React from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';

const ReactFlowComponent = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, handleNodeClick, onPaneClick, variant }) => {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onPaneClick={onPaneClick} 
        fitView
      >
        <Background color="#ccc" variant={variant} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowComponent;
