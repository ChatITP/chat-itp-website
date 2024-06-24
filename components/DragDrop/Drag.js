'use client'
import React from 'react';
import { useDrag } from 'react-dnd';

const Drag = ({ id, color }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'square',
    item: { id, color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="pt-[100px] w-[100px] h-[100px]"
      style={{
        backgroundColor: color,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        borderRadius: 20,
      }}
    >
    </div>
  );
};

export default Drag;
