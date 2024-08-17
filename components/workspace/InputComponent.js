import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import ChatWindow from "./ChatWindow";
import DropZone from "./DropZone";

const ItemType = {
  PHRASE: "phrase",
};

const CHAT_WINDOW_DIMENSIONS = {
  width: 500,
  height: 278,
};

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const countHighlights = (text, highlights) => {
  if (!highlights.length) return 0;
  const escapedHighlights = highlights.map(escapeRegExp);
  const regex = new RegExp(`(${escapedHighlights.join("|")})`, "gi");
  const matches = text.match(regex);
  return matches ? matches.length : 0;
};

const highlightText = (text, highlights) => {
  if (!highlights.length) return text;
  const escapedHighlights = highlights.map(escapeRegExp);
  const regex = new RegExp(`(${escapedHighlights.join("|")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    escapedHighlights.some((highlight) => part.toLowerCase() === highlight.toLowerCase()) ? (
      <span key={index} className="bg-blue text-white rounded-lg px-1">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const InputComponent = ({ phrases = [] }) => {
  const [searchKey, setSearchKey] = useState("");
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });
  const clickedItemRef = useRef(null);
  const tagsContainerRef = useRef(null);
  const [showInput, setShowInput] = useState(false);
  const [editingTagIndex, setEditingTagIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [modifiedTags, setModifiedTags] = useState(new Set());

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleTagDoubleClick = (index, currentText) => {
    setEditingTagIndex(index);
    setEditingText(currentText);
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditKeyDown = (e, index) => {
    if (e.key === "Enter") {
      saveEditedTag(index);
    }
  };

  const saveEditedTag = (index) => {
    const originalTag = defaultTags[index];
    const newDefaultTags = [...defaultTags];
    const newTag = editingText.trim();

    if (newTag) {
      newDefaultTags[index] = newTag;
      setDefaultTags(newDefaultTags);

      setSelectedTags((prevSelectedTags) => {
        const updatedSelectedTags = prevSelectedTags.filter((tag) => tag !== originalTag);

        if (!updatedSelectedTags.includes(newTag)) {
          updatedSelectedTags.push(newTag);
        }

        return updatedSelectedTags;
      });

      setModifiedTags((prev) => new Set(prev).add(newTag));
    }

    setEditingTagIndex(null);
  };

  const handleClick = (item) => {
    clickedItemRef.current = item;
  };

  const [, drop] = useDrop({
    accept: ItemType.PHRASE,
    drop: (item, monitor) => {
      const delta = monitor.getClientOffset();
      clickedItemRef.current = item.phrase;
      setClickedPosition({
        x: delta.x - CHAT_WINDOW_DIMENSIONS.width / 0.8,
        y: delta.y - CHAT_WINDOW_DIMENSIONS.height / 0.8,
      });
    },
  });

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-0"></div>

      <div className="relative z-10 w-full space-y-2">
        <DropZone>
          <div ref={drop} className="flex justify-center pt-6 h-full">
            {clickedItemRef.current && (
              <ChatWindow
                initialMessage={clickedItemRef.current}
                initialPosition={clickedPosition}
              />
            )}
          </div>
        </DropZone>
      </div>
    </div>
  );
};

export default InputComponent;
