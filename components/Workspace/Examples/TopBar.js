import React from "react";
import Image from "next/image";
import Link from "next/link";
import TagList from "./TagList";

const TopBar = () => {
  const phrases = [
    "What's the most innovative theme of ITP Projects?",
    "Describe the most innovative 3d game modeling projects from the 1980s that utilized early computer graphics.",
    "In 2075, ITP students will use AR to redefine social interactions. Describe a project and its implications on privacy and connections.",
    "Imagine that all the ITP student work represents the DNA of a university program. Describe a university program based on this DNA",
    "Write an advertisement poem about ITP Spring Show.",
    "How did ITP projects evolve in terms of multimedia storytelling from the 2000s to the 2010s?",
    "Design the “ITP version” of these common objects: Toaster, bubble tea, supercomputer, paper clip, pet chihuahua, underpants.",
  ];

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
