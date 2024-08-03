import React, { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import ChatWindow from "./ChatWindow";
import DropZone from "./DropZone";
import Image from "next/image";
import Link from "next/link";

const ItemType = {
  PHRASE: "phrase",
};

const InputComponent = ({ initialTags = [], phrases = [] }) => {
  const [searchKey, setSearchKey] = useState("");
  const [items, setItems] = useState(phrases);
  const [clickedItem, setClickedItem] = useState(null);
  const tagsContainerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [tags, setTags] = useState(["performance", "Traditional", "innovative", "Arduino", "C++", "3D modeling", "Futuristic", ...initialTags]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchKey.trim() !== "") {
      setTags([...tags, searchKey.trim()]);
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

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const highlightText = (text, highlights) => {
    if (!highlights.length || !selectedTags.length) return text;
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

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleClick = (item) => {
    setClickedItem(item);
  };

  const clearTags = () => {
    setTags([]);
    setSelectedTags([]);
  };

  const Phrase = ({ phrase }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemType.PHRASE,
      item: { phrase },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        className={`border border-white/50 rounded-lg p-4 text-white/80 cursor-pointer text-sm hover:bg-white/20 ${
          isDragging ? "opacity-50" : ""
        }`}
        style={{ minWidth: "316px", whiteSpace: "normal" }}
        onClick={() => handleClick(phrase)}
      >
        {highlightText(phrase, selectedTags)}
      </div>
    );
  };

  const [, drop] = useDrop({
    accept: ItemType.PHRASE,
    drop: (item) => setClickedItem(item.phrase),
  });

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-row gap-4 bg-gray px-2 pt-4 pb-2 items-center">
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
          <div className="flex overflow-x-auto space-x-2 flex-grow">
            <div ref={tagsContainerRef} className="flex space-x-2">
              {tags.length > 0 &&
                tags.map((tag, index) => (
                  <div
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className={`cursor-pointer flex items-center text-xs ${
                      selectedTags.includes(tag)
                        ? "bg-lightBlue text-blue"
                        : "bg-none border border-white text-white"
                    } font-semibold rounded-lg px-3 py-1 whitespace-nowrap`}
                  >
                    <span>{tag}</span>
                    {selectedTags.includes(tag) && <button
                      type="button"
                      className={`ml-2 text-lightBlue bg-blue w-4 h-4 flex items-center justify-center rounded-full ${
                        ["3D", "innovative"].includes(tag) ? "hidden" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(index);
                      }}
                    >
                      &times;
                    </button>}
                    
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
            <div className="flex items-center ml-2">
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
                className="ml-2 cursor-pointer"
                onClick={clearTags}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 p-2 overflow-x-auto whitespace-nowrap max-w-[1440px]">
        {items.map((phrase, index) => (
          <Phrase key={index} phrase={phrase} />
        ))}
      </div>
      <DropZone>
        <div ref={drop} className="flex justify-center pt-6 h-full">
          {clickedItem && <ChatWindow initialMessage={clickedItem} />}
        </div>
      </DropZone>
    </div>
  );
};

InputComponent.displayName = "InputComponent";

export default InputComponent;

