import { tagState } from "../../../contexts/examples";
import { useRecoilValue } from "recoil";
import escapeRegExp from "@/utils/escapeRegExp";
import { blockListState } from "@/contexts/workspace";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

const ExampleCard = ({ text, phrases }) => {
  const tags = useRecoilValue(tagState);
  const setBlockList = useSetRecoilState(blockListState);
  const [isDragging, setIsDragging] = useState(false);
  /**
   * Highlight the tags that are selected in the text.
   * The highlighted text is wrapped in a span with a background color.
   * @param {string} text - The text to highlight.
   * @returns {JSX.Element} The text with the selected tags highlighted.
   */
  const highlightTags = (text) => {
    const highlights = tags.filter((tag) => tag.isSelected).map((tag) => tag.name);
    const escapedHighlights = highlights.map(escapeRegExp);

    const regex = new RegExp(`(${escapedHighlights.join("|")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      escapedHighlights.some((highlight) => part.toLowerCase() === highlight.toLowerCase()) ? (
        <span key={index} className="text-[#3175BB] bg-lightBlue rounded-md px-2">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleDragStart = (event) => {
    setIsDragging(true);
    setBlockList((blockList) => {
      const newBlockList = [
        ...blockList,
        {
          phrases: phrases,
          x: event.clientX - 20,
          y: event.clientY - 20,
          z: blockList.reduce((max, block) => (block.z > max ? block.z : max), 0) + 1,
          type: "block",
        },
      ];

      return newBlockList.map((block, index) => {
        return {
          ...block,
          isSelected: index === newBlockList.length - 1,
        };
      });
    });
  };

  const onDrag = (event) => {
    event.preventDefault();
    setBlockList((blockList) => {
      const newBlockList = [...blockList];
      const lastBlock = newBlockList.pop();
      const newLastBlock = {
        ...lastBlock,
        x: event.clientX - 20,
        y: event.clientY - 20,
      };
      newBlockList.push(newLastBlock);
      return newBlockList;
    });
  };

  const handleDragEnd = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setBlockList((blockList) => {
      const newBlockList = [...blockList];
      const lastBlock = newBlockList.pop();
      const newLastBlock = {
        ...lastBlock,
        x: event.clientX - 20,
        y: event.clientY - 20,
      };
      newBlockList.push(newLastBlock);
      return newBlockList;
    });
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={onDrag}
      className={`${
        isDragging ? "opacity-0" : ""
      } mx-3 flex-none border border-white/50 rounded-lg p-4 w-[300px] h-[120px] text-white cursor-pointer text-sm font-sans hover:bg-[#696969] bg-gray2/60 select-none overflow-auto`}
    >
      {highlightTags(text)}
    </div>
  );
};

export default ExampleCard;
