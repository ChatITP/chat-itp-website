import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { DndContext, useDroppable } from '@dnd-kit/core';
import DraggableChatInterface from './DraggableChatInterface'; 
import request from 'app/lib/request'; 

const DropZone = forwardRef(({ id, children }, ref) => {
  const [chatInterfaces, setChatInterfaces] = useState([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);

  // const handleDoubleClick = (e) => {
  //   const dropZoneRect = e.currentTarget.getBoundingClientRect();
  //   const newChat = {
  //     id: Date.now(),
  //     position: { x: e.clientX - dropZoneRect.left, y: e.clientY - dropZoneRect.top },
  //   };
  //   setChatInterfaces([...chatInterfaces, newChat]);
  // };

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
      const response = await request('POST', process.env.NEXT_PUBLIC_API_URL+'/llm/generate', {
        userPrompt: question.join(' '),
      });
      return response.data.content;
    } catch (error) {
      console.error('Error sending message:', error);
      return 'Failed to get a response from the model.';
    }
  };

  const { setNodeRef } = useDroppable({
    id: 'drop-zone',
    data: {
      items: droppedItems.map(item => ({ id: item.id, text: item.text })),
    },
  });

  const handleDragEnd = async (event) => {
    const { over, active } = event;
    if (over && over.id === 'drop-zone') {
      const dropZoneElement = ref.current;
      if (dropZoneElement) {
        const dropZoneRect = dropZoneElement.getBoundingClientRect();
        const mouseX = event.delta.clientX - dropZoneRect.left;
        const mouseY = event.delta.clientY - dropZoneRect.top;
        const newId = `new-${active.id}-${Date.now()}`;
        const answer = await sendMessageToModel([active.id]);
        setDroppedItems((prev) => [
          ...prev,
          { id: newId, originalId: active.id, text: active.data.current.text, x: mouseX, y: mouseY, answer },
        ]);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
    <div
      ref={setNodeRef}
      className="rounded-lg max-h-8-vh absolute z-10"
      onClick={() => setSelectedChatIndex(null)} 
    >
      {children}
      
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
    </DndContext>
  );
});

DropZone.displayName = 'DropZone';

export default DropZone;

