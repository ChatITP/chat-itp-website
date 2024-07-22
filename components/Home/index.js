import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        id="home"
        className="h-screen min-h-[640px] block pt-[60px] relative z-10"
      >
        <div className="relative z-10 h-full min-h-full items-center place-content-center flex flex-col pb-16">
          <div className="w-[244px] h-[107px] pb-7">
            <h1 className="text-center text-[52px] font-semibold">Chat ITP</h1>
          </div>
          <div className="w-[727px] h-[100.93px]">
            <h2 className="text-base text-left">
              We are training an ethical, open-source LLM using 20+ years of
              ITP/NYU student work - including video, sculpture, writing,
              animation, game design, and virtual reality.
            </h2>
          </div>
          <Link href="/">
            <Button text="Start Now" />
          </Link>
        </div>
        <div
          id="blob"
          className="absolute inset-0 flex items-center justify-center z-5"
        >
          <div className="w-1/3 h-auto">
            <Image
              src="/blob.gif"
              alt="blob animation"
              width={600}
              height={600}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
