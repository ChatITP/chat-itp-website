import { useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import useClickInOutDetector from "@/hooks/clickInOutDetector";

const Tag = ({ children, isSelected, isEditing, onClick, onEditClick, onEdited }) => {
  const editButtonClicked = (e) => {
    e.stopPropagation();
    onEditClick();
  };

  const inputRef = useRef(null);
  // focus after the input is rendered
  useEffect(() => {
    inputRef.current?.focus();
  });
  return (
    <div>
      {isEditing ? (
        <div
          ref={inputRef}
          className="flex items-center text-sm bg-none border border-white text-white/80 font-semibold rounded-lg px-3 py-1 whitespace-nowrap"
          style={{
            backgroundColor: isSelected ? "#C8DFF7" : "transparent",
          }}
          role="textbox"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onEdited(e.target.innerText)}
        >
          <div>{children}</div>
        </div>
      ) : (
        <button
          className="flex items-center text-sm bg-none border border-white text-white/80 font-semibold rounded-lg px-3 py-1 whitespace-nowrap"
          style={{
            backgroundColor: isSelected ? "#C8DFF7" : "transparent",
          }}
          onClick={onClick}
        >
          <div>{children}</div>
          <div className="ml-2" onClick={editButtonClicked} role="button">
            <FaEdit />
          </div>
        </button>
      )}
    </div>
  );
};

export default Tag;
