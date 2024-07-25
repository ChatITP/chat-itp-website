import React, { useState, useEffect, useRef } from 'react';
import ChatInterface from './ChatInterface'; // Adjust the path if necessary

const DraggableChatInterface = ({ id, initialX, initialY, isSelected, onClick }) => {
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

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: 'pointer',
        zIndex: 1,
        border: isSelected ? '2px solid blue' : 'none',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
      className={`${isSelected ? 'shadow-lg' : ''}`}
      onMouseDown={handleMouseDown}
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

