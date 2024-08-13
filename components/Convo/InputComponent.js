import React, { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import ChatWindow from "./ChatWindow";
import DropZone from "./DropZone";
import Image from "next/image";
import Link from "next/link";
import Background from "./Background";
import Switch from "./Switch";
import Phrase from "./Phrase";

const ItemType = {
  PHRASE: "phrase",
};

const CHAT_WINDOW_DIMENSIONS = {
  width: 669,
  height: 324,
};

const tagStyles = {
  width: "105px",
  height: "30px",
  lineHeight: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "12px",
  fontFamily: "'Open Sans', sans-serif",
};

const InputComponent = ({ initialTags = [], phrases = [] }) => {
  const [searchKey, setSearchKey] = useState("");
  const [items, setItems] = useState([]);
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });
  const clickedItemRef = useRef(null);
  const tagsContainerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [editingTagIndex, setEditingTagIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [modifiedTags, setModifiedTags] = useState(new Set());

  const defaultTagsPool = [
    "Performance",
    "Traditional",
    "Innovative",
    "C++",
    "3D",
    "Futuristic",
    "Generative",
    "Wearables",
    "Prototyping",
    "Cybernetics",
    "Fabrication",
    "Sound Design",
    "Unity",
    "Touch Designer",
    "ITP",
  ];

  const [defaultTags, setDefaultTags] = useState([]);
  const [personalizedTags, setPersonalizedTags] = useState([...initialTags]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setIsClient(true);
    generateRandomDefaultTags();
    randomizePhrases();
  }, []);

  const randomizePhrases = () => {
    const shuffledItems = [...phrases].sort(() => 0.5 - Math.random());
    setItems(shuffledItems);
  };

  const generateRandomDefaultTags = () => {
    const shuffledTags = [...defaultTagsPool].sort(() => 0.5 - Math.random());
    setDefaultTags(shuffledTags.slice(0, 6));
    setSelectedTags([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchKey.trim() !== "") {
      const newTag = searchKey.trim();
      const newPersonalizedTags = [...personalizedTags, newTag];
      const updatedSelectedTags = [...selectedTags, newTag];

      setPersonalizedTags(newPersonalizedTags);
      setSelectedTags(updatedSelectedTags);
      setSearchKey("");
      setShowInput(false);
      setTimeout(() => {
        if (tagsContainerRef.current) {
          tagsContainerRef.current.scrollLeft =
            tagsContainerRef.current.scrollWidth;
        }
      }, 100);
    }
  };

  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  const removeTag = (tagToRemove, isPersonalized) => {
    if (isPersonalized) {
      setPersonalizedTags(
        personalizedTags.filter((tag) => tag !== tagToRemove)
      );
    } else {
      setDefaultTags(defaultTags.filter((tag) => tag !== tagToRemove));
    }
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const highlightText = (text, highlights) => {
    if (!highlights.length) return text;
    const escapedHighlights = highlights.map(escapeRegExp);
    const regex = new RegExp(`(${escapedHighlights.join("|")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      escapedHighlights.some(
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

  const countHighlights = (text, highlights) => {
    if (!highlights.length) return 0;
    const escapedHighlights = highlights.map(escapeRegExp);
    const regex = new RegExp(`(${escapedHighlights.join("|")})`, "gi");
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleClick = (item) => {
    clickedItemRef.current = item;
  };

  const clearTags = () => {
    setPersonalizedTags([]);
    setSelectedTags([]);
  };

  const handleTagDoubleClick = (index, currentText) => {
    setEditingTagIndex(index);
    setEditingText(currentText);
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditKeyDown = (e, index, isPersonalized) => {
    if (e.key === "Enter") {
      saveEditedTag(index, isPersonalized);
    }
  };

  const saveEditedTag = (index, isPersonalized) => {
    if (isPersonalized) {
      const newPersonalizedTags = [...personalizedTags];
      newPersonalizedTags[index] = editingText;
      setPersonalizedTags(newPersonalizedTags);
      setModifiedTags((prev) => new Set(prev).add(newPersonalizedTags[index]));
    } else {
      const newDefaultTags = [...defaultTags];
      newDefaultTags[index] = editingText;
      setDefaultTags(newDefaultTags);
      setModifiedTags((prev) => new Set(prev).add(newDefaultTags[index]));
    }
    setEditingTagIndex(null);
  };

  const [, drop] = useDrop({
    accept: ItemType.PHRASE,
    drop: (item, monitor) => {
      const delta = monitor.getClientOffset();
      clickedItemRef.current = item.phrase; // Update ref instead of state
      setClickedPosition({
        x: delta.x - CHAT_WINDOW_DIMENSIONS.width,
        y: delta.y - CHAT_WINDOW_DIMENSIONS.height,
      });
    },
  });

  if (!isClient) {
    return null;
  }

  const sortedItems = items.sort(
    (a, b) =>
      countHighlights(b, selectedTags) - countHighlights(a, selectedTags)
  );

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <div className="relative z-10 w-full space-y-2">
        <div className="flex flex-row gap-4 bg-gray px-2 pt-4 pb-2 items-center z-20">
          <Link href="/about">
            <Image
              src="/logo.png"
              alt="logo icon"
              width={70}
              height={61}
              className="my-auto"
            />
          </Link>

          <div className="flex flex-row items-center relative w-full ml-4">
            <div
              className="flex overflow-x-auto space-x-2 flex-grow"
              ref={tagsContainerRef}
            >
              <div className="flex space-x-2">
                {defaultTags.length > 0 &&
                  defaultTags.map((tag, index) => (
                    <div
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      onDoubleClick={() => handleTagDoubleClick(index, tag)}
                      style={tagStyles}
                      className={`cursor-pointer text-xs ${
                        selectedTags.includes(tag)
                          ? "bg-lightBlue text-blue"
                          : "bg-none border border-white text-white"
                      } font-semibold rounded-lg px-3 py-1 whitespace-nowrap`}
                    >
                      {editingTagIndex === index ? (
                        <input
                          type="text"
                          value={editingText}
                          onChange={handleEditChange}
                          onKeyDown={(e) => handleEditKeyDown(e, index, false)}
                          onBlur={() => saveEditedTag(index, false)}
                          className="w-full h-full text-center bg-none border-none outline-none"
                        />
                      ) : (
                        <span>{tag}</span>
                      )}
                      {/* {selectedTags.includes(tag) && (
                        <button
                          type="button"
                          className="ml-2 text-lightBlue bg-blue w-4 h-4 flex items-center justify-center rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTag(tag, false);
                          }}
                        >
                          &times;
                        </button>
                      )} */}
                    </div>
                  ))}
                {personalizedTags.length > 0 &&
                  personalizedTags.map((tag, index) => (
                    <div
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      onDoubleClick={() => handleTagDoubleClick(index, tag)}
                      style={tagStyles}
                      className={`cursor-pointer text-xs ${
                        selectedTags.includes(tag)
                          ? "bg-lightBlue text-blue"
                          : "bg-none border border-white text-white"
                      } font-semibold rounded-lg px-3 py-1 whitespace-nowrap`}
                    >
                      {editingTagIndex === index ? (
                        <input
                          type="text"
                          value={editingText}
                          onChange={handleEditChange}
                          onKeyDown={(e) => handleEditKeyDown(e, index, true)}
                          onBlur={() => saveEditedTag(index, true)}
                          className="w-full h-full text-center bg-none border-none outline-none"
                        />
                      ) : (
                        <span>{tag}</span>
                      )}
                      {/* {selectedTags.includes(tag) && (
                        <button
                          type="button"
                          className="ml-2 text-lightBlue bg-blue w-4 h-4 flex items-center justify-center rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTag(tag, true);
                          }}
                        >
                          &times;
                        </button>
                      )} */}
                    </div>
                  ))}
                {showInput && (
                  <input
                    className="bg-gray outline-none text-white pl-2 text-xs"
                    value={searchKey}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Add Custom Keyword"
                    onBlur={() => setShowInput(false)}
                  />
                )}
              </div>
              <div className="flex items-center ml-2 space-x-2">
                {!showInput && (
                  <button
                    className="bg-none border border-white text-white/50 font-semibold py-1 px-3 rounded-md text-xs underline decoration-solid"
                    onClick={() => setShowInput(true)}
                  >
                    Add Custom Keyterm
                  </button>
                )}
                <Image
                  src="/switch.svg"
                  alt="switch icon"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={generateRandomDefaultTags}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 p-2 overflow-x-auto whitespace-nowrap max-w-[1440px]">
          {sortedItems.map((phrase, index) => (
            <Phrase
              key={index}
              phrase={phrase}
              selectedTags={selectedTags}
              highlightText={highlightText}
              onClick={handleClick}
            />
          ))}
        </div>
        <div className="flex justify-end mr-4">
          <button className="mr-2" onClick={randomizePhrases}>
            <p className="text-sm font-semibold text-white/80">
              Refresh examples
            </p>
          </button>
          <Image
            src="/switch.svg"
            alt="switch icon"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={randomizePhrases}
          />
        </div>
        <DropZone>
          <div ref={drop} className="flex justify-center pt-6 h-screen">
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

InputComponent.displayName = "InputComponent";

export default InputComponent;
