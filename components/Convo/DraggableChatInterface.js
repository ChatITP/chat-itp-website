import React from 'react';
import ChatInterface from './ChatInterface'; // Adjust the path if necessary

const DraggableChatInterface = ({
  initialX,
  initialY,
  isSelected,
  onClick,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: initialX,
        top: initialY,
        cursor: 'pointer',
        zIndex: 1,
        border: isSelected ? '2px solid blue' : 'none',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
      className={`${isSelected ? 'shadow-lg' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <ChatInterface />
    </div>
  );
};

export default DraggableChatInterface;





