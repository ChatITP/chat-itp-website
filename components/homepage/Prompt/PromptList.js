"use client";
import { useState, React } from "react";
import { motion } from "framer-motion";
import Prompt from "./Prompt";

const PromptList = ({ tags }) => {
  const [prompts] = useState([
    {
      id: 1,
      text: "In 2075, ITP students will use AR to redefine social interactions. Describe a project and its implications on privacy and connections.",
    },
    {
      id: 2,
      text: "Imagine that all the ITP student work represents the DNA of a university program. Describe a university program based on this DNA",
    },
    { id: 3, text: "Write an advertisement poem about ITP Spring Show." },
    {
      id: 4,
      text: "Describe the most innovative ITP projects from the 1980s that utilized early computer graphics.",
    },
  ]);

  const motions = {
    move: {
      x: "-100%",
      transition: { ease: "linear", repeat: Infinity, duration: prompts.length * 15 },
    },
  };

  return (
    <motion.div className="relative w-full overflow-hidden flex" animate="move">
      <motion.div className="flex" variants={motions}>
        {prompts.map((prompt) => (
          <div key={prompt.id} className="flex-grow">
            <Prompt text={prompt.text} tags={tags} />
          </div>
        ))}
      </motion.div>
      <motion.div className="flex" variants={motions}>
        {prompts.map((prompt) => (
          <div key={prompt.id} className="flex-grow">
            <Prompt text={prompt.text} tags={tags} />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PromptList;
