import React, { useState, useEffect, useCallback } from 'react';
import DraggableChatInterface from './DraggableChatInterface'; // Ensure the path is correct

const DropZone = ({ id, children }) => {
  const [chatInterfaces, setChatInterfaces] = useState([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);

  const handleDoubleClick = (e) => {
    const dropZoneRect = e.currentTarget.getBoundingClientRect();
    const newChat = {
      id: Date.now(),
      position: { x: e.clientX - dropZoneRect.left, y: e.clientY - dropZoneRect.top },
    };
    setChatInterfaces([...chatInterfaces, newChat]);
  };

  const handleDelete = () => {
    if (selectedChatIndex !== null) {
      const updatedChats = chatInterfaces.filter((_, i) => i !== selectedChatIndex);
      setChatInterfaces(updatedChats);
      setSelectedChatIndex(null);
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Delete') {
      handleDelete();
    }
  }, [selectedChatIndex, chatInterfaces]);

  const handleClickOutside = useCallback((e) => {
    if (!e.target.closest('.chat-interface-container')) {
      setSelectedChatIndex(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      className="p-4 bg-black border border-gray-500 rounded-lg h-screen relative"
      onDoubleClick={handleDoubleClick}
      onClick={() => setSelectedChatIndex(null)} // Deselect on click outside
    >
      {children}
      {chatInterfaces.map((chat, index) => (
        <div
          key={chat.id}
          className="chat-interface-container"
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from propagating to parent
            setSelectedChatIndex(index);
          }}
        >
          <DraggableChatInterface
            id={`chat-${chat.id}`}
            initialX={chat.position.x}
            initialY={chat.position.y}
            isSelected={index === selectedChatIndex}
            onClick={() => setSelectedChatIndex(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default DropZone;








