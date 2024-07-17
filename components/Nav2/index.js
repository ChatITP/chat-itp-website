import React from "react";
import Image from "next/image";
import Input from "@/components/Nav2/input";

const Nav2 = ({ tags, setTags }) => {
  return (
    <nav className="w-full h-[82px] bg-black ">
      <div className="flex flex-row items-center h-full">
        <div className="flex-shrink-0">
          <Image src="/logo.svg" alt="Company Logo" width={77.7} height={61} />
        </div>
        <div className="ml-4">
          <Input tags={tags} setTags={setTags} />
        </div>
      </div>
    </nav>
  );
};

export default Nav2;


