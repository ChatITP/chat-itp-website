import React from "react";
import Link from "next/link";
import Image from "next/image";
import Switch from "components/Convo/Switch";

const Explore = () => {
  return (
    <div className="w-full space-y-2">
      <div className="flex flex-row gap-4 bg-gray-800 px-2 pt-4 pb-2 items-center">
        <Link href="/about">
          <div>
            <Image
              src="/logo.png"
              alt="logo icon"
              width={70}
              height={61}
              className="my-auto"
            />
          </div>
        </Link>
        <div className="flex justify-end">
          <Switch currentPage="Explore" />
        </div>
      </div>
    </div>
  );
};

export default Explore;

