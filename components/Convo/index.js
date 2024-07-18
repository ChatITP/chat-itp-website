import React from "react";
import PromptList from "@/components/Prompt/PromptList";
import Input from "@/components/Convo/input";
import Image from "next/image";

const Convo = ({ tags, setTags }) => {
  return (
    <>
      <nav className="w-full h-[82px] bg-black ">
        <div className="flex flex-row items-center h-full">
          <div className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Company Logo"
              width={77.7}
              height={61}
            />
          </div>
          <div className="ml-4">
            <Input tags={tags} setTags={setTags} />
          </div>
        </div>
      </nav>
      <div className="min-h-screen bg-white/35">
        <div className="mx-4 pt-4">
          <PromptList tags={tags} />
        </div>
      </div>
    </>
  );
};

export default Convo;

