"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Switch = ({ currentPage }) => {
  const tags = ["Workspace", "Explore"];
  const [selectedTag, setSelectedTag] = useState(currentPage);

  useEffect(() => {
    setSelectedTag(currentPage);
  }, [currentPage]);

  return (
    <div
      id="Switch"
      className="w-52 h-11 border border-white/50 bg-white/10 rounded-3xl flex justify-around items-center relative"
    >
      {tags.map((tag) => (
        <Link key={tag} href={tag === "Workspace" ? "/" : "/explore"}>
          <button
            className={`text-xs font-semibold mx-auto px-4 py-2 rounded-full relative z-10 ${
              selectedTag === tag ? "text-white" : "text-gray-300"
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        </Link>
      ))}
      <div
        className={`absolute border border-white/50 top-0 bottom-0 my-auto h-9  rounded-3xl transition-all duration-300 ${
          selectedTag === "Workspace" ? "left-1 w-1/2" : "left-[57%] w-[40%]"
        }`}
        style={{
          background:
            "linear-gradient(90deg, rgba(168, 211, 255,0.7) 0%, rgba(215, 164, 255, 0.2) 100%)",
        }}
      />
    </div>
  );
};

export default Switch;




