import React from "react";
import ExampleCard from "./ExampleCard";
import { tagState, showExamplesState, exampleState } from "../../../contexts/examples";
import { useRecoilValue } from "recoil";
import escapeRegExp from "@/utils/escapeRegExp";
import ExampleCardsController from "./ExampleCardsController";

const ExampleCards = () => {
  const showExamples = useRecoilValue(showExamplesState);
  const tags = useRecoilValue(tagState);
  const examples = useRecoilValue(exampleState);

  const tagNames = tags.filter((tag) => tag.isSelected).map((tag) => tag.name);
  /**
   * Count the number of tag matches that exist in a string of text.
   */
  const countTagMatches = (text) => {
    if (tagNames.length === 0) {
      return 0;
    }
    const escapedTagNames = tagNames.map(escapeRegExp);
    const regex = new RegExp(`(${escapedTagNames.join("|")})`, "gi");
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  };

  const sortedExamples = [...examples].sort(
    (a, b) => countTagMatches(b.text) - countTagMatches(a.text)
  );

  const displayExamples = sortedExamples.slice(0, 10);

  if (!showExamples) {
    return (
      <div className="flex justify-end">
        <ExampleCardsController />
      </div>
    );
  }
  return (
    <div>
      <div className="flex overflow-x-scroll mt-6 pb-2 scrollbar-thumb-[#313131] scrollbar-thin scrollbar-track-transparent w-full">
        {displayExamples.map((example, index) => (
          <ExampleCard key={index} text={example.text} phrases={example.phrases} />
        ))}
      </div>
      <div className="flex justify-end">
        <ExampleCardsController />
      </div>
    </div>
  );
};

export default ExampleCards;
