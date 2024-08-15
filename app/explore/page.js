import React from "react";
import Link from "next/link";
import Image from "next/image";
import Switch from "components/Convo/Switch";
import Exploration from "components/Exploration";

const Explore = () => {
  return (
    <>
      <div className="w-full space-y-2 bg-blue">
        <div className="flex flex-row justify-between bg-gray-800 px-2 pt-4 pb-2 items-center">
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
          <div className="flex justify-end w-full">
            <Switch currentPage="Explore" />
          </div>
        </div>
      </div>
      <Exploration />
    </>
  );
};

export default Explore;
