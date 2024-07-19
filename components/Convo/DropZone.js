import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import ChatInterface from './Chat'; // Ensure path is correct

const DropZone = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const [showChat, setShowChat] = useState(false);

  const handleDoubleClick = () => {
    setShowChat(true);
  };

  return (
    <div
      ref={setNodeRef}
      className="p-4 bg-black border border-gray-500 rounded-lg min-h-[200px]"
      onDoubleClick={handleDoubleClick}
    >
      {children}
      {showChat && <ChatInterface />}
    </div>
  );
};

export default DropZone;
