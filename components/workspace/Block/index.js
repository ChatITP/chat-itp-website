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
            isSelected: true,
            z: blockList.reduce((max, block) => (block.z > max ? block.z : max), 0) + 1,
          };
        } else {
          return {
            ...block,
            isSelected: false,
          };
        }
      })
    );
  };

  const isSelected = blockList[id].isSelected;

  return (
    <div
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleClick}
      className={`bg-gray w-[550px] rounded-xl drop-shadow-lg flex flex-col ${
        isSelected ? "border-2 border-offWhite" : ""
      }`}
    >
      <Association promptRef={promptRef} initialPromptPhrases={initialPromptPhrases} />
      <Message promptRef={promptRef} />
    </div>
  );
};

export default Block;
