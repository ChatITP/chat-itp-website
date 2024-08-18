import { tagState } from "./contexts";
import { useRecoilValue } from "recoil";
import escapeRegExp from "@/utils/escapeRegExp";

const ExampleCard = ({ onClick, text }) => {
  const tags = useRecoilValue(tagState);
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

  return (
    <div className="mx-3 flex-none border border-white/50 rounded-lg p-4 w-[300px] h-[120px] text-white cursor-pointer text-sm font-sans hover:bg-[#696969] bg-gray2/60">
      {highlightTags(text)}
    </div>
  );
};

export default ExampleCard;
