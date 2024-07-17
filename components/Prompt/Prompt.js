import React from "react";

const Prompt = ({ text = "text-holder", tags = [] }) => {
  const getHighlightedText = (text, tags) => {
    const regex = new RegExp(`(${tags.join("|")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      tags.includes(part.toLowerCase()) ? (
        <span key={index} className="bg-blue-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div id="prompt" className="w-[500px] h-[91px] border border-1 border-white/50 px-6 pt-4 rounded-lg">
      <p className="text-sm text-left">{getHighlightedText(text, tags)}</p>
    </div>
  );
};

export default Prompt;
