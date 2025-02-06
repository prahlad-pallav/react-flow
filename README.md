### Deployment Link: https://prahlad-reactflow.netlify.app/
### Github Link: https://github.com/prahlad-pallav/react-flow

## Task Overview

Create an interactive graph visualization application using React Flow that allows users to manipulate and customize graph elements with undo/redo functionality.

## Technical Stack Used

React.js
Redux for state management
React Flow library for graph visualization
JavaScript

## To install the necessary dependencies for your project, you can run the following npm command:
npm install @xyflow/react react-color react-redux
npm install @reduxjs/toolkit


### Features Added:
## Graph Visualization
Initialize a graph with 10 nodes
Each node should be draggable
Nodes should be interconnected with edges 
Implement smooth animations for graph interactions

## Node Customization
Color Modification
Users should be able to select any node 
Provide a color picker to change node colors 
Used SketchPicker Library
Color changes should be reflected immediately
Store color history for undo/redo functionality
Font Size Adjustment
Implement controls to modify node text size
Support standard font sizes (12px to 24px)
Changes should be tracked for undo/redo
Ensure text remains readable at all sizes (

## Undo/Redo Functionality
Implement undo button to revert last action
Implement redo button to restore reverted actions
Track the following actions:
Color changes
Font size modifications
Node position changes
Maintain a history stack of all modifications



