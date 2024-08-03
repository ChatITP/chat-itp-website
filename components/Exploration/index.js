"use client"
import React, { useState } from 'react';
import DraggableChatInterface from "components/Convo/DraggableChatInterface"

const Explore = () => {
  const [showDraggableChat, setShowDraggableChat] = useState(false);

  const handleDoubleClick = () => {
    setShowDraggableChat(true);
  };

  return (
    <div
      className="h-screen min-h-[640px] block pt-[60px] relative z-10 bg-blue"
      onDoubleClick={handleDoubleClick}
    >
      {showDraggableChat && (
        <DraggableChatInterface
          id="chat1"
          initialX={200}
          initialY={200}
          isSelected={true}
          onDeselect={() => setShowDraggableChat(false)}
        />
      )}
    </div>
  );
};

export default Explore;


