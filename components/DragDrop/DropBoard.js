'use client'
import React from 'react';
import { useDrop } from 'react-dnd';

const DropBoard = ({ onDrop, droppedItems }) => {
  const boardSize = 500; 
  const gridSize = 3; 
  const cellSize = boardSize / gridSize; 

  const [, drop] = useDrop(() => ({
    accept: 'square',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const dropArea = document.getElementById('dropBoard').getBoundingClientRect();

      const x = clientOffset.x - dropArea.left;
      const y = clientOffset.y - dropArea.top;

      const gridX = Math.floor(x / cellSize);
      const gridY = Math.floor(y / cellSize);

      const finalX = gridX * cellSize + cellSize / 2 - 75; 
      const finalY = gridY * cellSize + cellSize / 2 - 75; 
      onDrop({ ...item, x: finalX, y: finalY });
    },
  }));

  return (
    <div
      id="dropBoard"
      ref={drop}
      className="relative w-[500px] h-[500px] bg-white/20 border border-gray-300"
    >
      {droppedItems.map((item, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            width: '100px',
            height: '100px',
            backgroundColor: item.color,
            borderRadius:20,
          }}
        />
      ))}
    </div>
  );
};

export default DropBoard;
