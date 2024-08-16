import React from "react";
import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";
import { useState, useEffect, useRef } from "react";

const TopBar = () => {
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
  const phrases = [
    "What's the most innovative theme of ITP Projects?",
    "Describe the most innovative 3d game modeling projects from the 1980s that utilized early computer graphics.",
    "In 2075, ITP students will use AR to redefine social interactions. Describe a project and its implications on privacy and connections.",
    "Imagine that all the ITP student work represents the DNA of a university program. Describe a university program based on this DNA",
    "Write an advertisement poem about ITP Spring Show.",
    "How did ITP projects evolve in terms of multimedia storytelling from the 2000s to the 2010s?",
    "Design the “ITP version” of these common objects: Toaster, bubble tea, supercomputer, paper clip, pet chihuahua, underpants.",
  ];
  const [defaultTags, setDefaultTags] = useState([]);
  const [hidePhrases, setHidePhrases] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });
  const clickedItemRef = useRef(null);
  const tagsContainerRef = useRef(null);
  const [showInput, setShowInput] = useState(false);
  const [editingTagIndex, setEditingTagIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [modifiedTags, setModifiedTags] = useState(new Set());

  const generateRandomDefaultTags = () => {
    const unselectedTags = defaultTagsPool.filter((tag) => !selectedTags.includes(tag));
    const shuffledTags = [...unselectedTags].sort(() => 0.5 - Math.random());
    setDefaultTags([
      ...selectedTags,
      ...shuffledTags.slice(0, 5 - selectedTags.length),
      "Add Custom Tag",
    ]);
  };
  useEffect(() => {
    generateRandomDefaultTags();
    randomizePhrases();
  }, []);

  const randomizePhrases = () => {
    const shuffledItems = [...phrases].sort(() => 0.5 - Math.random());
  };
  const handleHidePhrase = () => {
    setHidePhrases((prevState) => !prevState);
  };

  return (
    <div className="flex flex-row gap-4 bg-gray px-2 h-[84px] items-center z-20">
      <Link href="/">
        <Image src="/logo.png" alt="logo icon" width={70} height={61} className="my-auto ml-4" />
      </Link>

      <div className="flex flex-row items-center relative w-full ml-4">
        <div className="flex overflow-x-auto space-x-2 flex-grow">
          <div className="flex space-x-2">
            {defaultTags.map((tag, index) => (
              <Tag key={index} />
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
            <p className="text-sm font-sans text-white/80">Refresh examples</p>
          </button>

          <div className="relative group" style={{ width: "32px", height: "29px" }}>
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
                <Image src="/toggle2.svg" alt="hide icon" width={17} height={17} className="z-10" />
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
                <Image src="/toggle.svg" alt="hide icon" width={17} height={17} className="z-10" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
