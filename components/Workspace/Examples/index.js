import React from "react";
import Phrase from "./ExampleCard";
import TopBar from "./TopBar";
import { useState } from "react";

export const Examples = () => {
  const phrases = [
    "What’s the most innovative theme of ITP Projects?",
    "Describe the most innovative 3d game modeling projects from the 1980s that utilized early computer graphics.",
    "In 2075, ITP students will use AR to redefine social interactions. Describe a project and its implications on privacy and connections.",
    "Imagine that all the ITP student work represents the DNA of a university program. Describe a university program based on this DNA",
    "Write an advertisement poem about ITP Spring Show.",
    "How did ITP projects evolve in terms of multimedia storytelling from the 2000s to the 2010s?",
    "Design the “ITP version” of these common objects: Toaster, bubble tea, supercomputer, paper clip, pet chihuahua, underpants.",
  ];

  const [items, setItems] = useState([]);

  const sortedItems = items.sort(
    (a, b) => countHighlights(b, selectedTags) - countHighlights(a, selectedTags)
  );
  const hidePhrases = false;
  return (
    <div>
      <TopBar />
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
    </div>
  );
};

export default Examples;
