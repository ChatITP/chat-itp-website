"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Prompt from "@/components/Prompt";

const PromptList = () => {
  const [prompts, setPrompts] = useState([
    { id: 1, text: "In 2075, ITP students will use AR to redefine social interactions. Describe a project and its implications on privacy and connections." },
    { id: 2, text: "Imagine that all the ITP student work represents the DNA of a university program. Describe a university program based on this DNA" },
    { id: 3, text: "Write an advertisement poem about ITP Spring Show." },
    { id: 4, text: "Describe the most innovative ITP projects from the 1980s that utilized early computer graphics." },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrompts((prevPrompts) => {
        const [first, ...rest] = prevPrompts;
        return [...rest, first];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        className="flex space-x-4"
        animate={{ x: -100 }}
        transition={{ ease: "linear", duration: 2, repeat: Infinity }}
        style={{ width: "calc(100% + 100px)" }}
      >
        {prompts.map((prompt) => (
          <Prompt key={prompt.id} text={prompt.text} />
        ))}
      </motion.div>
    </div>
  );
};

export default PromptList;
