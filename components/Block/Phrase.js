import useClickInOutDetector from "@/hooks/clickInOutDetector";
import { useRef } from "react";

const Phrase = ({
  color,
  children,
  isEditing,
  isSelected,
  isPlaceholder,
  onClick,
  onClickOut,
  isEnd,
}) => {
  const editableSpanRef = useRef(null);

  useClickInOutDetector(
    editableSpanRef,
    () => {},
    () => {
      onClickOut(editableSpanRef.current.innerText.trim());
    }
  );

  if (isEditing) {
    if (isSelected) {
      return (
        <span
          ref={editableSpanRef}
          style={{ backgroundColor: color }}
          className="relative font-medium text-black rounded-md px-3 py-2 -mx-1 shadow-lg shadow-black border-none outline-none z-10"
          role="textbox"
          contentEditable
          suppressContentEditableWarning
        >
          {children}
        </span>
      );
    } else {
      return (
        <span
          onClick={onClick}
          style={{ backgroundColor: "#cccccc", paddingRight: isEnd ? "0.5rem" : "1.5rem" }}
          className="relative font-medium text-black rounded-md pl-2 -mr-4 py-1"
        >
          {isPlaceholder ? "+" : <>{children}</>}
        </span>
      );
    }
  } else {
    return (
      <span
        onClick={onClick}
        style={{ backgroundColor: color, paddingRight: isEnd ? "0.5rem" : "1.5rem" }}
        className="relative font-medium text-black rounded-md pl-2 pr-6 -mr-4 py-1"
      >
        {isPlaceholder ? "+" : <>{children}</>}
      </span>
    );
  }
};

export default Phrase;
