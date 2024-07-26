import React, { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from 'react-dnd';
import ChatWindow from "./ChatWindow";
import DropZone from "./DropZone";
import Image from "next/image";
import Link from "next/link";

const ItemType = {
  PHRASE: 'phrase',
};

const InputComponent = ({ tags = [], setTags, phrases = [] }) => {
  const [searchKey, setSearchKey] = useState("");
  const [items, setItems] = useState(phrases);
  const [clickedItem, setClickedItem] = useState(null);
  const tagsContainerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchKey.trim() !== "") {
      setTags([...tags, searchKey.trim()]);
      setSearchKey("");
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

  const handleClick = (item) => {
    setClickedItem(item);
  };

  const clearTags = () => {
    setTags([]);
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
        className={`border border-white/50 rounded-lg p-4 text-white/80 cursor-pointer text-sm hover:bg-white/20 ${isDragging ? 'opacity-50' : ''}`}
        style={{ width: "316px" }}
        onClick={() => handleClick(phrase)}
      >
        {highlightText(phrase, tags)}
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
      <div className="flex flex-row gap-4 bg-gray px-2 pt-4 pb-2">
        <Link href="/about">
          <Image
            src="/logo.png"
            alt="logo icon"
            width={70}
            height={61}
            className="my-auto"
          />
        </Link>

        <div className="h-[38px] w-[450px] flex items-center rounded-lg border border-blue pl-4 text-sm my-auto">
          <div
            ref={tagsContainerRef}
            className="flex overflow-x-auto space-x-2 max-w-[360px]"
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
            className="flex-grow bg-gray outline-none text-white pl-2"
            value={searchKey}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search Here"
          />
          <Image
            src="/switch.svg"
            alt="switch icon"
            width={20}
            height={20}
            className="my-auto mr-2 cursor-pointer"
            onClick={clearTags}
          />
        </div>
      </div>

      <div className="flex gap-6 p-2">
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



