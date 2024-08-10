import useClickInOutDetector from "@/hooks/clickInOutDetector";
import { useRef } from "react";
export const Phrase = ({ color, children, isEditing, isSelected, onClick, onClickOut }) => {
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
          className="relative font-medium text-black rounded-md pl-1 pr-1 -mr-2 py-2 shadow-lg shadow-black border-none outline-none z-10"
          role="textbox"
          contentEditable
          suppressContentEditableWarning
        >
          &nbsp;{children}{" "}
        </span>
      );
    } else {
      return (
        <span
          onClick={onClick}
          style={{ backgroundColor: "#cccccc" }}
          className="relative font-medium text-black rounded-md pl-1 pr-2 -mr-2 py-1"
        >
          &nbsp;{children}{" "}
        </span>
      );
    }
  } else {
    return (
      <span
        onClick={onClick}
        style={{ backgroundColor: color }}
        className="relative font-medium text-black rounded-md pl-1 pr-2 -mr-2 py-1"
      >
        &nbsp;{children}{" "}
      </span>
    );
  }
};
