import React from "react";

const Tag = ({ children, isSelected, isEditing }) => {
  return (
    <div
      className={`cursor-pointer text-sm ${
        isSelected ? "bg-lightBlue text-blue" : "bg-none border border-white text-white/80"
      } font-semibold rounded-lg px-3 py-1 whitespace-nowrap`}
    >
      {isEditing ? (
        <input
          type="text"
          value={children}
          // onChange={handleEditChange}
          // onKeyDown={(e) => handleEditKeyDown(e, index)}
          // onBlur={() => saveEditedTag(index)}
          className="w-full h-full text-center bg-yellow/80 border-none outline-none"
        />
      ) : (
        <span>{children}</span>
      )}
    </div>
  );
};

export default Tag;
