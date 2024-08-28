import React from "react";
import { blockListState } from "@/contexts/workspace";
import { useSetRecoilState } from "recoil";
import useAuthRequest from "@/hooks/useAuthRequest";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const NewBlock = ({ id }) => {
  const setBlockList = useSetRecoilState(blockListState);
  const request = useAuthRequest();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputComplete = async (event) => {
    if (event.target.innerText === "") {
      return;
    }
    setIsLoading(true);

    const text = event.target.innerText;
    event.target.innerText = "";
    const response = await request("post", "/api/llm/split", { text });
    const result = response.data.split;

    setBlockList((prevBlockList) => {
      const newBlockList = [...prevBlockList];
      newBlockList[id] = {
        ...newBlockList[id],
        type: "block",
        phrases: result,
      };
      return newBlockList;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
    if (event.key === "Backspace" && event.target.innerText === "") {
      event.preventDefault();
      setBlockList((prevBlockList) => {
        return prevBlockList.filter((block, index) => index !== id);
      });
    }
    if (event.key === "Delete") {
      event.preventDefault();
      setBlockList((prevBlockList) => {
        return prevBlockList.filter((block, index) => index !== id);
      });
    }
  };

  if (isLoading) {
    return (
      <div
        className="w-[550px] h-[100px] border-2 border-[#c0c0c0] bg-white/15 rounded-lg border-dashed outline-none flex items-center justify-center shadow-lg"
        contentEditable={false}
      >
        <BeatLoader color="#c0c0c0" />
      </div>
    );
  }

  return (
    <div
      className="w-[550px] min-h-[100px] border-2 border-[#c0c0c0] bg-white/15 rounded-lg border-dashed outline-none focus:border-[#ffffff] p-4 shadow-lg"
      contentEditable
      suppressContentEditableWarning
      tabIndex={0}
      onBlur={handleInputComplete}
      onKeyDown={handleKeyDown}
    ></div>
  );
};

export default NewBlock;
