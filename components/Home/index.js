import Button from "@/components/Button";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <div id="home" className="h-screen min-h-[640px] block pt-[60px] relative z-20">
        <div className="relative h-full pb-16 flex flex-col items-center justify-center">
          <h1 className="text-center text-[52px] font-semibold text-offWhite pb-4">Chat ITP</h1>
          <h2 className="text-base text-offWhite font-light text-center w-[727px] pb-14">
            We are training an ethical, open-source LLM using 20+ years of ITP/NYU student work -
            including video, sculpture, writing, animation, game design, and virtual reality.
          </h2>
          <div className="pb-40">
            <Link href="/">
              <Button>
                <div className="flex items-center">
                  Start Now&nbsp;&nbsp;
                  <FaAngleRight />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
