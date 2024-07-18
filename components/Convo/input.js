"use client";
import { useState, useRef } from "react";
import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { DropZone } from './DropZone';

const Input = ({ tags = [], setTags, phrases = [] }) => {
  const [searchKey, setSearchKey] = useState("");
  const [items, setItems] = useState(phrases);
  const [droppedItems, setDroppedItems] = useState([]);
  const tagsContainerRef = useRef(null);

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

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === 'drop-zone') {
      setItems((items) => items.filter(item => item !== active.id));
      setDroppedItems((droppedItems) => [...droppedItems, active.id]);
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
            <Draggable key={phrase} id={phrase}>
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-white w-full md:w-auto cursor-move">
                {highlightText(phrase, tags)}
              </div>
            </Draggable>
          ))}
        </div>
        <DropZone id="drop-zone">
          {droppedItems.map((item, index) => (
            <div key={index} className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-white w-full md:w-auto">
              {highlightText(item, tags)}
            </div>
          ))}
        </DropZone>
      </DndContext>
    </div>
  );
};

export default Input
