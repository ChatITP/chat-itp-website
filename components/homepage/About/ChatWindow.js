import React from "react";
import Image from "next/image";

const ChatWindow = () => {
  return (
    <>
      <div className="relative w-[670px] h-[350px] rounded-2xl shadow-md bg-gray/80 z-20">
        <div className="text-left p-10">
          <p className="font-sans text-lg w-[570px] mx-auto">
            Tell me about Chat ITP in 25 words or less.
          </p>
        </div>
        <div className="absolute h-[242px] w-full bg-white/10 rounded-2xl">
          <div className="flex flex-row justify-end pr-10 pt-4 gap-2">
            <p className="text-xs font-sans">Hide</p>
            <Image
                src="/hide.svg"
                alt="hide"
                width={9}
                height={9}
                className="my-auto pt-[1px]"
              />
          </div>
          <div className="w-[570px] h-[100px] mx-auto pt-8 mb-16">
            <p className="font-sans text-lg">
              Overall, while larger language models tend to perform better due
              to their capacity to capture more intricate patterns in data,
              there{" "}
            </p>
          </div>
          <div className="flex flex-row justify-end pr-10 gap-6">
            <div className="flex flex-row items-center gap-2">
              <p className="text-xs font-sans">Regenerate</p>
              <Image
                src="/switch.svg"
                alt="switch"
                width={13}
                height={13}
                className="my-auto pt-[1px]"
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <p className="text-xs font-sans">Ask Followup</p>
              <Image
                src="/tasks.svg"
                alt="task"
                width={13}
                height={13}
                className="my-auto pt-[1px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
