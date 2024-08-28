import { useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";

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
          className="flex items-center text-sm font-semibold rounded-lg px-3 py-1 whitespace-nowrap max-w-[150px] overflow-hidden focus:outline focus:outline-2 focus:outline-white"
          style={{
            backgroundColor: isSelected ? "#C8DFF7" : "transparent",
            color: isSelected ? "#3175BB" : "white",
            border: isSelected ? "1px solid #3175BB" : "1px solid white",
          }}
          role="textbox"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onEdited(e.target.innerText.trim())}
        >
          {children}
        </div>
      ) : (
        <button
          className="flex items-center text-sm font-semibold rounded-lg px-3 py-1 whitespace-nowrap"
          style={{
            backgroundColor: isSelected ? "#C8DFF7" : "transparent",
            color: isSelected ? "#3175BB" : "white",
            border: isSelected ? "1px solid #3175BB" : "1px solid white",
          }}
          onClick={onClick}
        >
          <div className="max-w-[103px] overflow-hidden text-ellipsis">{children}</div>
          <div className="ml-2" onClick={editButtonClicked} role="button">
            <FaEdit />
          </div>
        </button>
      )}
    </div>
  );
};

export default Tag;
