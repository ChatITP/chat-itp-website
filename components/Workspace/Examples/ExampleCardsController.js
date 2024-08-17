import React from "react";
import Image from "next/image";
import { useState } from "react";
import { showExamplesState } from "./contexts";
import { useRecoilState } from "recoil";

const ExampleCardsController = () => {
  const [showExamples, setShowExamples] = useRecoilState(showExamplesState);

  const handleShowHideExamples = () => {
    setShowExamples((prev) => !prev);
  };

  return (
    <div className="flex">
      <button className="p-2 text-sm text-white/80 flex text-nowrap flex-none hover:bg-gray2 rounded-md ">
        <div className="mr-2">Refresh examples</div>
        <Image className="flex-none" src="/switch.svg" alt="refresh icon" width={20} height={20} />
      </button>
      {showExamples ? (
        <button
          className="p-2 text-sm text-white/80 flex text-nowrap flex-none hover:bg-gray2 rounded-md"
          onClick={handleShowHideExamples}
        >
          <div className="text-sm text-white/80 mr-2">Hide Examples</div>
          <Image src="/toggle.svg" alt="show icon" width={17} height={17} />
        </button>
      ) : (
        <button
          className="p-2 text-sm text-white/80 flex text-nowrap flex-none hover:bg-gray2 rounded-md"
          onClick={handleShowHideExamples}
        >
          <div className="text-sm text-white/80 mr-2">Show Examples</div>
          <Image src="/toggle2.svg" alt="hide icon" width={17} height={17} />
        </button>
      )}
    </div>
  );
};

export default ExampleCardsController;
