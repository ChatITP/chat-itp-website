import React from "react";
import PromptList from "@/components/Prompt/PromptList";

const Convo = ({ tags }) => {
  return (
    <div className="min-h-screen bg-white/35">
      <div className="mx-4 pt-4">
      <PromptList tags={tags} />
      </div>
      
    </div>
  );
};

export default Convo;

