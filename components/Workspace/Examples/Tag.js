import React from "react";

const Tag = () => {
  return (
    <div
      key={index}
      onClick={() => handleTagClick(tag)}
      onDoubleClick={() => handleTagDoubleClick(index, tag)}
      className={`cursor-pointer text-xs ${
        selectedTags.includes(tag)
          ? "bg-lightBlue text-blue"
          : tag === "Add Custom Tag"
          ? "bg-white/20 border underline border-white/20 text-white/50 w-32"
          : "bg-none border border-white text-white"
      } font-semibold rounded-lg px-3 py-1 whitespace-nowrap`}
    >
      {editingTagIndex === index ? (
        <input
          type="text"
          value={editingText}
          onChange={handleEditChange}
          onKeyDown={(e) => handleEditKeyDown(e, index)}
          onBlur={() => saveEditedTag(index)}
          className="w-full h-full text-center bg-yellow/80 border-none outline-none"
        />
      ) : (
        <span>{tag}</span>
      )}
    </div>
  );
};

export default Tag;
