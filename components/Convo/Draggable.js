import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const Draggable = ({ id, children, isDropped }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id,
  });

  const style = {
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
    transition,
    backgroundColor: isDropped ? 'blue' : 'transparent',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="z-50">
      {children}
    </div>
  );
};

export default Draggable;





