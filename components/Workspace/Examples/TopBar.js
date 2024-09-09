import React from "react";
import Image from "next/image";
import Link from "next/link";
import TagList from "./TagList";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between bg-gray px-4 py-2 h-[84px] shadow-md">
      <div className="flex items-center">
        <Link href="/" className="flex-shrink-0 mr-6">
          <Image src="/logo.png" alt="logo icon" width={70} height={61} className="hover:opacity-80 transition-opacity" />
        </Link>
        <TagList />
      </div>
      <Link href="/report" className="text-white hover:text-gray-300 hover:underline transition-colors text-sm font-medium bg-gray-700 px-4 py-2 rounded-full">
        Report a bug / Request a feature
      </Link>
    </div>
  );
};

export default TopBar;
