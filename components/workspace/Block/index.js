import React, { useRef } from "react";
import Association from "./Association";
import Message from "./Message";

const Block = ({ initialPromptPhrases }) => {
  const promptRef = useRef("");

  const handleDoubleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="bg-gray w-[550px] rounded-xl drop-shadow-lg flex flex-col"
    >
      <Association promptRef={promptRef} initialPromptPhrases={initialPromptPhrases} />
      <Message promptRef={promptRef} />
    </div>
  );
};

export default Block;
