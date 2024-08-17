import React from "react";

const ItemType = {
  PHRASE: "phrase",
};

const ExampleCard = ({ onClick, text }) => {
  const highlightText = (text) => {
    return text;
  };

  return (
    <div className="mx-3 flex-none border border-white/50 rounded-lg p-4 w-[300px] h-[120px] text-white cursor-pointer text-sm font-sans hover:bg-[#696969] bg-gray2/60">
      {highlightText(text)}
    </div>
  );
};

export default ExampleCard;
