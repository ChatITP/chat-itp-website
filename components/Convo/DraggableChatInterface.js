import React, { useState, useEffect, useRef } from 'react';
import ChatInterface from './ChatInterface'; 

const DraggableChatInterface = ({ id, initialX, initialY, isSelected, onDeselect }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const positionRef = useRef(position);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        const newX = positionRef.current.x + event.movementX;
        const newY = positionRef.current.y + event.movementY;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const handleMouseDown = (event) => {
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDoubleClick = (event) => {
    event.stopPropagation();
    onDeselect();
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 1,
        border: isSelected ? '2px solid blue' : 'none',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
      className={`${isSelected ? 'shadow-lg' : ''}`}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <ChatInterface />
    </div>
  );
};

export default DraggableChatInterface;


