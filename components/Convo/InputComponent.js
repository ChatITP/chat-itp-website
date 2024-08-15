import React, { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import ChatWindow from "./ChatWindow";
import DropZone from "./DropZone";
import Image from "next/image";
import Link from "next/link";
import Background from "./Background";
import Phrase from "./Phrase";

const ItemType = {
  PHRASE: "phrase",
};

const CHAT_WINDOW_DIMENSIONS = {
  width: 500,
  height: 278,
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

const InputComponent = ({ phrases = [] }) => {
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
  const [hidePhrases, setHidePhrases] = useState(false);

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
    const unselectedTags = defaultTagsPool.filter(
      (tag) => !selectedTags.includes(tag)
    );
    const shuffledTags = [...unselectedTags].sort(() => 0.5 - Math.random());
    setDefaultTags([
      ...selectedTags,
      ...shuffledTags.slice(0, 5 - selectedTags.length),
      "Add Custom Tag",
    ]);
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleHidePhrase = () => {
    setHidePhrases((prevState) => !prevState);
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
    const newDefaultTags = [...defaultTags];
    newDefaultTags[index] = editingText;
    setDefaultTags(newDefaultTags);
    setModifiedTags((prev) => new Set(prev).add(newDefaultTags[index]));
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
        x: delta.x - CHAT_WINDOW_DIMENSIONS.width/0.8,
        y: delta.y - CHAT_WINDOW_DIMENSIONS.height/0.8,
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
              className="my-auto ml-4"
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
                      style={{
                        ...tagStyles,
                        width:
                          tag === "Add Custom Tag" ? "120px" : tagStyles.width,
                      }}
                      className={`cursor-pointer text-xs ${
                        selectedTags.includes(tag)
                          ? "bg-lightBlue text-blue"
                          : tag === "Add Custom Tag"
                          ? "bg-white/20 border underline border-white/20 text-white/50 w-32"
                          : "bg-none border border-white text-white"
                      } font-semibold rounded-lg px-3 py-1 whitespace-nowrap`}
                    >
                      {editingTagIndex === index ? (
                        <input
                          type="text"
                          value={editingText}
                          onChange={handleEditChange}
                          onKeyDown={(e) => handleEditKeyDown(e, index)}
                          onBlur={() => saveEditedTag(index)}
                          className="w-full h-full text-center bg-yellow/80 border-none outline-none"
                        />
                      ) : (
                        <span>{tag}</span>
                      )}
                    </div>
                  ))}
              </div>
              <div className="flex items-center ml-2 space-x-2">
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
            <div className="flex justify-end mr-4">
              <button className="mr-2" onClick={randomizePhrases}>
                <p className="text-sm font-semibold text-white/80">
                  Refresh examples
                </p>
              </button>

              <div
                  className="relative group"
                  style={{ width: "32px", height: "29px" }}
                >
                  <div className="absolute inset-0 bg-darkGray rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <Image
                      src="/switch.svg"
                      alt="refresh icon"
                      width={20}
                      height={20}
                      className="z-10"
                      onClick={randomizePhrases}
                    />
                  </div>
                </div>
              {hidePhrases && (
                <div
                  className="relative group"
                  onClick={handleHidePhrase}
                  style={{ width: "32px", height: "29px" }}
                >
                  <div className="absolute inset-0 bg-darkGray rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <Image
                      src="/toggle2.svg"
                      alt="hide icon"
                      width={17}
                      height={17}
                      className="z-10"
                    />
                  </div>
                </div>
              )}

              {!hidePhrases && (
                <div
                  className="relative group"
                  onClick={handleHidePhrase}
                  style={{ width: "32px", height: "29px" }}
                >
                  <div className="absolute inset-0 bg-darkGray rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <Image
                      src="/toggle.svg"
                      alt="hide icon"
                      width={17}
                      height={17}
                      className="z-10"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-6 p-2 overflow-x-auto whitespace-nowrap max-w-[1440px] ml-4">
          {!hidePhrases &&
            sortedItems.map((phrase, index) => (
              <Phrase
                key={index}
                phrase={phrase}
                selectedTags={selectedTags}
                highlightText={highlightText}
                onClick={handleClick}
              />
            ))}
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
