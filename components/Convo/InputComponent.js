import React, { useState, useRef, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import DropZone from './DropZone'; 
import ChatWindow from './ChatWindow';
import Draggable from './Draggable'; 

const InputComponent = ({ tags = [], setTags, phrases = [] }) => {
  const [searchKey, setSearchKey] = useState("");
  const [items, setItems] = useState(phrases);
  const [droppedItems, setDroppedItems] = useState([]);
  const [droppedMessage, setDroppedMessage] = useState('');
  const tagsContainerRef = useRef(null);
  const dropZoneRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchKey.trim() !== "") {
      setTags([...tags, searchKey.trim()]);
      setSearchKey("");
      setTimeout(() => {
        if (tagsContainerRef.current) {
          tagsContainerRef.current.scrollLeft = tagsContainerRef.current.scrollWidth;
        }
      }, 100);
    }
  };

  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const highlightText = (text, highlights) => {
    if (!highlights.length) return text;
    const regex = new RegExp(`(${highlights.join("|")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      highlights.some(
        (highlight) => part.toLowerCase() === highlight.toLowerCase()
      ) ? (
        <span key={index} className="bg-blue text-white rounded-lg px-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === 'drop-zone') {
      const droppedItemText = items.find(item => item === active.id);
      setDroppedMessage(droppedItemText);

      const dropZoneElement = dropZoneRef.current;
      if (dropZoneElement) {
        const dropZoneRect = dropZoneElement.getBoundingClientRect();
        const mouseX = event.delta.clientX - dropZoneRect.left;
        const mouseY = event.delta.clientY - dropZoneRect.top;
        const newId = `new-${active.id}-${Date.now()}`;
        setDroppedItems((droppedItems) => [
          ...droppedItems,
          { id: newId, originalId: active.id, text: droppedItemText, x: mouseX, y: mouseY }
        ]);
      }
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="h-[38px] w-[450px] flex items-center rounded-lg border border-blue-500 pl-4 text-sm bg-black">
        <div
          ref={tagsContainerRef}
          className="flex overflow-x-auto scrollbar-hide space-x-2 max-w-[360px]"
        >
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-lightBlue text-blue font-semibold rounded-lg px-2 py-1 whitespace-nowrap mr-2"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  className="ml-2 text-lightBlue bg-blue w-4 h-4 flex items-center justify-center rounded-full"
                  onClick={() => removeTag(index)}
                >
                  &times;
                </button>
              </div>
            ))}
        </div>
        <input
          className="flex-grow bg-black outline-none text-white pl-2"
          value={searchKey}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Here"
        />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-row gap-4">
          {items.map((phrase, index) => (
            <Draggable
              key={phrase}
              id={phrase}
              isDropped={droppedItems.some(item => item.originalId === phrase)}
              position={droppedItems.find(item => item.originalId === phrase) || { x: 0, y: 0 }}
              data={{ text: phrase }}
            >
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-white w-full md:w-auto cursor-move">
                {highlightText(phrase, tags)}
              </div>
            </Draggable>
          ))}
        </div>
        <div ref={dropZoneRef}>
          <DropZone id="drop-zone" ref={dropZoneRef}>
            {droppedItems.length > 0 && <ChatWindow initialMessage={droppedMessage} />}
            {droppedItems.map((item, index) => (
              <div
                key={index}
                className="hidden bg-blue border border-gray-600 rounded-lg p-4 text-white w-full md:w-auto"
                style={{ position: 'absolute', left: item.x, top: item.y }}
              >
                {highlightText(item.originalId, tags)}
              </div>
            ))}
          </DropZone>
        </div>
      </DndContext>
    </div>
  );
};

InputComponent.displayName = 'InputComponent';

export default InputComponent;

