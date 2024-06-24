'use client'
import React, { useState } from 'react';
import Drag from './Drag';
import DropBoard from './DropBoard';

const DragList = [
  {
    id: 1,
    color: '#6CA2D9',
  },
  {
    id: 2,
    color: '#C8DFF7',
  },
  {
    id: 3,
    color: '#743AA4',
  },
];

const DragDrop = () => {
  const [dragList, setDragList] = useState(DragList);
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (item) => {
    setDroppedItems((prevItems) => [...prevItems, item]);
    setDragList((prevList) => prevList.filter((drag) => drag.id !== item.id));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div id="drag" className="pt-[70px] flex gap-6">
        {dragList.map((drag) => (
          <Drag key={drag.id} id={drag.id} color={drag.color} />
        ))}
      </div>
      <div id="dropBoard">
        <DropBoard onDrop={handleDrop} droppedItems={droppedItems} />
      </div>
    </div>
  );
};

export default DragDrop;

