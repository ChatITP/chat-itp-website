import Ring from "./Ring";
import ChatWindow from "./ChatWindow";
import Link from "next/link";
import Button from "../Button";

export default function About() {
  return (
    <>
      <div className="min-h-[640px] max-w-[1440px] m-auto" id="about">
        <Ring />
        <div className="h-full flex justify-center">
          <div
            className="w-[310px] h-[204px] md:w-[716px] md:h-[394px] bg-cover bg-center rounded-3xl"
            style={{ backgroundImage: "url('/chatWindowBg.jpg')" }}
          >
            <div className = "flex justify-center pt-[10px] md:pt-[20px] mb-16">
              <ChatWindow />
            </div>
            <div className="flex pt-10 justify-center">
            <Link href="/workspace">
              <Button className="w-[130px] md:w-[175px] h-[42px] md:h-[46px]">
                <div className="flex items-center text-sm md:text-lg">
                  Try ChatITP
                </div>
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
