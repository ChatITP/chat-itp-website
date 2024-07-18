import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const DropZone = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className="p-4 bg-black border border-gray-500 rounded-lg min-h-[200px]">
      {children}
    </div>
  );
};
