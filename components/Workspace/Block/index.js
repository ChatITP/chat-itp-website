import React, { useRef } from "react";
import Association from "./Association";
import Message from "./Message";
import { blockListState } from "@/contexts/workspace";
import { useRecoilState } from "recoil";

const Block = ({ initialPromptPhrases, id }) => {
  const [blockList, setBlockList] = useRecoilState(blockListState);
  const promptRef = useRef("");

  const handleDoubleClick = (event) => {
    event.stopPropagation();
  };

  const handleClick = () => {
    setBlockList(
      blockList.map((block, index) => {
        if (index === id) {
          return {
            ...block,
            z: blockList.reduce((max, block) => (block.z > max ? block.z : max), 0) + 1,
          };
        } else {
          return block;
        }
      })
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      event.stopPropagation();
      setBlockList((prevList) => {
        return prevList.filter((block, index) => index !== id);
      });
    }
  };
  return (
    <div
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleClick}
      className={`bg-gray w-[550px] rounded-xl drop-shadow-lg flex flex-col focus:outline`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Association promptRef={promptRef} initialPromptPhrases={initialPromptPhrases} />
      <Message promptRef={promptRef} />
    </div>
  );
};

export default Block;
