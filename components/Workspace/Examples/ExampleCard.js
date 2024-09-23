import { tagState } from "../../../contexts/examples";
import { useRecoilValue } from "recoil";
import escapeRegExp from "@/utils/escapeRegExp";
import { blockListState, createBlock, getHighestZ } from "@/contexts/workspace";
import { useSetRecoilState } from "recoil";

const ExampleCard = ({ text, phrases }) => {
  const tags = useRecoilValue(tagState);
  const setBlockList = useSetRecoilState(blockListState);
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

  const onMouseDown = (event) => {
    event.preventDefault();
    window.addEventListener("mousemove", onMouseDrag);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseDrag = (event) => {
    event.preventDefault();
    setBlockList((blockList) => {
      return [
        ...blockList,
        createBlock(
          "block",
          event.clientX - 20,
          event.clientY - 20,
          getHighestZ(blockList) + 1,
          phrases,
          true
        ),
      ];
    });
    window.removeEventListener("mousemove", onMouseDrag);
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseDrag);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className="mx-3 flex-none border border-white/50 rounded-lg p-4 w-[300px] h-[120px] text-white cursor-pointer text-sm font-sans hover:bg-[#696969] bg-gray2/60 select-none"
    >
      {highlightTags(text)}
    </div>
  );
};

export default ExampleCard;
