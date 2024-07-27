import React from "react";
import Image from "next/image";
import { FaPeopleRoof } from "react-icons/fa6";

const Card = ({ topic = "topic holder", des = "description holder", Icon = FaPeopleRoof }) => {
  return (
    <div
      id="Card"
      className="w-[367px] h-[200px] px-8 pt-4 bg-gradient-to-r backdrop-blur-sm from-white/20 to-white/10 rounded-lg"
    >
      <div className="flex flex-col ">
        <div className="bg-[#6CA2D9] relative w-14 h-14 rounded-2xl">
          <Icon className="text-offWhite text-4xl z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        <h2 className="text-lg capitalize font-semibold pb-2">{topic}</h2>
        <p className="text-sm">{des}</p>
      </div>
    </div>
  );
};

export default Card;
