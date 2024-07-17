"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Prompt from "@/components/Prompt/Prompt";

const PromptList = ({ tags }) => {
  const [prompts] = useState([
    { id: 1, text: "In 2075, ITP students will use AR to redefine social interactions. Describe a project and its implications on privacy and connections." },
    { id: 2, text: "Imagine that all the ITP student work represents the DNA of a university program. Describe a university program based on this DNA" },
    { id: 3, text: "Write an advertisement poem about ITP Spring Show." },
    { id: 4, text: "Describe the most innovative ITP projects from the 1980s that utilized early computer graphics." },
  ]);

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex space-x-4"
        whileHover={{ x: -100 }}
        transition={{ ease: "linear", duration: 2 }}
      >
        {prompts.map((prompt) => (
          <div key={prompt.id} className="flex-grow">
            <Prompt text={prompt.text} tags={tags} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PromptList;

