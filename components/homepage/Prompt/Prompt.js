import React from "react";

const Prompt = ({ text = "text-holder", tags = [] }) => {
  const getHighlightedText = (text, tags) => {
    const regex = new RegExp(`(${tags.join("|")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      tags.some((tag) => tag === part) ? (
        <span key={index} className="bg-blue-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      id="prompt"
      className="w-[270px] sm:w-[500px] h-[147px] sm:h-[91px] border-[1.5px] border-offWhite/20 px-6 rounded-xl mr-4 flex items-center"
    >
      <p className="text-sm">{getHighlightedText(text, tags)}</p>
    </div>
  );
};

export default Prompt;
