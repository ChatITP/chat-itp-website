import React from "react";
import Image from "next/image";
import { FaPeopleRoof } from "react-icons/fa6";

const Card = ({ topic = "topic holder", des = "description holder", Icon = FaPeopleRoof }) => {
  return (
    <div
      id="Card"
      className="flex flex-col justify-center w-[300px] h-[200px] px-8 bg-gradient-to-r backdrop-blur-sm from-white/20 to-white/10 rounded-lg"
    >
      <div className="flex items-center pb-4">
        <div className="bg-[#6CA2D9] relative w-12 h-12 rounded-xl">
          <Icon className="text-offWhite text-3xl z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h2 className="pl-4 text-xl font-semibold text-offWhite">{topic}</h2>
      </div>
      <p className="text-offWhite text font-light text-sm">{des}</p>
    </div>
  );
};

export default Card;
