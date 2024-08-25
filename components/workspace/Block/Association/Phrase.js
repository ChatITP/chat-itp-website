import { IoIosAdd } from "react-icons/io";
import { useRef } from "react";
import useClickInOutDetector from "@/hooks/clickInOutDetector";

const Phrase = ({
  color,
  children,
  isEditing,
  isSelected,
  isPlaceholder,
  onClick,
  onClickOut,
  isEnd,
  isLoading,
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
          className="font-[600] text-sm text-black rounded-md px-3 mx-1 shadow-lg shadow-black border-none outline-none break-words cursor-text"
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
          style={{
            backgroundColor: "#cccccc",
            paddingRight: isEnd ? "0.5rem" : "1.5rem",
            marginRight: isEnd ? "0" : "-1rem",
          }}
          className="relative font-[600] text-sm text-[#6b6b6b] rounded-md pl-2 break-words cursor-pointer"
        >
          {isPlaceholder ? <IoIosAdd className="inline text-lg" /> : <>{children}</>}
        </span>
      );
    }
  } else if (isLoading) {
    return (
      <span
        style={{
          backgroundColor: "#cccccc",
          paddingRight: isEnd ? "0.5rem" : "1.5rem",
          marginRight: isEnd ? "0" : "-1rem",
        }}
        className="relative font-[600] text-sm text-[#6b6b6b] rounded-md pl-2 pr-6 break-words cursor-pointer"
      >
        {isPlaceholder ? <IoIosAdd className="inline text-lg" /> : <>{children}</>}
      </span>
    );
  } else {
    return (
      <span
        onClick={onClick}
        style={{
          backgroundColor: color,
          paddingRight: isEnd ? "0.5rem" : "1.5rem",
          marginRight: isEnd ? "0" : "-1rem",
        }}
        className="relative font-[600] text-sm text-black rounded-md pl-2 pr-6 break-words cursor-pointer"
      >
        {isPlaceholder ? <IoIosAdd className="inline text-lg" /> : <>{children}</>}
      </span>
    );
  }
};

export default Phrase;
