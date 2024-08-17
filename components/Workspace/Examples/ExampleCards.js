import React from "react";
import ExampleCard from "./ExampleCard";
import { showExamplesState } from "./contexts";
import { useRecoilValue } from "recoil";

const examples = [
  "What's the most innovative theme of ITP Projects?",
  "Describe the most innovative 3d game modeling projects from the 1980s that utilized early computer graphics.",
  "In 2075, ITP students will use AR to redefine social interactions. Describe a project and its implications on privacy and connections.",
  "Imagine that all the ITP student work represents the DNA of a university program. Describe a university program based on this DNA",
  "Write an advertisement poem about ITP Spring Show.",
  "How did ITP projects evolve in terms of multimedia storytelling from the 2000s to the 2010s?",
  "Design the “ITP version” of these common objects: Toaster, bubble tea, supercomputer, paper clip, pet chihuahua, underpants.",
];

const ExampleCards = () => {
  const showExamples = useRecoilValue(showExamplesState);

  if (!showExamples) {
    return null;
  }

  return (
    <div className="flex overflow-x-scroll mt-6 pb-2">
      {examples.map((example, index) => (
        <ExampleCard key={index} text={example} />
      ))}
    </div>
  );
};

export default ExampleCards;
