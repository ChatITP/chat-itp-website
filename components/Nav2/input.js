"use client";
import { useState } from "react";
import React from "react";

const Input = () => {
  const [searchKey, setSearchKey] = useState("");
  const [tags, setTags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchKey.trim() !== "") {
      setTags([...tags, searchKey.trim()]);
      setSearchKey("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-[450px] h-[38px] flex items-center rounded-lg border border-blue pl-4 text-sm bg-black">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-lightBlue text-blue font-semibold rounded-lg px-2 py-1 mr-2"
        >
          <span>{tag}</span>
          <button
            type="button"
            className="ml-2 text-lightBlue bg-blue/40 w-4 h-4 flex items-center justify-center rounded-full"
            onClick={() => removeTag(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        className="flex-grow bg-black outline-none text-white"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder=""
      />
    </div>
  );
};

export default Input;
