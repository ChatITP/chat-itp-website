import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import DraggableChatInterface from './DraggableChatInterface'; // Ensure the path is correct
import request from 'app/lib/request'; // Ensure the path is correct

const DropZone = forwardRef(({ id, children }, ref) => {
  const [chatInterfaces, setChatInterfaces] = useState([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);

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

  const sendMessageToModel = async (question) => {
    try {
      const response = await request('POST', 'http://localhost:3001/llm/generate', {
        userPrompt: question.join(' '),
      });
      return response.data.content;
    } catch (error) {
      console.error('Error sending message:', error);
      return 'Failed to get a response from the model.';
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (over && over.id === 'drop-zone') {
      const dropZoneElement = ref.current;
      if (dropZoneElement) {
        const dropZoneRect = dropZoneElement.getBoundingClientRect();
        const mouseX = event.clientX - dropZoneRect.left;
        const mouseY = event.clientY - dropZoneRect.top;
        const newId = `new-${active.id}-${Date.now()}`;
        const answer = await sendMessageToModel([active.id]);
        setDroppedItems((droppedItems) => [
          ...droppedItems,
          { id: newId, originalId: active.id, x: mouseX, y: mouseY, answer },
        ]);
      }
    }
  };

  return (
    <div
      ref={ref}
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
      {droppedItems.map((item, index) => (
        <div
          key={item.id}
          className="bg-blue border border-gray-600 rounded-lg p-4 text-white w-full md:w-auto"
          style={{ position: 'absolute', left: item.x, top: item.y }}
        >
          {item.originalId}: {item.answer}
        </div>
      ))}
    </div>
  );
});

DropZone.displayName = 'DropZone';

export default DropZone;





