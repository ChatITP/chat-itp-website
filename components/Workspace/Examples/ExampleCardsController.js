import React from "react";
import { showExamplesState, exampleState } from "../../../contexts/examples";
import { useRecoilState, useSetRecoilState } from "recoil";
import shuffle from "@/utils/shuffle";
import { FaAngleDoubleUp } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import promptData from "public/prompt_data.json";

//function to pick 10 random items from json file
const pickRandomPrompts = (prompts, count) => {
  return [...prompts].sort(() => 0.5 - Math.random()).slice(0, count);
};
const ExampleCardsController = () => {
  const [showExamples, setShowExamples] = useRecoilState(showExamplesState);
  const setExamples = useSetRecoilState(exampleState);

  const handleShowHideExamples = () => {
    setShowExamples((prev) => !prev);
  };

  const handleRefreshExamples = () => {
    setExamples(() => pickRandomPrompts(promptData, 10));
  };

  return (
    <div className="flex pr-2 mt-1">
      {showExamples ? (
        <>
          <button
            className="px-2 py-1 text-sm text-white flex items-center flex-none hover:bg-gray rounded-md"
            onClick={handleRefreshExamples}
          >
            <div className="mr-1">Refresh examples</div>
            <FaArrowsRotate />
          </button>
          <button
            className="px-2 py-1 text-sm text-white flex items-center flex-none hover:bg-gray rounded-md"
            onClick={handleShowHideExamples}
          >
            <div className="mr-1">Hide Examples</div>
            <FaAngleDoubleUp />
          </button>
        </>
      ) : (
        <button
          className="px-2 py-1 text-sm text-white flex items-center flex-none hover:bg-gray rounded-md"
          onClick={handleShowHideExamples}
        >
          <div className="mr-1">Show Examples</div>
          <FaAngleDoubleDown />
        </button>
      )}
    </div>
  );
};

export default ExampleCardsController;
