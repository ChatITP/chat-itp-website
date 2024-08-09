import React, { useRef } from "react";
import { useState } from "react";
import { Phrase } from "./Phrase";
import useClickInOutDetector from "@/hooks/clickInOutDetector";

const colors = [
  "#72b8ff",
  "#b3ffa0",
  "#d8b1ff",
  "#fff495",
  "#fdc87d",
  "#fdc0e5",
  "#6ca2d9",
  "#ff9c9c",
];

const AssociationPrompt = () => {
  const promptUIRef = useRef(null);
  useClickInOutDetector(
    promptUIRef,
    () => {},
    () => setEditing(false)
  );

  const [editing, setEditing] = useState(false);
  const [promptPhrases, setPromptPhrases] = useState([
    { text: "What", color: colors[0], isSelected: false },
    { text: "is the most common", color: colors[1], isSelected: false },
    { text: "historical theme", color: colors[2], isSelected: false },
    { text: "of ITP Projects?", color: colors[3], isSelected: false },
  ]);

  const handlePhraseClick = (id) => {
    const updatedPromptPhrases = promptPhrases.map((phrase, index) => {
      if (index === id) {
        return { ...phrase, isSelected: true };
      } else {
        return { ...phrase, isSelected: false };
      }
    });
    setEditing(true);
    setPromptPhrases(updatedPromptPhrases);
  };
  console.log(editing);
  return (
    <div className="bg-[#252525] w-[500px] leading-10 pl-6 pr-8 py-6" ref={promptUIRef}>
      {promptPhrases.map((prompt, index) => (
        <Phrase
          key={index}
          color={prompt.color}
          editing={editing}
          isSelected={prompt.isSelected}
          onClick={() => handlePhraseClick(index)}
        >
          {prompt.text}
        </Phrase>
      ))}
    </div>
  );
};

export default AssociationPrompt;
