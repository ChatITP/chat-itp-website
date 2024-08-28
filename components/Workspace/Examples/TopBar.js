import React from "react";
import Image from "next/image";
import Link from "next/link";
import TagList from "./TagList";

const TopBar = () => {
  return (
    <div className="flex flex-row gap-4 bg-gray px-2 h-[84px] items-center z-20">
      <Link href="/" className="flex-none mr-4">
        <Image src="/logo.png" alt="logo icon" width={70} height={61} className="my-auto ml-4" />
      </Link>
      <TagList />
    </div>
  );
};

export default TopBar;
