import React, { useRef } from "react";
import Association from "./Association";
import Message from "./Message";
import { blockListState } from "@/contexts/workspace";
import { useRecoilState } from "recoil";

const Block = ({ initialPromptPhrases, id }) => {
  const [blockList, setBlockList] = useRecoilState(blockListState);
  const promptRef = useRef("");

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      event.stopPropagation();
      setBlockList((prevList) => {
        return prevList.filter((block) => block.id !== id);
      });
    }
  };
  return (
    <div
      className="bg-gray w-[550px] rounded-xl drop-shadow-lg flex flex-col"
      onKeyDown={handleKeyDown}
    >
      <Association promptRef={promptRef} initialPromptPhrases={initialPromptPhrases} />
      <Message promptRef={promptRef} />
    </div>
  );
};

export default Block;
