"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Selector = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-white to-gray-600 opacity-45 border-[1px] rounded-3xl w-[100px] h-[20px] lg:w-[205px] lg:h-[43px]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-white/10 rounded-3xl flex items-center justify-center">
        <ul className="flex items-center gap-2">
          <Link href="/">
            <li
              onClick={() => handleSectionClick("Home")}
              className="cursor-pointer"
            >
              <div
                className={`flex items-center justify-center p-2  w-[60px] h-[40px] rounded-full hover:bg-gradient-to-r from-main/70 to-purple/5 hover:border-[1.5px] hover:border-gray-600 ${
                  activeSection === "Home"
                    ? "bg-gradient-to-r from-main/70 to-purple/5 border-[1.5px] border-gray-600"
                    : ""
                }`}
              >
                <Image
                  src="/home.svg"
                  alt="Home Icon"
                  className="block object-cover w-[15px] lg:w-[20px]"
                  width={20}
                  height={20}
                />
              </div>
            </li>
          </Link>
          <Link href="/Conversation">
            <li
              onClick={() => handleSectionClick("Home")}
              className="cursor-pointer"
            >
              <div
                className={`flex items-center justify-center p-2 w-[60px] h-[40px] rounded-full hover:bg-gradient-to-r from-main/70 to-purple/5 hover:border-[1.5px] hover:border-gray-100 ${
                  activeSection === "Convo"
                    ? "bg-gradient-to-r from-main/70 to-purple/5 border-[1.5px] border-gray-100"
                    : ""
                }`}
              >
                <Image
                  src="/convo.svg"
                  alt="Convo Icon"
                  className="block object-cover w-[15px] lg:w-[20px]"
                  width={20}
                  height={20}
                />
              </div>
            </li>
          </Link>

          <li
            onClick={() => handleSectionClick("Question")}
            className="cursor-pointer"
          >
            <div
              className={`flex items-center justify-center p-2  w-[60px] h-[40px] rounded-full hover:bg-gradient-to-r from-main/70 to-purple/5 hover:border-[1.5px] hover:border-gray-100 ${
                activeSection === "Question"
                  ? "bg-gradient-to-r from-main/70 to-purple/5 border-[1.5px] border-gray-100"
                  : ""
              }`}
            >
              <Image
                src="/question.svg"
                alt="Question Icon"
                className="block object-cover w-[15px] lg:w-[20px]"
                width={20}
                height={20}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Selector;
