import React, { useRef } from "react";
import Association from "./Association";
import Message from "./Message";
import { blockListState } from "@/contexts/workspace";
import { useRecoilState } from "recoil";
import { IoClose } from "react-icons/io5";

const Block = ({ initialPromptPhrases, id }) => {
  const [blockList, setBlockList] = useRecoilState(blockListState);
  const promptRef = useRef("");

  const handleDelete = () => {
    setBlockList((prevList) => {
      return prevList.filter((block) => block.id !== id);
    });
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Backspace" || event.key === "Delete") {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     setBlockList((prevList) => {
  //       return prevList.filter((block) => block.id !== id);
  //     });
  //   }
  // };

  return (
    <div
      className="relative bg-gray w-[550px] rounded-xl drop-shadow-lg flex flex-col pt-[6px]"
      // onKeyDown={handleKeyDown}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="absolute z-20 top-2 right-2 text-white hover:bg-white/20 mb-2 p-[1px] rounded-md"
      >
        <IoClose size={20} />
      </button>
      <Association promptRef={promptRef} initialPromptPhrases={initialPromptPhrases} />
      <Message promptRef={promptRef} />
    </div>
  );
};

export default Block;
