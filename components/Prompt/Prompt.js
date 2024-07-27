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
      className="w-[500px] h-[91px] border-[1.5px] border-offWhite/20 px-6 pt-4 rounded-xl mr-4"
    >
      <p className="text-sm text-left">{getHighlightedText(text, tags)}</p>
    </div>
  );
};

export default Prompt;
